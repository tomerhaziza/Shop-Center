const jwt = require('jsonwebtoken');
const CLIENT_ID = '70009867136-ru98v2leo4lgapf427k1pjm9nfjqe87b.apps.googleusercontent.com';
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(CLIENT_ID);
require('dotenv').config();

// Decode JWT token to get user ID
function getUserId(authHeader) {
    const token = authHeader.split(' ')[1];
    const decodedJwt = jwt.verify(token, process.env.JWT_SECRET);
    return decodedJwt.userId;
}

// For google oAuth
async function verify(token) {
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: CLIENT_ID
    });
    const payload = ticket.getPayload();
    const userid = payload['sub'];
    // console.log(`payload`, payload)
    return payload;
}

module.exports = {
    getUserId,
    verify
}