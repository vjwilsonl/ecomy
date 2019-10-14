const auth = require('../middlewares/auth');
const bcrypt = require('bcrypt');
const { User, validateNew, validateUpdate } = require('../models/User');
const express = require('express');
const router = express.Router();

// current user
router.get('/current', auth, async (req, res) => {
  const user = await User.findById(req.user._id).select('-password');
  res.send(user);
});

// change password
router.post('/changePassword', auth, async (req, res) => {
  const { newPassword, password } = req.body;
  //To include username also
  User.findById(req.user._id, function(err, user) {
    if (err) {
      res.status(500).send({ error: 'Internal error please try again' });
    } else if (!user) {
      res.status(401).send({
        error: 'Invalid user'
      });
    } else {
      user.isCorrectPassword(password, async function(err, same) {
        if (err) {
          res.status(500).send({
            error: 'Internal error please try again'
          });
        } else if (!same) {
          res.status(401).send({
            error: 'Incorrect password'
          });
        } else {
          user.password = await bcrypt.hash(newPassword, 10);
          await user.save();
          res.send(user);
        }
      });
    }
  });
});

// update user details
router.post('/update', auth, async (req, res) => {
  // validate the request body first
  const { error } = validateUpdate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let option = { new: true, useFindAndModify: false };
  let update = {
    name: req.body.name,
    birthday: req.body.birthday,
    education: req.body.education,
    about: req.body.about
  };

  let updatedUser = await User.findByIdAndUpdate(req.user._id, update, option);
  res.send(updatedUser);
});

// check if authenticated
router.get('/checkToken', auth, function(req, res) {
  res.sendStatus(200);
});

// login
router.post('/authenticate', async (req, res) => {
  const { email, password } = req.body;
  //To include username also
  User.findOne({ email }, function(err, user) {
    if (err) {
      res.status(500).send({ error: 'Internal error please try again' });
    } else if (!user) {
      res.status(401).send({
        error: 'Incorrect email or password'
      });
    } else {
      user.isCorrectPassword(password, function(err, same) {
        if (err) {
          res.status(500).send({
            error: 'Internal error please try again'
          });
        } else if (!same) {
          res.status(401).send({
            error: 'Incorrect email or password'
          });
        } else {
          // Issue token
          const token = user.generateAuthToken();
          res.cookie('token', token, { httpOnly: true }).sendStatus(200);
          // res.header('x-auth-token', token).send('Logged in');
        }
      });
    }
  });
});

// user registration
router.post('/', async (req, res, next) => {
  // validate the request body first
  const { error } = validateNew(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  //find an existing user
  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send('User already registered.');

  user = new User({
    name: req.body.name,
    password: req.body.password,
    email: req.body.email
  });
  user.password = await bcrypt.hash(user.password, 10);
  await user.save();

  const token = user.generateAuthToken();
  res.cookie('token', token, { httpOnly: true }).sendStatus(200);
  // res.header('x-auth-token', token).send({
  //   _id: user._id,
  //   name: user.name,
  //   email: user.email
  // });
});

module.exports = router;
