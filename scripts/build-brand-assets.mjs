import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const ROOT = process.cwd();
const sourcePath = path.join(ROOT, 'brand', 'dmvcn-mark.svg');
const publicPath = path.join(ROOT, 'public');
const source = await readFile(sourcePath);

const renderPng = (size, opaque = false) => {
  const image = sharp(source, { density: 384 }).resize(size, size, {
    fit: 'fill',
    kernel: sharp.kernel.lanczos3,
  });

  return (opaque ? image.flatten({ background: '#165c43' }) : image)
    .png({ compressionLevel: 9, palette: false })
    .toBuffer();
};

const png16 = await renderPng(16);
const png32 = await renderPng(32);
const png48 = await renderPng(48);

const icoHeader = Buffer.alloc(6);
icoHeader.writeUInt16LE(0, 0);
icoHeader.writeUInt16LE(1, 2);
icoHeader.writeUInt16LE(3, 4);

let offset = icoHeader.length + (16 * 3);
const icoEntries = [png16, png32, png48].map((png, index) => {
  const size = [16, 32, 48][index];
  const entry = Buffer.alloc(16);
  entry.writeUInt8(size, 0);
  entry.writeUInt8(size, 1);
  entry.writeUInt8(0, 2);
  entry.writeUInt8(0, 3);
  entry.writeUInt16LE(1, 4);
  entry.writeUInt16LE(32, 6);
  entry.writeUInt32LE(png.length, 8);
  entry.writeUInt32LE(offset, 12);
  offset += png.length;
  return entry;
});

const outputs = [
  ['favicon-16x16.png', png16],
  ['favicon-32x32.png', png32],
  ['favicon-48x48.png', png48],
  ['favicon.ico', Buffer.concat([icoHeader, ...icoEntries, png16, png32, png48])],
  ['assets/dmvcn-mark-72.png', await renderPng(72)],
  ['assets/dmvcn-mark.png', await renderPng(512)],
  ['assets/dmvcn-touch-icon-v3.png', await renderPng(180, true)],
  ['favicon-192x192.png', await renderPng(192, true)],
  ['favicon-512x512.png', await renderPng(512, true)],
];

await Promise.all(
  outputs.map(([relativePath, contents]) =>
    writeFile(path.join(publicPath, relativePath), contents),
  ),
);

console.log(`Built ${outputs.length} DMVCN brand assets from ${path.relative(ROOT, sourcePath)}.`);
