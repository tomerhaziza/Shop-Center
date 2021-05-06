const expressJwt = require('express-jwt');
const { secret } = require('../config.json');
const ServerError = require('../errors/server-error');
const ErrorType = require("../errors/error-type");

function authenticateJwtRequestToken() {
    return [expressJwt({ secret, algorithms: ['HS256'] }).unless({
      path: [
        '/api/users/login', // Login
        '/api/users/register', // Register
        '/api/users/user-exists', // Register details validate
        '/api/users/me', // User identification
        '/api/products/count',
        '/api/orders/count'
      ]
    }), function(err, req, res, next){
      // throw new ServerError(ErrorType.NO_AUTHORIZATION_TOKEN);
      console.log('failed filter');
    }
    ]}

module.exports = authenticateJwtRequestToken;
