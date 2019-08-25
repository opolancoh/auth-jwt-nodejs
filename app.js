const express = require('express');
const mongoose = require('mongoose');

const homeRouter = require('./routes/home.route');
const apiRouter = require('./routes/api.route');
const authRouter = require('./routes/auth.route');

const app = express();

app.use(express.json());

// setup routes
app.use('/', homeRouter);
app.use('/api', apiRouter);
app.use('/auth', authRouter);

// mongodb
const dbUri = process.env['AUTHAPP_DB_URI'];
mongoose
  .connect(dbUri, { useNewUrlParser: true })
  .then(() => console.log(`\nSuccessfully connected to ${dbUri}`))
  .catch(err => {
    console.log(`\nError connecting to ${dbUri}\n`);
    console.error(err);
  });

module.exports = app;
