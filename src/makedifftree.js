import _ from 'lodash';

const makeDiffTree = (data1, data2) => {
  const keys = _.sortBy(Object.keys({ ...data1, ...data2 }));

  const result = keys.map((key) => {
    if (_.isPlainObject(data1[key]) && _.isPlainObject(data2[key])) {
      return { nodeKey: key, value: makeDiffTree(data1[key], data2[key]), type: 'objects' };
    }
    if (_.isEqual(data1[key], data2[key])) {
      return { nodeKey: key, value: data2[key], type: 'nested' };
    }
    if (_.has(data1, key) && !_.has(data2, key)) {
      return { nodeKey: key, value: data1[key], type: 'removed' };
    }
    if (!_.has(data1, key) && _.has(data2, key)) {
      return { nodeKey: key, value: data2[key], type: 'added' };
    }
    return {
      nodeKey: key,
      value: data1[key],
      value2: data2[key],
      type: 'tree',
    };
  });
  return result;
};
export default makeDiffTree;
