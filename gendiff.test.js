import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import genDiff from './index.js';

test('test1', () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);

  const result = fs.readFileSync(path.resolve(__dirname, '__fixtures__/result1.txt'), { encoding: 'utf8' });

  return expect(genDiff('file1.json', 'file2.json')).toEqual(result);
});