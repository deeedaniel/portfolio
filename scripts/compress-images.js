import sharp from "sharp";
import { readdirSync, statSync, unlinkSync } from "fs";
import { join, extname, basename } from "path";

const PUBLIC_DIR = new URL("../public", import.meta.url).pathname;
const EXTENSIONS = [".jpg", ".jpeg", ".png"];
const MAX_WIDTH = 900;
const QUALITY = 82;

const files = readdirSync(PUBLIC_DIR).filter((f) =>
  EXTENSIONS.includes(extname(f).toLowerCase())
);

if (files.length === 0) {
  console.log("No images to compress.");
  process.exit(0);
}

console.log(`Found ${files.length} images to compress...\n`);

for (const file of files) {
  const inputPath = join(PUBLIC_DIR, file);
  const nameWithoutExt = basename(file, extname(file));
  const outputPath = join(PUBLIC_DIR, `${nameWithoutExt}.webp`);

  const beforeBytes = statSync(inputPath).size;

  await sharp(inputPath)
    .resize({ width: MAX_WIDTH, withoutEnlargement: true })
    .webp({ quality: QUALITY })
    .toFile(outputPath);

  const afterBytes = statSync(outputPath).size;
  const saved = (((beforeBytes - afterBytes) / beforeBytes) * 100).toFixed(1);

  console.log(
    `${file.padEnd(30)} ${(beforeBytes / 1024).toFixed(0).padStart(5)}KB → ${(afterBytes / 1024).toFixed(0).padStart(5)}KB  (${saved}% smaller)`
  );

  unlinkSync(inputPath);
}

console.log("\nDone! All images converted to WebP.");
