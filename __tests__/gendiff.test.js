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
  { file1: 'file1.json', file2: 'file2.json', resultFile: 'result1.txt' },
  { file1: 'file1.yml', file2: 'file2.yml', resultFile: 'result1.txt' },
  { file1: 'file1.yaml', file2: 'file2.yaml', resultFile: 'result1.txt' },
  { file1: 'file1.yaml', file2: 'file2.json', resultFile: 'result1.txt' },
  { file1: 'file1.json', file2: 'file2.json', resultFile: 'result2.txt', format: 'plain'},
  { file1: 'file1.json', file2: 'file2.json', resultFile: 'result1.txt', format: 'stylish' },
  { file1: 'file1.json', file2: 'file2.json', resultFile: 'result3.txt', format: 'json'},
];

test.each(table)( 'test' , ({file1, file2, resultFile, format}) => {
  const result = readFile(resultFile);

  return expect(genDiff(file1, file2, format)).toEqual(result);
});
