/* eslint-disable no-restricted-syntax */
import _ from 'lodash';
import getData from './utils.js';

const genDiff = (filepath1, filepath2) => {
  const data1 = getData(filepath1);
  const data2 = getData(filepath2);

  const keys = _.sortBy(Object.keys({ ...data1, ...data2 }));

  let result = '{\n';

  for (const key of keys) {
    if (Object.hasOwn(data1, key) && Object.hasOwn(data2, key)) {
      if (data1[key] === data2[key]) {
        result += `    ${key}: ${data1[key]}\n`;
      } else {
        result += `  - ${key}: ${data1[key]}\n`;
        result += `  + ${key}: ${data2[key]}\n`;
      }
    } else if (Object.hasOwn(data1, key)) {
      result += `  - ${key}: ${data1[key]}\n`;
    } else if (Object.hasOwn(data2, key)) {
      result += `  + ${key}: ${data2[key]}\n`;
    }
  }
  result += '}';

  return result;
};
export default genDiff;
