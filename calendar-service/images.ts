import sharp from "sharp";
import { createHash, randomUUID } from "node:crypto";
import { mkdirSync, renameSync, unlinkSync } from "node:fs";
import { join } from "node:path";
import { Store, type AvatarRow } from "./store.ts";
import { Problem, text } from "./validation.ts";

export const MAX_IMAGE_BYTES = 5 * 1024 * 1024;
export async function saveAvatar(
  store: Store,
  directory: string,
  file: File,
  label: unknown,
  userId: string,
  authorize: () => void,
) {
  const title = text(label, "Nom du portrait", 80);
  if (!file.size || file.size > MAX_IMAGE_BYTES)
    throw new Problem(413, "Image trop volumineuse : maximum 5 Mo.");
  const input = Buffer.from(await file.arrayBuffer());
  const jpeg = input[0] === 255 && input[1] === 216 && input[2] === 255;
  const png = input
    .subarray(0, 8)
    .equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]));
  const webp =
    input.toString("ascii", 0, 4) === "RIFF" &&
    input.toString("ascii", 8, 12) === "WEBP";
  if (!jpeg && !png && !webp)
    throw new Problem(400, "Formats autorisés : JPEG, PNG et WebP.");
  let output: Buffer;
  try {
    const pipeline = sharp(input, {
      limitInputPixels: 16_000_000,
      failOn: "warning",
    });
    const metadata = await pipeline.metadata();
    if (
      !["jpeg", "png", "webp"].includes(metadata.format || "") ||
      (metadata.pages || 1) !== 1 ||
      !metadata.width ||
      !metadata.height ||
      metadata.width > 8192 ||
      metadata.height > 8192
    )
      throw new Error("Format ou dimensions invalides");
    // Re-encoding drops source metadata and produces a bounded, immutable raster.
    output = await pipeline
      .rotate()
      .resize(512, 512, { fit: "cover" })
      .webp({ quality: 85 })
      .toBuffer();
  } catch {
    throw new Problem(
      400,
      "Image illisible, animée ou trop grande (maximum 16 millions de pixels).",
    );
  }
  authorize();
  const hash = createHash("sha256").update(output).digest("hex");
  const duplicate = store.one<AvatarRow>(
    "SELECT * FROM avatars WHERE hash=?",
    hash,
  );
  if (duplicate) return duplicate.id;
  mkdirSync(directory, { recursive: true });
  const id = randomUUID(),
    temp = join(directory, `${id}.tmp`),
    target = join(directory, `${id}.webp`);
  try {
    await Bun.write(temp, output);
    store.atomic(() => {
      authorize();
      if (
        store.one<{ n: number }>("SELECT COUNT(*) n FROM avatars")!.n >= 2000 ||
        store.one<{ n: number }>(
          "SELECT COUNT(*) n FROM avatars WHERE created_by=?",
          userId,
        )!.n >= 100
      )
        throw new Problem(
          409,
          "Quota de portraits atteint. Contactez un administrateur.",
        );
      renameSync(temp, target);
      store.run(
        "INSERT INTO avatars(id,label,path,hash,created_by) VALUES(?,?,?,?,?)",
        id,
        title,
        `/api/calendar/media/${id}`,
        hash,
        userId,
      );
    });
  } catch (error) {
    for (const path of [temp, target])
      try {
        unlinkSync(path);
      } catch {
        /* Already absent. */
      }
    if (error instanceof Problem) throw error;
    // An identical upload can finish while sharp is decoding this one.
    const concurrent = store.one<AvatarRow>(
      "SELECT * FROM avatars WHERE hash=?",
      hash,
    );
    if (concurrent) return concurrent.id;
    throw error;
  }
  return id;
}
