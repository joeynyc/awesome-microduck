import assert from 'node:assert/strict';
import test from 'node:test';

import { registryFromReadme } from './sync-policy-registry.mjs';

test('builds normalized Hugging Face and GitHub entries', () => {
  const registry = registryFromReadme(`# Catalog
## Policies and Skills
- [Walker](https://huggingface.co/author/walker) - A **bounded** gait. *Sim-only.*
- [Backflip](https://github.com/author/backflip) - A [reproducible](https://example.com) task.
- [Search](https://huggingface.co/models?search=microduck) - Not a repository.
## Data
`);
  assert.equal(registry.schema_version, 1);
  assert.deepEqual(registry.entries, [
    {
      id: 'huggingface:author/walker',
      name: 'Walker',
      provider: 'huggingface',
      repo_id: 'author/walker',
      source: 'https://huggingface.co/author/walker',
      description: 'A bounded gait. Sim-only.',
      artifact_mode: 'probe-provider',
    },
    {
      id: 'github:author/backflip',
      name: 'Backflip',
      provider: 'github',
      repo_id: 'author/backflip',
      source: 'https://github.com/author/backflip',
      description: 'A reproducible task.',
      artifact_mode: 'source-only',
    },
  ]);
});

test('rejects duplicate canonical sources', () => {
  assert.throws(
    () => registryFromReadme(`## Policies and Skills
- [Walker](https://huggingface.co/author/walker) - First entry.
- [Walker again](https://huggingface.co/author/walker) - Duplicate entry.
`),
    /Duplicate registry id/,
  );
});

test('requires the curated section', () => {
  assert.throws(() => registryFromReadme('# Empty'), /missing the Policies and Skills section/);
});
