#!/usr/bin/env node

import { readFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');

export function validateRevocations(revocations) {
  const ids = new Set();
  for (const entry of revocations.entries) {
    if (ids.has(entry.id)) throw new Error(`Duplicate revocation id: ${entry.id}`);
    if (entry.replacement === entry.id) throw new Error(`Revocation replacement cannot reference itself: ${entry.id}`);
    const parsed = new Date(`${entry.revoked_at}T00:00:00Z`);
    if (Number.isNaN(parsed.valueOf()) || parsed.toISOString().slice(0, 10) !== entry.revoked_at) {
      throw new Error(`Invalid revocation date: ${entry.revoked_at}`);
    }
    ids.add(entry.id);
  }
  return revocations.entries.length;
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const revocations = JSON.parse(await readFile(resolve(root, 'revocations.json'), 'utf8'));
  console.log(`Validated ${validateRevocations(revocations)} policy revocation(s)`);
}
