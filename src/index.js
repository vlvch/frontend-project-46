import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import formatter from './formatters/formatter.js';
import dataParse from './parser.js';

const getType = (filepath) => {
  const extension = path.extname(filepath);
  return extension.substring(1);
};

const getData = (filepath) => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);

  const absolutePath = path.resolve(__dirname, '..', '__fixtures__', filepath.toString());

  return fs.readFileSync(absolutePath, 'utf-8');
};

const genDiff = (filepath1, filepath2, formatName = 'stylish') => {
  const type1 = getType(filepath1);
  const type2 = getType(filepath2);

  const data1 = getData(filepath1);
  const data2 = getData(filepath2);

  const file1 = dataParse(data1, type1);
  const file2 = dataParse(data2, type2);

  return formatter(file1, file2, formatName);
};
export default genDiff;
