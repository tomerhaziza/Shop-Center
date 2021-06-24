const express = require("express");
const server = express();
const cors = require('cors');
const path = require('path')
const apiController = require('./controllers/api-controller')
const errorHandler = require("./errors/error-handler");
const loginFilter = require('./middleware/login-filter');


server.use('/uploads', express.static(__dirname  + '/uploads')); // Make uploads folder public
server.use(express.static('public')); // Make client public
// server.use(cors({ origin: "http://localhost:4200" })); // For dev only
server.use(cors());
server.use(express.json());

// JWT authenticator
server.use('/api', loginFilter());

// API's
server.use('/api', apiController);

server.use(express.static(path.join(__dirname, 'build')));

server.get('/chef', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
// For PWA support
// server.all('*', (req, res) => {
//     res.sendFile(path.join(__dirname, '/public/index.html'));
// })


server.use(errorHandler);

server.listen(process.env.PORT || 3000, () => console.log("Listening on http://localhost:3000"));