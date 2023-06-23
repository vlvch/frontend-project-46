/* eslint-disable no-restricted-syntax */
import _ from 'lodash';
import getData from './utils.js';

const genDiff = (firstPath, secondPath) => {
  const firstFile = getData(firstPath);
  const secondFile = getData(secondPath);

  const keys = _.sortBy(Object.keys({ ...firstFile, ...secondFile }));

  let result = '{\n';

  for (const key of keys) {
    if (firstFile[key] !== undefined && secondFile[key] !== undefined) {
      if (firstFile[key] === secondFile[key]) {
        result += `    ${key}: ${firstFile[key]}\n`;
      } else {
        result += `  - ${key}: ${firstFile[key]}\n`;
        result += `  + ${key}: ${secondFile[key]}\n`;
      }
    } else if (firstFile[key] !== undefined) {
      result += `  - ${key}: ${firstFile[key]}\n`;
    } else if (secondFile[key] !== undefined) {
      result += `  + ${key}: ${secondFile[key]}\n`;
    }
  }
  result += '}';

  return result;
};
export default genDiff;
