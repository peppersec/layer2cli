#!/usr/bin/env node

var program = require('commander');

program
  .version('0.0.1')
  .command('aws', 'initialize aws account')
  .command('pool [create]', 'initialize user pool')
  .parse(process.argv)