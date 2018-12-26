const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');
var User = mongoose.model('User');

module.exports = function(passport) {
    passport.use(
        new GoogleStrategy({
            clientID: keys.client_id,
            clientSecret: keys.client_secret,
            callbackURL: '/auth/google/callback',
            proxy: true
        }, (accessToken, refreshToken, profile, done) => {
            var img = profile.photos[0].value;
            var imgLink = img.substring(0, img.indexOf('?'));

            User.findOne({ googleID: profile.id })
                .then(user => {
                    if (user) { //RETurn user
                        console.log('\n\nAlready registered user..\n' + user);
                        done(null, user);
                    } else {
                        const newUser = new User({
                            googleID: profile.id,
                            email: profile.emails[0].value,
                            firstName: profile.name.givenName,
                            lastName: profile.name.familyName,
                            image: imgLink
                        });
                        newUser.save()
                            .then(user => {
                                console.log('\n\nsaving new user..\n' + user);
                                done(null, user);
                            })

                    }
                })

        })
    );
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        User.findById(id).then(user => { done(null, user) });
    });
}