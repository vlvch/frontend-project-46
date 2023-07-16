import plain from './plain.js';
import stylish from './stylish.js';
import makeDiffTree from '../makedifftree.js';

const format = (file1, file2, formatName) => {
  const tree = makeDiffTree(file1, file2);

  switch (formatName) {
    case 'plain':
      return plain(tree);
    case 'stylish':
      return stylish(tree);
    case 'json':
      return JSON.stringify(tree);
    default:
      throw new Error('Unknown format');
  }
};
export default format;
