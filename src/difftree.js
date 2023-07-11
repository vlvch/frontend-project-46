import _ from 'lodash';

const diffTree = (file1, file2 = {}) => {
  const keys = _.sortBy(Object.keys({ ...file1, ...file2 }));

  const result = keys.map((key) => {
    if (_.isPlainObject(file1[key]) && _.isPlainObject(file2[key])) {
      return { nodeKey: key, value: diffTree(file1[key], file2[key]), type: 'objects' };
    }
    if (_.isEqual(file1[key], file2[key])) {
      return { nodeKey: key, value: file2[key], type: 'equal' };
    }
    if (file1[key] !== undefined && file2[key] === undefined) {
      return { nodeKey: key, value: file1[key], type: 'removed' };
    }
    if (file1[key] === undefined && file2[key] !== undefined) {
      return { nodeKey: key, value: file2[key], type: 'added' };
    }
    return {
      nodeKey: key,
      value: file1[key],
      value2: file2[key],
      type: 'tree',
    };
  });
  return result;
};
export default diffTree;
