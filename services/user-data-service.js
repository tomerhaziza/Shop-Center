const jwt = require('jsonwebtoken');
const { secret } = require('../config.json');

// Decode JWT token to get user ID
function getUserId(authHeader) {
    const token = authHeader.split(' ')[1];
    const decodedJwt = jwt.verify(token, secret);
    return decodedJwt.userId;
}

module.exports = {
    getUserId
}