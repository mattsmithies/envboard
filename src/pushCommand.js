'use latest'

const Axios = require('axios')
const FormData = require('form-data')

const chalk = require('chalk')
const fs = require('fs')
const uuidv4 = require('uuid/v4')

const { encryptAndStore } = require('./encryption')
const { pushRoute } = require('./apiRoutes')

const uploadFile = async ({ filepath, email, company }, onSuccessUpload) => {

  const encryptedFilePath = filepath + '.enc';
  const data = new FormData()

  data.append('file', fs.createReadStream(encryptedFilePath))
  data.append('company', company)
  data.append('to', email)
  data.append('filename', filepath)

  console.log(`Uploading ${chalk.bold('encrypted')} file to ${chalk.red('Envboard')}`)

  const response = await Axios({
    method: 'post',
    url: pushRoute,
    data,
    headers: {
      'content-type': `multipart/form-data; boundary=${data._boundary}`,
    },
  }).then(response => {
    onSuccessUpload()
  }).catch(error => {
    console.log('axios')
    console.log(chalk.red(`DANGER (The file was not saved): ${error.response.data.data.error}`))
  })

  console.log(`Cleaning up temporary files...`)

  fs.unlinkSync(encryptedFilePath)
}

module.exports.process = (params) => {

  const password = uuidv4().replace(/-/g,'')

  encryptAndStore({ file: params.filepath, password })

  console.log(chalk.green('Generating Password...'))
  console.log(chalk.yellow(`Encrypting file - ${params.filepath}.enc...`))

  const onSuccess = () => {
    console.log(`Email sent to ${chalk.cyanBright(params.email)}`)

    console.log(chalk.bold('*-------------------------------------*'))
    console.log('Send this password to your team member:')
    console.log(chalk.green(password))
    console.log(chalk.bold('*-------------------------------------*'))
  }

  setTimeout(() => uploadFile(params, onSuccess), 10)
}
