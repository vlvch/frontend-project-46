import formatter from './formatters/formatter.js';
import dataParse from './parser.js';

const genDiff = (filepath1, filepath2, formatName) => {
  const file1 = dataParse(filepath1);
  const file2 = dataParse(filepath2);

  return formatter(file1, file2, formatName);
};
export default genDiff;
