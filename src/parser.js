import YAML from 'yaml';

const dataParse = (data, type) => {
  switch (type) {
    case 'json':
      return JSON.parse(data);
    case 'yml': case 'yaml':
      return YAML.parse(data);
    default:
      throw new Error('Can`t parse this extension');
  }
};
export default dataParse;
