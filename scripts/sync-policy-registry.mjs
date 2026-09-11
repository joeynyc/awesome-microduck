#!/usr/bin/env node

import { readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const readmePath = resolve(root, 'readme.md');
const registryPath = resolve(root, 'policies.json');

function plainText(markdown) {
  return markdown
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/[*_`]/g, '')
    .trim();
}

export function registryFromReadme(markdown) {
  const heading = /^## Policies and Skills\s*$/m.exec(markdown);
  if (!heading) throw new Error('readme.md is missing the Policies and Skills section');
  const sectionStart = heading.index + heading[0].length;
  const remainder = markdown.slice(sectionStart);
  const nextHeading = /^##\s/m.exec(remainder);
  const section = nextHeading ? remainder.slice(0, nextHeading.index) : remainder;

  const entries = [];
  for (const match of section.matchAll(/^- \[([^\]]+)\]\((https?:\/\/[^)\s]+)\)\s*-\s*(.+)$/gm)) {
    const [, name, source, description] = match;
    const url = new URL(source);
    const parts = url.pathname.split('/').filter(Boolean);
    let provider;
    if (['huggingface.co', 'www.huggingface.co'].includes(url.hostname) && parts.length === 2) provider = 'huggingface';
    if (['github.com', 'www.github.com'].includes(url.hostname) && parts.length === 2) provider = 'github';
    if (!provider) continue;
    const repoId = `${parts[0]}/${parts[1].replace(/\.git$/, '')}`;
    entries.push({
      id: `${provider}:${repoId}`,
      name,
      provider,
      repo_id: repoId,
      source,
      description: plainText(description),
      artifact_mode: provider === 'huggingface' ? 'probe-provider' : 'source-only',
    });
  }

  const ids = new Set();
  const sources = new Set();
  for (const entry of entries) {
    if (ids.has(entry.id)) throw new Error(`Duplicate registry id: ${entry.id}`);
    if (sources.has(entry.source)) throw new Error(`Duplicate registry source: ${entry.source}`);
    ids.add(entry.id);
    sources.add(entry.source);
  }
  return {
    schema_version: 1,
    generated_from: 'readme.md#policies-and-skills',
    entries,
  };
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const expected = `${JSON.stringify(registryFromReadme(await readFile(readmePath, 'utf8')), null, 2)}\n`;
  if (process.argv.includes('--write')) {
    await writeFile(registryPath, expected, 'utf8');
    console.log(`Wrote ${registryPath}`);
  } else {
    let actual = '';
    try {
      actual = await readFile(registryPath, 'utf8');
    } catch {
      // The actionable stale-registry message below also covers a missing file.
    }
    if (actual !== expected) {
      console.error('policies.json is stale. Run: node scripts/sync-policy-registry.mjs --write');
      process.exitCode = 1;
    } else {
      console.log('policies.json matches the curated README section');
    }
  }
}
