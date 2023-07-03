const formatter = (style) => {
  switch (style) {
    case 'stylish':
      return [' ', 4];
    case ' ':
      return ['', ''];
    default:
      return [' ', 4];
  }
};
export default formatter;
