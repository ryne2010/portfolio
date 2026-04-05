import { access, copyFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const currentDirectory = path.dirname(fileURLToPath(import.meta.url));
const distDirectory = path.resolve(currentDirectory, '../dist');
const indexPath = path.join(distDirectory, 'index.html');
const fallbackPath = path.join(distDirectory, '404.html');

async function main() {
  await access(indexPath);
  await copyFile(indexPath, fallbackPath);
  console.log('Copied dist/index.html -> dist/404.html for GitHub Pages SPA fallback.');
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
