import { describe, expect, it } from "vitest";
import {
  MAX_PATH_LENGTH,
  RateLimiter,
  clientKey,
  corsOrigin,
  isAcceptablePath,
  isTrustedOrigin,
  normalizePath,
  requestOrigin,
} from "../counter/lib.ts";

const headers = (init: Record<string, string>) => new Headers(init);

describe("normalizePath", () => {
  it("canonise l'index et le préfixe GitHub Pages", () => {
    expect(normalizePath("/index.html")).toBe("/");
    expect(
      normalizePath("/empire-contre-intox/provoxys/entropie/index.html"),
    ).toBe("/provoxys/entropie/");
    expect(normalizePath("/empire-contre-intox")).toBe("/");
  });

  it("retire la query, le fragment et les slashs redondants", () => {
    expect(normalizePath("/a//b/?x=1#y")).toBe("/a/b/");
  });

  it("accepte une URL absolue et se rabat sur / si l'entrée n'est pas exploitable", () => {
    expect(
      normalizePath("https://empire-contre-intox.com/sources/sources.html"),
    ).toBe("/sources/sources.html");
    expect(normalizePath(null)).toBe("/");
    expect(normalizePath(42)).toBe("/");
  });

  it("tronque les chemins démesurés", () => {
    expect(normalizePath("/" + "a".repeat(5000)).length).toBe(MAX_PATH_LENGTH);
  });
});

describe("isAcceptablePath", () => {
  it("accepte les chemins réels du site", () => {
    for (const p of [
      "/",
      "/sources/sources.html",
      "/ymir-lalie/premieres-cites/",
      "/horloge-univers/clock.html",
    ]) {
      expect(isAcceptablePath(p), p).toBe(true);
    }
  });

  it("refuse la remontée de répertoire et les octets de contrôle", () => {
    expect(isAcceptablePath("/../../etc/passwd")).toBe(false);
    expect(isAcceptablePath("/a/../b")).toBe(false);
    expect(isAcceptablePath("/a\x00b")).toBe(false);
    expect(isAcceptablePath("/a\nb")).toBe(false);
    expect(isAcceptablePath("/a b")).toBe(false);
    expect(isAcceptablePath("/a\\b")).toBe(false);
  });

  it("refuse ce qui ne commence pas par / ou dépasse la longueur maximale", () => {
    expect(isAcceptablePath("relatif")).toBe(false);
    expect(isAcceptablePath("")).toBe(false);
    expect(isAcceptablePath("/" + "a".repeat(MAX_PATH_LENGTH))).toBe(false);
  });

  it("refuse une charge utile de type balise", () => {
    expect(isAcceptablePath("/<script>alert(1)</script>")).toBe(false);
  });
});

describe("origine de la requête", () => {
  it("fait confiance aux origines du site", () => {
    expect(
      isTrustedOrigin(headers({ origin: "https://empire-contre-intox.com" })),
    ).toBe(true);
    expect(
      isTrustedOrigin(headers({ origin: "https://thesamlepirate.github.io" })),
    ).toBe(true);
  });

  it("refuse une origine tierce, absente ou opaque", () => {
    expect(isTrustedOrigin(headers({ origin: "https://evil.example" }))).toBe(
      false,
    );
    expect(isTrustedOrigin(headers({}))).toBe(false);
    expect(isTrustedOrigin(headers({ origin: "null" }))).toBe(false);
  });

  it("se rabat sur le Referer quand Origin manque", () => {
    expect(
      requestOrigin(
        headers({ referer: "https://empire-contre-intox.com/a/b.html" }),
      ),
    ).toBe("https://empire-contre-intox.com");
    expect(
      isTrustedOrigin(
        headers({ referer: "https://empire-contre-intox.com/a/b.html" }),
      ),
    ).toBe(true);
    expect(isTrustedOrigin(headers({ referer: "pas-une-url" }))).toBe(false);
  });

  it("ne renvoie jamais une origine tierce en CORS", () => {
    expect(
      corsOrigin(headers({ origin: "https://thesamlepirate.github.io" })),
    ).toBe("https://thesamlepirate.github.io");
    expect(corsOrigin(headers({ origin: "https://evil.example" }))).toBe(
      "https://empire-contre-intox.com",
    );
  });
});

describe("clientKey", () => {
  it("retient la première entrée de X-Forwarded-For", () => {
    expect(
      clientKey(headers({ "x-forwarded-for": "203.0.113.7, 10.0.0.1" })),
    ).toBe("203.0.113.7");
  });

  it("se rabat sur X-Real-IP puis sur unknown", () => {
    expect(clientKey(headers({ "x-real-ip": "203.0.113.9" }))).toBe(
      "203.0.113.9",
    );
    expect(clientKey(headers({}))).toBe("unknown");
  });

  it("borne la longueur de la clé", () => {
    expect(
      clientKey(headers({ "x-forwarded-for": "a".repeat(500) })).length,
    ).toBe(64);
  });
});

describe("RateLimiter", () => {
  it("laisse passer sous le quota et refuse au-delà", () => {
    const limiter = new RateLimiter({
      windowMs: 1000,
      maxPerClient: 3,
      maxGlobal: 100,
    });
    for (let i = 0; i < 3; i++)
      expect(limiter.check("ip", 0).allowed).toBe(true);

    const denied = limiter.check("ip", 0);
    expect(denied.allowed).toBe(false);
    expect(denied.reason).toBe("client");
    expect(denied.retryAfter).toBeGreaterThan(0);
  });

  it("rouvre le quota à la fenêtre suivante", () => {
    const limiter = new RateLimiter({
      windowMs: 1000,
      maxPerClient: 1,
      maxGlobal: 100,
    });
    expect(limiter.check("ip", 0).allowed).toBe(true);
    expect(limiter.check("ip", 500).allowed).toBe(false);
    expect(limiter.check("ip", 1500).allowed).toBe(true);
  });

  it("isole les clients les uns des autres", () => {
    const limiter = new RateLimiter({
      windowMs: 1000,
      maxPerClient: 1,
      maxGlobal: 100,
    });
    expect(limiter.check("a", 0).allowed).toBe(true);
    expect(limiter.check("a", 0).allowed).toBe(false);
    expect(limiter.check("b", 0).allowed).toBe(true);
  });

  it("applique un plafond global même avec des clés falsifiées", () => {
    const limiter = new RateLimiter({
      windowMs: 1000,
      maxPerClient: 10,
      maxGlobal: 5,
    });
    for (let i = 0; i < 5; i++)
      expect(limiter.check(`usurpe-${i}`, 0).allowed).toBe(true);

    const denied = limiter.check("usurpe-999", 0);
    expect(denied.allowed).toBe(false);
    expect(denied.reason).toBe("global");
  });

  it("borne la mémoire : la table des clients ne dépasse pas le plafond", () => {
    const limiter = new RateLimiter({
      windowMs: 1000,
      maxPerClient: 1,
      maxGlobal: 1_000_000,
      maxTrackedClients: 50,
    });
    for (let i = 0; i < 5000; i++) limiter.check(`ip-${i}`, 0);
    expect(limiter.trackedClients).toBeLessThanOrEqual(50);
  });

  it("purge les fenêtres expirées", () => {
    const limiter = new RateLimiter({
      windowMs: 1000,
      maxPerClient: 5,
      maxGlobal: 100,
    });
    limiter.check("a", 0);
    limiter.check("b", 0);
    expect(limiter.trackedClients).toBe(2);
    limiter.sweep(5000);
    expect(limiter.trackedClients).toBe(0);
  });
});
