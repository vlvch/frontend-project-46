import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import YAML from 'yaml';

const getData = (file) => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);

  const absolutePath = path.resolve(__dirname, '..', '__fixtures__', file.toString());

  const result = fs.readFileSync(absolutePath, 'utf-8');

  return result;
};

const dataParse = (filepath) => {
  const extension = path.extname(filepath);

  switch (extension) {
    case '.json':
      return JSON.parse(getData(filepath));
    case '.yaml':
      return YAML.parse(getData(filepath));
    default:
      return 'cant parse this extension';
  }
};
export default dataParse;
