import plain from './plain.js';
import stylish from './stylish.js';
import makeTree from '../maketree.js';

const formatter = (file1, file2, formatName) => {
  const tree = makeTree(file1, file2);

  switch (formatName) {
    case 'plain':
      return plain(tree);
    default:
      return stylish(tree);
  }
};
export default formatter;
