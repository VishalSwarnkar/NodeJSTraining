const jwt = require('jsonwebtoken');
const config = require('../config');
require('dotenv').config();

exports.authorization = function (req, res, next) {
  // check header for the token
  let token = req.headers['access-token'];
  // decode token
  if (token) {
    // verifies secret and checks if the token is expired
    jwt.verify(token, config.secret, (err, decoded) => {
      if (err) {
        return res.json({ message: 'invalid token' });
      } else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;
        next();
      }
    });
  } else {
    // if there is no token  
    res.send({
      message: 'No token provided.'
    });
  }
}

exports.setToken = function (req, res) {
  if (req.body.name === process.env.USERNAME && req.body.password === process.env.PASSWORD) {
    const payload = {
      check: true
    };

    let token = jwt.sign(payload, config.secret, {
      expiresIn: 1440
    });

    res.json({
      message: 'authenticated done',
      status: `done : ${token}`
    })
  } else {
    res.json({
      message: "un authorised user"
    })
  }
} 