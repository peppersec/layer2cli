const inquirer = require('inquirer')
const fs = require('fs')

inquirer
  .prompt([
    {
        type: 'input',
        message: 'Enter a AWS account id',
        name: 'aws_acc_id'
    },
    {
        type: 'password',
        message: 'Enter a AWS secret',
        name: 'aws_acc_secret'
    },
    {
        type: 'input',
        message: 'Enter AWS region',
        name: 'aws_region',
        default: 'us-east-1'
    }
  ])
  .then(answers => {
      const config = { accessKeyId: answers.aws_acc_id, secretAccessKey: answers.aws_acc_secret, region: answers.aws_region }
      console.log('created ./aws_config.json')
      fs.writeFileSync('./aws_config.json', JSON.stringify(config, null, 2), {encoding: 'utf8'})
  });