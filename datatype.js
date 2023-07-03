import _ from 'lodash';

const valueType = (value1, value2) => {
  if (_.isObject(value1) && _.isObject(value2)) {
    return 'object, object';
  }
  if (_.isObject(value1)) {
    return !value2 ? 'object, undefined' : 'object, string';
  }
  if (_.isObject(value2)) {
    return !value1 ? 'undefined, object' : 'string, object';
  }
  if (value1 !== undefined && value2 !== undefined) {
    return 'string, string';
  }
  return value2 !== undefined ? 'undefined, string' : 'string, undefined';
};

export default valueType;
