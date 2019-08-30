const { encrypt, decrypt } = require('./src/security/encryption');

encrypt({
  file: 'env.example',
  password: '123'
})

setTimeout(() => {
  decrypt({
    file: 'env.example.enc',
    password: '123'
  })
}, 1000);
