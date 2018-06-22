const express = require('express');
const passport = require('passport');

require('dotenv').config();

const PORT = process.env.PORT || 6000;
const routes = require('./routes/');
const passportConfig = require('./config/passport');

passportConfig();

const app = express();

app
  .use(passport.initialize())
  .use(passport.session())
  .use(routes);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});
