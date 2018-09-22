const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const bcrypt = require('bcrypt-nodejs');

const register = require('./controllers/register');
const signin = require('./controllers/signin');

// Setup environmental variables in development
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(morgan('combined'));

const db = {
  users: [
    {
      id: '1',
      name: 'a',
      email: 'a@a.com',
      password: 'a',
      joined: new Date()
    },
    {
      id: '2',
      name: 'John',
      email: 'John@gmail.com',
      password: 'John',
      joined: new Date()
    }
  ],
  login: [
    {
      id: '999',
      hash: '',
      email: 'a@a.com'
    }
  ]
}

app.get('/', (req,res) => { res.status(200).json('Server is up and running')});
app.post('/signin', (req, res) => { signin.handleSignin(req, res, db, bcrypt)});
app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt)});


const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`app is running on port ${PORT}`);
});
