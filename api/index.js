const express = require('express');
require('dotenv').config();

const PORT = process.env.PORT || 6000;
const routes = require('./routes/');

const app = express().use(routes);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});
