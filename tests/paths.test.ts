import { describe, expect, it } from "vitest";
import { CANONICAL_ORIGIN, canonicalUrl, withBase } from "../src/lib/paths";

describe("public path helpers", () => {
  it("keeps primary-domain paths at the root", () => {
    expect(withBase("/sources/sources.html", "/")).toBe("/sources/sources.html");
  });

  it("adds the GitHub Pages repository base once", () => {
    expect(withBase("/sources/sources.html", "/empire-contre-intox/")).toBe(
      "/empire-contre-intox/sources/sources.html",
    );
  });

  it("does not rewrite external or fragment links", () => {
    expect(withBase("https://doi.org/10.1000/example", "/mirror")).toBe("https://doi.org/10.1000/example");
    expect(withBase("#chapitre-1", "/mirror")).toBe("#chapitre-1");
  });

  it("always uses the primary domain for canonical URLs", () => {
    expect(canonicalUrl("/dossier/").href).toBe(`${CANONICAL_ORIGIN}/dossier/`);
  });
});
