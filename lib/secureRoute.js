const Promise = require('bluebird');
const jwt = Promise.promisifyAll(require('jsonwebtoken'));
const { secret } = require('../config/environment');
const User = require('../models/user');

function secureRoute(req, res, next) {
  // if(!req.headers.authorization) return res.unauthorized();
  const token = req.headers.authorization.replace('Bearer ', '');

  // console.log(req.headers.authorization);
  // console.log(token);

  jwt
    .verifyAsync(token, secret)
    .then((payload) => {
      return User.findById(payload.userId);
    })
    .then((user) => {
      if(!user) return res.unauthorized();
      // console.log(user);
      req.user = user;
      return next();
    })
    .catch(next);
}

module.exports = secureRoute;
