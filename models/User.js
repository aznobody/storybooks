const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
    googleID: {
        type: String,
        required: true
    },
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    email: {
        type: String,
        required: true
    },
    image: {
        type: String
    }
});
const User = mongoose.model('User', UserSchema);
module.exports.User = User;