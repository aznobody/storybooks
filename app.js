const mongoose = require('mongoose');
const express = require('express');
const keys = require('./config/keys');
const authRouter = require('./routers/auth');
const passport = require('passport');
let app = express();

//Passport config
require('./config/passport')(passport);

//mongoose connectivity
mongoose.connect(keys.mongoURI, { useNewUrlParser: true })
    .then(() => console.log('Connected to MongoDB...'))
    .catch((err) => console.error('Could not connect to MongoDB', err))

app.use('/auth', authRouter);
//start server
const port = process.env.PORT || 81
app.listen(port, () => console.log('Server started on port' + port + '...'));