const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const ROOT = path.join(__dirname, "..");
const SVG_PATH = path.join(ROOT, "public", "mansha-svg", "mansha-logo.svg");
const PUBLIC = path.join(ROOT, "public");

async function main() {
  const svg = fs.readFileSync(SVG_PATH, "utf8");
  const match = svg.match(/xlink:href="(data:image\/png;base64,[^"]+)"/);
  if (!match) {
    throw new Error("Could not find embedded PNG in mansha-logo.svg");
  }

  const png = Buffer.from(match[1].split(",")[1], "base64");
  const trimmed = await sharp(png).trim({ threshold: 8 }).toBuffer();
  const meta = await sharp(trimmed).metadata();
  console.log("trimmed", meta.width, "x", meta.height);

  const size = Math.max(meta.width, meta.height);
  const square = await sharp(trimmed)
    .resize({
      width: size,
      height: size,
      fit: "contain",
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .png()
    .toBuffer();

  const sizes = [16, 32, 48, 180, 192, 512];
  for (const s of sizes) {
    await sharp(square)
      .resize(s, s, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .png()
      .toFile(path.join(PUBLIC, s === 180 ? "apple-touch-icon.png" : `favicon-${s}.png`));
  }

  await sharp(square)
    .resize(32, 32, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile(path.join(PUBLIC, "favicon.png"));

  // Multi-size ICO: 16, 32, 48
  const ico16 = await sharp(square).resize(16, 16).png().toBuffer();
  const ico32 = await sharp(square).resize(32, 32).png().toBuffer();
  const ico48 = await sharp(square).resize(48, 48).png().toBuffer();
  const ico = buildIco([
    { size: 16, png: ico16 },
    { size: 32, png: ico32 },
    { size: 48, png: ico48 },
  ]);
  fs.writeFileSync(path.join(PUBLIC, "favicon.ico"), ico);

  // Compact SVG wrapping the 192 PNG so browsers can use a vector-ish icon
  const png192 = fs.readFileSync(path.join(PUBLIC, "favicon-192.png"));
  const svgOut = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 192 192" role="img">
  <title>Mansha Group</title>
  <image width="192" height="192" xlink:href="data:image/png;base64,${png192.toString("base64")}"/>
</svg>
`;
  fs.writeFileSync(path.join(PUBLIC, "favicon.svg"), svgOut);

  console.log("favicon files written");
}

function buildIco(images) {
  const count = images.length;
  const headerSize = 6 + count * 16;
  const parts = [];
  let offset = headerSize;

  const header = Buffer.alloc(headerSize);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(count, 4);

  images.forEach((img, i) => {
    const entry = 6 + i * 16;
    header.writeUInt8(img.size === 256 ? 0 : img.size, entry);
    header.writeUInt8(img.size === 256 ? 0 : img.size, entry + 1);
    header.writeUInt8(0, entry + 2);
    header.writeUInt8(0, entry + 3);
    header.writeUInt16LE(1, entry + 4);
    header.writeUInt16LE(32, entry + 6);
    header.writeUInt32LE(img.png.length, entry + 8);
    header.writeUInt32LE(offset, entry + 12);
    parts.push(img.png);
    offset += img.png.length;
  });

  return Buffer.concat([header, ...parts]);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
