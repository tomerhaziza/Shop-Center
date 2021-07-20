const expressJwt = require('express-jwt');
const ServerError = require('../errors/server-error');
const ErrorType = require("../errors/error-type");
require('dotenv').config();
const secret = process.env.JWT_SECRET

function authenticateJwtRequestToken() {
    return [expressJwt({ secret, algorithms: ['HS256'] }).unless({
      path: [
        '/api/users/login', // Login
        '/api/users/google-login', // Login oauth
        '/api/users/register', // Register
        '/api/users/user-exists', // Register details validate
        '/api/users/me', // User identification
        '/api/products/count',
        '/api/orders/count'
      ]
    }), function(err, req, res, next){
      throw new ServerError(ErrorType.NO_AUTHORIZATION_TOKEN);
    }
    ]}

module.exports = authenticateJwtRequestToken;
