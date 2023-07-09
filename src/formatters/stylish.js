/* eslint-disable no-restricted-syntax */
import _ from 'lodash';

const indent = (depth, n = 0) => ' '.repeat(4 * depth - n);

const simpleTree = (node, depth) => {
  if (_.isObject(node)) {
    const result = Object.keys(node).map((key) => `${indent(depth)}${key}: ${simpleTree(node[key], depth + 1)}`);
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
    if (type === 'equal') {
      return `${indent(depth)}${nodeKey}: ${simpleTree(value, depth + 1)}`;
    }
    if (type === 'file1') {
      return `${indent(depth, 2)}- ${nodeKey}: ${simpleTree(value, depth + 1)}`;
    }
    if (type === 'file2') {
      return `${indent(depth, 2)}+ ${nodeKey}: ${simpleTree(value, depth + 1)}`;
    }
    return `${indent(depth, 2)}- ${nodeKey}: ${simpleTree(value, depth + 1)}\n${indent(depth, 2)}+ ${nodeKey}: ${simpleTree(value2, depth + 1)}`;
  });
  return ['{',
    ...result,
    `${indent(depth, 4)}}`].join('\n');
};
export default stylish;
