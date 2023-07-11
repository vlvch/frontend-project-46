import _ from 'lodash';

const findComplex = (value) => {
  if (_.isPlainObject(value)) {
    return '[complex value]';
  }
  return typeof value === 'string' ? `'${value}'` : value;
};

const getStart = (nodeName) => (nodeName.length > 1 ? `${nodeName}.` : nodeName);

const plain = (node, nodeName = '') => {
  const result = node.map((key) => {
    const {
      nodeKey, value, value2, type,
    } = key;

    const path = `${getStart(nodeName)}${nodeKey}`;

    if (type === 'objects') {
      return plain(value, path);
    }
    if (type === 'removed') {
      return `Property '${path}' was removed`;
    }
    if (type === 'added') {
      return `Property '${path}' was added with value: ${findComplex(value)}`;
    }
    if (type !== 'equal') {
      return `Property '${path}' was updated. From ${findComplex(value)} to ${findComplex(value2)}`;
    }
    return '';
  });
  return [...result.filter(Boolean)].join('\n');
};
export default plain;
