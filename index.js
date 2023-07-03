/* eslint-disable no-restricted-syntax */
import _ from 'lodash';
import parseData from './parser.js';
import formatter from './formatter.js';
import valueType from './datatype.js';

const genDiff = (firstPath, secondPath, format) => {
  const firstFile = parseData(firstPath);
  const secondFile = parseData(secondPath);

  const iter = (file1, file2, depth = 0) => {
    const keys = Object.keys({ ...file1, ...file2 });

    const [replacer, spacesCount] = formatter(format);

    const indent = replacer.repeat(spacesCount * depth);

    const depthCount = depth + 1;

    const newIndent = replacer.repeat(spacesCount * depthCount);

    const diffSpace = replacer.repeat((spacesCount * depthCount) - 2);

    const result = _.sortBy(keys).map((key) => {
      const file1Data = `${key}: ${file1[key]}`;
      const file2Data = `${key}: ${file2[key]}`;

      const typeOfValues = valueType(file1[key], file2[key]);

      if (depthCount > 1 && _.isObject(file2) && Object.keys(file2).length === 0) {
        switch (typeOfValues) {
          case 'object, undefined':
            return `${newIndent}${key}: ${iter(file1[key], {}, depthCount)}`;
          case 'undefined, object':
            return `${newIndent}${key}: ${iter(file2[key], {}, depthCount)}`;
          case 'string, undefined':
            return `${newIndent}${file1Data}`;
          case 'undefined, string':
            return `${newIndent}${file2Data}`;
          default:
            throw new Error('Something went wrong');
        }
      }
      switch (typeOfValues) {
        case 'object, object':
          return `${newIndent}${key}: ${iter(file1[key], file2[key], depthCount)}`;
        case 'object, undefined':
          return `${diffSpace}- ${key}: ${iter(file1[key], {}, depthCount)}`;
        case 'object, string':
          return `${diffSpace}- ${key}: ${iter(file1[key], {}, depthCount)}\n${diffSpace}+ ${file2Data}`;
        case 'undefined, object':
          return `${diffSpace}+ ${key}: ${iter(file2[key], {}, depthCount)}`;
        case 'string, object':
          return `${diffSpace}- ${file1Data}\n${diffSpace}+ ${key}: ${iter(file2[key], {}, depthCount)}`;
        case 'string, string':
          return file1[key] === file2[key] ? `${newIndent}${file2Data}` : `${diffSpace}- ${file1Data}\n${diffSpace}+ ${file2Data}`;
        case 'string, undefined':
          return `${diffSpace}- ${file1Data}`;
        case 'undefined, string':
          return `${diffSpace}+ ${file2Data}`;
        default:
          throw new Error('Something went wrong');
      }
    });
    return [
      '{',
      ...result, `${indent}}`,
    ].join('\n');
  };
  return iter(firstFile, secondFile);
};
export default genDiff;
