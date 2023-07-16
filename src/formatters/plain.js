import _ from 'lodash';

const stringify = (value) => {
  if (_.isPlainObject(value)) {
    return '[complex value]';
  }
  return typeof value === 'string' ? `'${value}'` : value;
};

const makePath = (nodeName, nodeKey) => {
  const result = [nodeName, nodeKey];

  return result.filter(Boolean).join('.');
};

const plain = (node, nodeName = '') => {
  const result = node.map((key) => {
    const {
      nodeKey, value, value2, type,
    } = key;

    const path = makePath(nodeName, nodeKey);

    if (type === 'objects') {
      return plain(value, path);
    }
    if (type === 'removed') {
      return `Property '${path}' was removed`;
    }
    if (type === 'added') {
      return `Property '${path}' was added with value: ${stringify(value)}`;
    }
    if (type === 'tree') {
      return `Property '${path}' was updated. From ${stringify(value)} to ${stringify(value2)}`;
    }
    if (type === 'nested') {
      return '';
    }
    throw new Error('Node type is undefined');
  });
  return [...result.filter(Boolean)].join('\n');
};
export default plain;
