const secret = "swp391";
const jwt = require('jsonwebtoken');

function decode(token) {
    try {
        const decoded = jwt.verify(token, Buffer.from(secret, 'base64'));
        // Token verified
        return decoded;
        
      } catch (err) {
        console.log(err);
        return null;
      }
}

module.exports = {
    decode
}