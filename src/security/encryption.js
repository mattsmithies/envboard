const Crypto = require('crypto');
const fs = require('fs');

const encrypt = (text, key) => {
  const iv = Crypto.randomBytes(16);
  const cipher = Crypto.createCipheriv('aes256', new Buffer(key), iv);
  const encrypted = cipher.update(text);
  const finalBuffer = Buffer.concat([encrypted, cipher.final()]);
  //Need to retain IV for decryption, so this can be appended to the output with a separator (non-hex for this example)
  const encryptedHex = iv.toString('base64') + ':' + finalBuffer.toString('base64')

  return encryptedHex;
}

const decrypt = (encryptedText, key) => {
  try {

    const encryptedArray = encryptedText.split(':');
    const iv = new Buffer(encryptedArray[0], 'base64');
    const encrypted = new Buffer(encryptedArray[1], 'base64');
    const decipher = Crypto.createDecipheriv('aes256', new Buffer(key), iv);
    const decrypted = decipher.update(encrypted);
    const clearText = Buffer.concat([decrypted, decipher.final()]).toString();

    return clearText;

  } catch (error) {
    return false
  }
}

module.exports.encryptAndStore = ({ file, password }) => {
  const text = fs.readFileSync(file, 'utf8')

  const encoded = encrypt(text, password);

  fs.writeFileSync(file + '.enc', encoded)
}

module.exports.decrypt = ({ filename, encrypted, password }) => {
  const text = decrypt(encrypted, password);

  return text;
}
