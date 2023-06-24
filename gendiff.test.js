/* eslint-disable no-undef */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import genDiff from './index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

test('test json', () => {
  const result = fs.readFileSync(path.resolve(__dirname, '__fixtures__/result1.txt'), { encoding: 'utf8' });

  return expect(genDiff('file1.json', 'file2.json')).toEqual(result);
});

test('test yaml', () => {
  const result = fs.readFileSync(path.resolve(__dirname, '__fixtures__/result1.txt'), { encoding: 'utf8' });

  return expect(genDiff('file1.yaml', 'file2.yaml')).toEqual(result);
});
