const expressJwt = require('express-jwt');
const ServerError = require('../errors/server-error');
const ErrorType = require("../errors/error-type");
require('dotenv').config();
const secret = process.env.JWT_SECRET

const authenticateJwtRequestToken = () => {
  return [expressJwt({
    secret,
    algorithms: ['HS256'],
    getToken: function getTokenFromCookie(req) {
      return req.cookies.token.split(' ')[1]
    }
  }).unless({
    path: [
      '/api/users/login', // Login
      '/api/users/google-login', // Login oauth
      '/api/users/register', // Register
      '/api/users/user-exists', // Register details validate
      '/api/categories',
      '/api/orders/count',
      '/api/products/count',
      '/api/products/popular',
      { url: /^\/api\/products\/search\/.*/, methods: ['GET'] },
      { url: /^\/api\/products\/.*/, methods: ['GET'] }
    ]
  }), (err, req, res, next) => {
    throw new ServerError(ErrorType.NO_AUTHORIZATION_TOKEN);
  }
  ]
}

module.exports = authenticateJwtRequestToken;
