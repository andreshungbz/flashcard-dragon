// utils.test.ts
// tests for utility functions

import { describe, test, expect } from 'vitest';

import stringConvert from '../src/utils/string-convert.js';
import datestringConvert from '../src/utils/datestring-convert.js';

describe('String Convert', () => {
  test('Valid Value', () => {
    const test = 'Test';
    const result = stringConvert(test);

    expect(result).toBe('Test');
  });

  test('Undefined Value', () => {
    const test = undefined;
    const result = stringConvert(test);

    expect(result).toBe('');
  });
});

describe('Datestring Convert', () => {
  test('Converted Dates', () => {
    const date = new Date();
    const test = { created_at: date, updated_at: date };
    const expected = date.toLocaleString('en-US', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });

    datestringConvert(test);

    expect(test.created_at).toBe(expected);
    expect(test.updated_at).toBe(expected);
  });
});
