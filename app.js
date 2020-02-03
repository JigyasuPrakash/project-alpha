const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const path = require('path');
var logger = require('morgan');

// Bring in the database object
const config = require('./config/database');

// Mongodb Config
mongoose.set('useCreateIndex', true);

// Connect with the database
mongoose.connect(config.database, {
    useUnifiedTopology: true,
    useNewUrlParser: true
})
    .then(() => {
        console.log('Mongoose connected to User Accounts');
    }).catch(err => {
        console.log(err);
    });

// Initialize the app
const app = express();

app.use(logger('dev'));
// BodyParser Middleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
// Defining the PORT
const PORT = process.env.PORT || 3000;

// Defining the Middlewares
app.use(cors());

// Set the static folder for scripts images and css
app.use(express.static(path.join(__dirname, 'public')));
// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

// Create a custom middleware function
const checkUserType = function (req, res, next) {
    const userType = req.originalUrl.split('/')[2];
    // Bring in the passport authentication starategy
    require('./config/passport')(userType, passport);
    next();
};

app.use(checkUserType);

// External Routing for general uses
const index = require('./routes/index');
app.use('/', index);
const dashboard = require('./routes/dashboard');
app.use('/dashboard', dashboard);

// Bring in the API internal routes
const usersApi = require('./routes/usersAuth');
app.use('/api/users', usersApi);
const adminApi = require('./routes/adminAuth');
app.use('/api/admin', adminApi);

//Database access endpoints
const dataFetch = require('./routes/dataFetch');
app.use('/api/fetch/data', dataFetch);

//404 page redirection
app.use(function (req, res) {
    res.status(404);
    res.sendFile(path.join(__dirname, '/src/404.html'))
})


app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});