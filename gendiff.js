const fs = require('node:fs');
const path = require('node:path');
const _ = require('lodash');

const { program } = require('commander');

program
  .description('Compares two configuration files and shows a difference.')
  .version('0.0.1', '-V, --version', 'output the version number')
  .argument('<filepath1>')
  .argument('<filepath2>')
  .option('-f, --format <type>', 'output information')
  .action(function genDiff(filepath1, filepath2) {
    const getData = (filepath) => {
      const absolutePath = path.resolve(__dirname, filepath.toString());
      const result = fs.readFileSync(absolutePath, 'utf-8');
      return JSON.parse(result);
    }

    const data1 = getData(filepath1);
    const data2 = getData(filepath2);

    const keys = _.sortBy(Object.keys(Object.assign({}, data1, data2)))
    
    let result = '{\n';

    for (const key of keys) {
      if (Object.hasOwn(data1, key)) {
        if (Object.hasOwn(data2, key)) {
          if (data1[key] === data2[key]) {
            result += `  ${key}: ${data1[key]}\n`;
          } else {
          result +=`  -${key}: ${data1[key]}\n`;
          result +=`  +${key}: ${data2[key]}\n`;
          }
        } else {
          result += `  -${key}: ${data1[key]}\n`
        }  
      } else {
      result += `  +${key}: ${data2[key]}\n`;
      }
    }
    result += '}';

    console.log(result);
  })

program.parse();
