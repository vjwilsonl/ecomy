const config = require('config');
const mongoose = require('mongoose');
const usersRoute = require('./routes/userRoutes');
const express = require('express');
const app = express();
// const cors = require('cors');
const cookieParser = require('cookie-parser');
// app.use(cors());
app.use(cookieParser());
require('./routes/authRoutes')(app);

//use config module to get the privatekey, if no private key set, end the application
if (!config.get('myprivatekey')) {
  console.error('FATAL ERROR: myprivatekey is not defined.');
  process.exit(1);
}
//use config module to get the mongoURI, if no private key set, end the application
if (!config.get('mongoURI')) {
  console.error('FATAL ERROR: mongoURI is not defined.');
  process.exit(1);
}
//
mongoose.Promise = global.Promise;
//connect to mongodb
mongoose.connect(config.get('mongoURI'));

app.use(express.json());
//use users route for api/users
app.use('/api/users', usersRoute);

if (process.env.NODE_ENV === 'production') {
  // Express will server up production assets
  // Like our main.js file, or main.css file
  app.use(express.static('client/build')); //specific file
  // Express will sere up the index.html file
  // if it does not recognize the route
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
