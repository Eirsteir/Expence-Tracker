const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');
const bcrypt = require('bcrypt-nodejs');
const helmet = require('helmet')

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const signout = require('./controllers/signout');
const profile = require('./controllers/profile');
const addExpence = require('./controllers/addExpence');
const addCustomTag = require('./controllers/addCustomTag');
const auth = require('./controllers/authorization');

// Setup environmental variables in development
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(morgan('combined'));
app.use(helmet())

// Connect to mongodb
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(console.log);

const db = mongoose.connection;

const path = require('path')
// Serve static files from the React frontend app
app.use(express.static(path.join(__dirname, 'client/build')))
// Anything that doesn't match the above, send back index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'))
})

// requireAuth middleware
app.get('/', (req,res) => { res.status(200).json('Server is up and running')});
app.post('/signin', (req, res) => { signin.signinAuthentification(req, res, db, bcrypt)});
app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt)});
app.post('/signout', (req, res) => { signout.handleSignout(req, res) });
app.get('/profile/:id', auth.requireAuth, (req, res) => { profile.handleProfileGet(req, res) })
app.post('/add-expence', auth.requireAuth, (req, res) => { addExpence.handleAddExpence(req, res)});
app.post('/add-custom-tag', auth.requireAuth, (req, res) => { addCustomTag.handleAddCustomTag(req, res)});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
