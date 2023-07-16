import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import format from './formatters/format.js';
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

  const parsedData1 = dataParse(data1, type1);
  const parsedData2 = dataParse(data2, type2);

  return format(parsedData1, parsedData2, formatName);
};
export default genDiff;
