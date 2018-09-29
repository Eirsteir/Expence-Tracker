// Login model
const Login = require('../models/Login');
// Users model
const User = require('../models/User');

const jwt = require('jsonwebtoken');
const redis = require('redis');

// setup redis
// const redisClient = redis.createClient('6379', '127.0.0.1');
const redisClient = redis.createClient(process.env.REDIS_URI);
redisClient.on('connect', () => console.log('Connected to RedisDB'))
redisClient.on('error', err => console.log);

const handleSignin = (req, res, db, bcrypt) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return Promise.reject('incorrect form submission')
  }

  return Login.find({ email: email })
    .then(data => {
      const isValid = bcrypt.compareSync(password, data[0].hash); // returns true if correct credentials
      if (isValid) {
        return User.find({ email: email })
          .then(user => user[0])
          .catch(err => Promise.reject('unable to get user'))
      } else {
        return Promise.reject('wrong email or password')
      }
  })
  .catch(err => Promise.reject('wrong credentials'))
}

const getAuthTokenId = (req, res) => {
  const { authorization } = req.headers;
  return redisClient.get(authorization, (err, reply) => {
    if (err || !reply) {
      return res.status(400).json('unauthorized')
    }
    return res.json({ id: reply })
  })
}

const assignToken = (email) => {
  const jwtPayload = { email };
  return jwt.sign(jwtPayload, process.env.JWT_SECRET, { expiresIn: '60 days' });
}

const setToken = (key, value) => {
  return Promise.resolve(redisClient.set(key, value))
}

const createSessions = (user) => {
  const { email, _id } = user;
  const token = assignToken(email);
  return setToken(token, _id)
    .then(() => {
      return { success: 'true', userId: _id, token }
    })
    .catch(console.log)
}

const signinAuthentification = (req, res, db, bcrypt) => {
  const { authorization } = req.headers;
  return authorization ? getAuthTokenId(req, res) :
  handleSignin(req, res, db, bcrypt)
  .then(data => {
    return data._id && data.email ? createSessions(data) : Promise.reject(data)
  })
  .then(session => res.json(session))
  .catch(err => res.status(400).json('something went wrong'))
}

module.exports = {
  signinAuthentification,
  redisClient
}
