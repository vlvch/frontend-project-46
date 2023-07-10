/* eslint-disable no-undef */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.resolve(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), { encoding: 'utf8' });

test('test extension json', () => {
  const result = readFile('result1.txt');

  return expect(genDiff('file1.json', 'file2.json')).toEqual(result);
});

test('test extension yaml', () => {
  const result = readFile('result1.txt');

  return expect(genDiff('file1.yaml', 'file2.yaml')).toEqual(result);
});

test('test extensions yaml and json', () => {
  const result = readFile('result1.txt');

  return expect(genDiff('file1.json', 'file2.yaml')).toEqual(result);
});

test('test format plain', () => {
  const result = readFile('result2.txt');

  return expect(genDiff('file1.json', 'file2.json', 'plain')).toEqual(result);
});

test('test format stylish', () => {
  const result = readFile('result1.txt');

  return expect(genDiff('file1.json', 'file2.json', 'stylish')).toEqual(result);
});

test('test format json', () => {
  const result = readFile('result3.txt');

  return expect(genDiff('file1.json', 'file2.json', 'json')).toEqual(result);
});