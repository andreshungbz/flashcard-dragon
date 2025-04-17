// form.test.ts
// tests for input validation response codes

import { describe, test, expect } from 'vitest';
import appconfig from '../src/config/settings.js';

describe('Sets', () => {
  describe('Create Set', () => {
    test('Required Fields', async () => {
      const data: URLSearchParams = new URLSearchParams();
      data.set('set_name', '');
      data.set('set_description', '');

      const response = await fetch(`${appconfig.url}/set/create`, {
        method: 'POST',
        body: data,
      });

      expect(response.status).toBe(400);
    });

    test('Name Too Long', async () => {
      const data: URLSearchParams = new URLSearchParams();
      data.set('set_name', 't'.repeat(101));
      data.set('set_description', 'test');

      const response = await fetch(`${appconfig.url}/set/create`, {
        method: 'POST',
        body: data,
      });

      expect(response.status).toBe(400);
    });
  });
});

describe('Cards', () => {
  describe('Create Card', () => {
    test('Required Fields', async () => {
      const data: URLSearchParams = new URLSearchParams();
      data.set('card_question', '');
      data.set('card_answer', '');

      const response = await fetch(`${appconfig.url}/card/create`, {
        method: 'POST',
        body: data,
      });

      expect(response.status).toBe(400);
    });
  });
});
