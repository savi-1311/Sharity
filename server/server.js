/* ENTRYPOINT */

// Loading all the relevant dependencies
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const passport = require('passport');
require('dotenv').config();

// Fetching all the configurations
const { configDB } = require('./configs/db.config');
const { configAuth } = require('./configs/auth.config');

configDB();
configAuth(passport);

const app = express();

// Using required middlewares
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(passport.initialize());

app.use('/api', require('./routes/user.route'));
app.use('/api', require('./routes/cloth.route'));

// Running the server at port PORT or default 8000
const port = process.env.PORT || 8000;
const server = app.listen(port, () => {
    console.log(`Backend Server is Live!\nListening on port: ${port}`);
});


module.exports = app;
