import crypto from 'crypto-js';

const key = crypto.enc.Utf8.parse('yhn792kih456hbsd');
const iv = crypto.enc.Utf8.parse('1234567890abcdef');

const aes = {
  encrypt: function(data) {
    let encryptedData = '';
    if (typeof data === 'string') {
      const string = crypto.enc.Utf8.parse(data);
      encryptedData = crypto.AES.encrypt(string, key, {
        iv: iv,
        mode: crypto.mode.ECB,
        padding: crypto.pad.Pkcs7
      });
    } else if (typeof data === 'object') {
      // 对象格式的转成 JSON 字符串
      const jsonString = JSON.stringify(data);
      const string = crypto.enc.Utf8.parse(jsonString);
      encryptedData = crypto.AES.encrypt(string, key, {
        iv: iv,
        mode: crypto.mode.ECB,
        padding: crypto.pad.Pkcs7
      });
    }
    return crypto.enc.Base64.stringify(encryptedData.ciphertext);
  },
  decrypt: function(data) {
    const encryptedData = crypto.enc.Base64.parse(data);
    const string = crypto.enc.Base64.stringify(encryptedData);
    const decryptedData = crypto.AES.decrypt(string, key, {
      iv: iv,
      mode: crypto.mode.ECB,
      padding: crypto.pad.Pkcs7
    });
    const decryptedString = decryptedData.toString(crypto.enc.Utf8).toString();
    if (typeof JSON.parse(decryptedString) == "object") {
      // JSON 格式的字符串转成对象
      return JSON.parse(decryptedString);
    } else {
      decryptedString;
    }
  }
}

module.exports = aes;
