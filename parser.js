import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import YAML from 'yaml';

const getData = (file) => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);

  const fileString = file.toString();

  const absolutePath = path.resolve(__dirname, '__fixtures__', fileString);

  const result = fs.readFileSync(absolutePath, 'utf-8');

  return result;
};

const getExtension = (file) => {
  let ext;
  if (file.includes('.json')) {
    ext = 'json';
  } else if (file.includes('.yaml') || file.includes('.yml')) {
    ext = 'yaml';
  }
  return ext;
};

const dataParse = (file) => {
  const ext = getExtension(file);

  let result;
  if (ext === 'json') {
    result = JSON.parse(getData(file));
  } else if (ext === 'yaml') {
    result = YAML.parse(getData(file));
  }
  return result;
};
export default dataParse;
