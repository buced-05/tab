#!/usr/bin/env node
// Wrapper to preserve existing npm script path after reorganization
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { fileURLToPath } from 'node:url';
import fs from 'node:fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const target = path.resolve(__dirname, 'seo', 'sitemaps', 'generate-multilingual-sitemaps.js');

if (!fs.existsSync(target)) {
  console.error('Missing sitemap generator at', target);
  process.exit(1);
}

const moduleUrl = pathToFileURL(target).href;
await import(moduleUrl);
