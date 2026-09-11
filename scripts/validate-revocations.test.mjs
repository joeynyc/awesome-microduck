import assert from 'node:assert/strict';
import test from 'node:test';

import { validateRevocations } from './validate-revocations.mjs';

test('accepts a bounded revocation with an optional replacement', () => {
  assert.equal(validateRevocations({ entries: [{
    id: 'huggingface:author/unsafe',
    revoked_at: '2026-09-11',
    reason: 'Publisher reported a compromised artifact.',
    replacement: 'huggingface:author/safe',
  }] }), 1);
});

test('rejects duplicate identities and self replacements', () => {
  const entry = { id: 'github:author/model', revoked_at: '2026-09-11', reason: 'Withdrawn.' };
  assert.throws(() => validateRevocations({ entries: [entry, entry] }), /Duplicate revocation id/);
  assert.throws(() => validateRevocations({
    entries: [{ ...entry, replacement: entry.id }],
  }), /cannot reference itself/);
});

test('rejects impossible calendar dates', () => {
  assert.throws(() => validateRevocations({
    entries: [{ id: 'github:author/model', revoked_at: '2026-02-31', reason: 'Withdrawn.' }],
  }), /Invalid revocation date/);
});
