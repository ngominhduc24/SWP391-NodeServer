const secret = "swp391";
const jwt = require('jsonwebtoken');

function decode(data) {
    try {
        const decoded = jwt.verify(data, Buffer.from(secret, 'base64'));
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