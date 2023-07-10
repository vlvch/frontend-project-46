import plain from './plain.js';
import stylish from './stylish.js';
import diffTree from '../difftree.js';

const formatter = (file1, file2, formatName) => {
  const tree = diffTree(file1, file2);

  switch (formatName) {
    case 'plain':
      return plain(tree);
    case 'stylish':
      return stylish(tree);
    case 'json':
      return JSON.stringify(tree);
    default:
      return stylish(tree);
  }
};
export default formatter;
