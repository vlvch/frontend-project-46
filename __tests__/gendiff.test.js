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

const table = [
  {
    name: 'extension json', file1: 'file1.json', file2: 'file2.json', resultFile: 'result1.txt',
  },
  {
    name: 'extension yml', file1: 'file1.yml', file2: 'file2.yml', resultFile: 'result1.txt',
  },
  {
    name: 'extension json', file1: 'file1.yaml', file2: 'file2.yaml', resultFile: 'result1.txt',
  },
  {
    name: 'extension json and yaml', file1: 'file1.yaml', file2: 'file2.json', resultFile: 'result1.txt',
  },
  {
    name: 'format plain', file1: 'file1.json', file2: 'file2.json', resultFile: 'result2.txt', format: 'plain',
  },
  {
    name: 'format stylish', file1: 'file1.json', file2: 'file2.json', resultFile: 'result1.txt', format: 'stylish',
  },
  {
    name: 'format json', file1: 'file1.json', file2: 'file2.json', resultFile: 'result3.txt', format: 'json',
  },
];

describe.each(table)('test', ({
  name, file1, file2, resultFile, format,
}) => {
  test(`${name}`, () => {
    const result = readFile(resultFile);

    return expect(genDiff(file1, file2, format)).toEqual(result);
  });
});
