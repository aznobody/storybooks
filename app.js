const mongoose = require('mongoose');
const express = require('express');
const keys = require('./config/keys');
const authRouter = require('./routers/auth');
const passport = require('passport');
const session = require('express-session');
const cookieParser = require('cookie-parser');
let app = express();

//Load User
require('./models/User');

//setting session
app.use(cookieParser());
app.use(session({
    secret: 'mySecret',
    resave: false,
    saveUninitialized: false
}));

//Passport config
require('./config/passport')(passport);

//passport middleware
app.use(passport.initialize());
app.use(passport.session());

//global message and error values
app.use(function(req, res, next) {
    // res.locals.success_msg = req.flash('success_msg');
    // res.locals.error_msg = req.flash('error_msg');
    // res.locals.info_msg = req.flash('info_msg');
    // res.locals.error = req.flash('error');
    res.locals.user = req.user || null; //the logged in user by passport
    next();
});


//mongoose connectivity
mongoose.connect(keys.mongoURI, { useNewUrlParser: true })
    .then(() => console.log('Connected to MongoDB...'))
    .catch((err) => console.error('Could not connect to MongoDB', err))

app.use('/auth', authRouter);
//start server



const port = process.env.PORT || 81
app.listen(port, () => console.log('Server started on port' + port + '...'));