const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');
const bcrypt = require('bcrypt-nodejs');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const addExpence = require('./controllers/addExpence');

// Setup environmental variables in development
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(morgan('combined'));

// Connect to mongodb
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(console.log);

const db = mongoose.connection;

app.get('/', (req,res) => { res.status(200).json('Server is up and running')});
app.post('/signin', (req, res) => { signin.handleSignin(req, res, bcrypt)});
app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt)});
app.post('/add-expence', (req, res) => { addExpence.handleAddExpence(req, res, db)});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
