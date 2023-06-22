import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const getData = (filepath) => {
  const __filename = fileURLToPath(import.meta.url);

  const __dirname = dirname(__filename);

  const pathToString = filepath.toString();

  const absolutePath = path.resolve(__dirname, '__fixtures__', pathToString);

  const result = fs.readFileSync(absolutePath, 'utf-8');

  return JSON.parse(result);
};
export default getData;
