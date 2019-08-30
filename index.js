const commander = require('commander');
const inquirer = require('inquirer');

const chalk = require('chalk');

// console.log(chalk.blue('Hello world!'));

const program = new commander.Command();

program
  .command('push')
  .description(`Securely send technical onboarding files to a team member. Choose a file to send (like a ${chalk.underline('.env')}) it will be encrypted locally and a unique reference will be sent from ${chalk.red('Envboard')}.`)
  .action(() => {
    inquirer
      .prompt([
        {
          type: 'input',
          name: 'filepath',
          message: '[ 1 / 3 ] What is the file path of the file you wish to send?',
        },
        {
          type: 'input',
          name: 'email',
          message: '[ 2 / 3 ] What is the email of the team member that you want to sent this to?',
        },
        {
          type: 'confirm',
          name: 'confirm',
          message: `[ 3 / 3 ] The file will be ${chalk.bold('encrypted locally')}, and then be sent to ${chalk.red('Envboard')}. ${chalk.underline('You will need to manually send the generated password to the team member')}. Do you accept?`,
        }
      ])
      .then(answers => {
        console.log(answers);
      });
  });

program
  .command('pull')
  .description(`Pull the encrypted secret file from ${chalk.red('Envboard')} and add it to your local machine, upon successful decryption the remote encrypted file will be destroyed.`)
  .action(() => {
    inquirer
      .prompt([
        {
          type: 'input',
          name: 'reference',
          message: '[ 1 / 2 ] What is the unique file reference you received?',
        },
        {
          type: 'input',
          name: 'password',
          message: '[ 2 / 2 ] What is the generated password for the encrypted file?',
        }
      ])
      .then(answers => {
        console.log(answers);
      });
  });

program.parse(process.argv);
