const inquirer = require('inquirer');
const { spawnSync } = require('child_process');
const chalk = require('chalk');
const fs = require('fs');

let projectName;

async function initialize() {
  const answers = await inquirer.prompt([{
    type: 'input',
    message: 'Enter name of the project',
    name: 'data',
  }]);
  projectName = answers.data;
  spawnSync('npm', ['init', 'react-app', projectName], { stdio: 'inherit' });
  console.log(chalk.green('Initialized!'));
}

async function install(package, displayName) {
  const answers = await inquirer.prompt([{
    type: 'confirm',
    message: `Install ${displayName || package}?`,
    name: 'data',
  }]);
  if (answers.data) {
    spawnSync('npm', ['i', package, '--save'], { cwd: projectName, stdio: 'inherit' });
    console.log(chalk.green('Installed!'));
  }
}

async function addEnvironment(env, displayName) {
  const answers = await inquirer.prompt([{
    type: 'input',
    message: `Enter your ${displayName || env}`,
    name: 'data',
  }]);
  if (answers.data) {
    const path = `./${projectName}/.env`;
    const string = `${env}=${answers.data}`;

    if (fs.existsSync(path)) {
      fs.appendFileSync(path, `\n${string}`, { encoding: 'utf8' });
    } else {
      fs.writeFileSync(path, string, { encoding: 'utf8' });
    }
    
    console.log(chalk.green('Saved!'));
  }
}

async function main() {
  await initialize();
  await install('truffle', 'Truffle');
  await install('ganache-cli');
  await install('zos', 'ZeppelinOS');
  await addEnvironment('INFURA_PROJECT_ID', 'Infura Project Id');
  await addEnvironment('ANOTHER_ENV', 'another env');
}
main();
