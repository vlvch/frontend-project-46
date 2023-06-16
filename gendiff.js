const { program } = require('commander');

program
  .description('Compares two configuration files and shows a difference.')
  .version('0.0.1', '-V, --version', 'output the version number')
  .argument('<type>', 'output format')
  .option('-f, --format <type>', 'output information')

program.parse();
