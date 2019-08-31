const commander = require('commander')
const inquirer = require('inquirer')
const chalk = require('chalk')
const fs = require('fs')
const emailValidator = require("email-validator")

const PullCommand = require('commands/pullCommand')
const PushCommand = require('commands/pushCommand')

const program = new commander.Command()

program
  .command('push <filepath>')
  .description(`Securely send technical onboarding files to a team member. Choose a file to send (like a ${chalk.underline('.env')}) with a max size of ${chalk.underline('10kb')} it will be encrypted locally and a unique reference will be sent from ${chalk.red('Envboard')}.`)
  .action((filepath) => {

    if(!fs.existsSync(filepath)) {
      console.log(`${chalk.yellow('WARNING')}: filepath: ${filepath} does not exist.`)
      return
    }

    inquirer
      .prompt([
        {
          type: 'input',
          name: 'email',
          message: `${chalk.inverse('[ 1 / 3 ]')} What is the email of the team member that you want to sent this to?`,
        },
        {
          type: 'input',
          name: 'company',
          message: `${chalk.inverse('[ 2 / 3 ]')} What is the company that you work for?`,
        },
        {
          type: 'confirm',
          name: 'confirm',
          message: `${chalk.inverse('[ 3 / 3 ]')} The file will be ${chalk.bold('encrypted locally')}, and then be sent to ${chalk.red('Envboard')}. ${chalk.underline('You will need to manually send the generated password to the team member')}. Do you accept?`,
        }
      ])
      .then(answers => {
        if (!answers.confirm) return
        if (!answers.company) {
          console.log(`${chalk.yellow('WARNING')}: company has not been entered.`)
          return
        }
        if (!emailValidator.validate(answers.email)) {
          console.log(`${chalk.yellow('WARNING')}: email has not been entered or is invalid.`)
          return
        }

        PushCommand.process({
          ...answers,
          filepath
        })
      })
  })

program
  .command('pull')
  .description(`Pull the encrypted secret file from ${chalk.red('Envboard')} and add it to your local machine, upon successful decryption the remote encrypted file will be destroyed.`)
  .action(() => {
    inquirer
      .prompt([
        {
          type: 'input',
          name: 'reference',
          message: `${chalk.inverse('[ 1 / 2 ]')} What is the unique file reference you received?`,
        },
        {
          type: 'input',
          name: 'password',
          message: `${chalk.inverse('[ 2 / 2 ]')} What is the generated password for the encrypted file?`,
        }
      ])
      .then(answers => {
        if (!answers.reference || !answers.password) {
          console.log(`${chalk.yellow('WARNING')}: Enter a reference and/or password.`)
          return
        }

        PullCommand.process(answers)
      })
  })

program.parse(process.argv)
