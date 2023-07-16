import _ from 'lodash';

const indent = (depth, n = 0) => ' '.repeat(4 * depth - n);

const stringify = (node, depth) => {
  if (_.isPlainObject(node)) {
    const result = Object.keys(node).map((key) => `${indent(depth)}${key}: ${stringify(node[key], depth + 1)}`);

    return ['{',
      ...result,
      `${indent(depth, 4)}}`].join('\n');
  }
  return node;
};

const stylish = (tree, depth = 1) => {
  const result = tree.map((key) => {
    const {
      nodeKey, value, value2, type,
    } = key;

    if (type === 'objects') {
      return `${indent(depth)}${nodeKey}: ${stylish(value, depth + 1)}`;
    }
    if (type === 'nested') {
      return `${indent(depth)}${nodeKey}: ${stringify(value, depth + 1)}`;
    }
    if (type === 'removed') {
      return `${indent(depth, 2)}- ${nodeKey}: ${stringify(value, depth + 1)}`;
    }
    if (type === 'added') {
      return `${indent(depth, 2)}+ ${nodeKey}: ${stringify(value, depth + 1)}`;
    }
    if (type === 'tree') {
      return `${indent(depth, 2)}- ${nodeKey}: ${stringify(value, depth + 1)}\n${indent(depth, 2)}+ ${nodeKey}: ${stringify(value2, depth + 1)}`;
    }
    throw new Error('Node type is undefined');
  });
  return ['{',
    ...result,
    `${indent(depth, 4)}}`].join('\n');
};
export default stylish;
