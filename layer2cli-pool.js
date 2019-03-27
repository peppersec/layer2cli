var program = require('commander');
program
  .version('0.0.1')
  .command('create', 'create pool')
  .parse(process.argv)