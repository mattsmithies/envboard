'use latest'

const Axios = require('axios')
const fs = require('fs')
const chalk = require('chalk')

const { decrypt } = require('security/encryption')
const { pullRoute, deleteRoute } = require('api')

module.exports.process = async ({ reference, password }) => {

  const params = { reference: reference.trim() }

  console.log(`Downloading ${chalk.bold('encrypted')} file from ${chalk.red('Envboard')}`)

  const response = await Axios.get(pullRoute, { params });

  const { filename, content, message } = response.data.data;

  // console.log(response.data.data);

  if (message === 'not found') {
    return console.log(chalk.yellow('NOT FOUND: Check that the reference is correct or the file has been downloaded already'));
  }

  const text = decrypt({
    password: password.trim(),
    encrypted: content
  })

  if (!text) {
    return console.log('Unable to decrypt and save file');
  }

  const savedFilename = filename + '-envboard'

  console.log(chalk.green(`Decrypting file and saving to - ${savedFilename}...`))

  fs.writeFileSync(savedFilename, text)

  console.log(chalk.magenta('Deleting remote encrypted file in Envboard'))

  await Axios.delete(deleteRoute, { params });
}
