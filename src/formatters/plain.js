import _ from 'lodash';
const isComplex = (value) => {
    if (_.isObject(value)) {
      return '[complex value]'
    }
    return typeof value === 'string' ? `'${value}'` : value;
};

const plain = (node, nodeName = '') => {
  const result = node.map((key) => {
    const {
      nodeKey, value, value2, type,
    } = key;
    
    let pathStart;

    nodeName.length > 1 ? pathStart = `${nodeName}.` : pathStart = nodeName;
  
    const path = `${pathStart}${nodeKey}`;

    if (type === 'objects') {
      return plain(value, path);
    }
    if (type === 'file1') {
      return `Property '${path}' was removed`;
    }
    if (type === 'file2') {
      return `Property '${path}' was added with value: ${isComplex(value)}`;
    }
    if (type !== 'equal') {
      return `Property '${path}' was updated. From ${isComplex(value)} to ${isComplex(value2)}`;
    }
    return;
  })
  return [...result.filter(Boolean)].join('\n');
};
export default plain;
