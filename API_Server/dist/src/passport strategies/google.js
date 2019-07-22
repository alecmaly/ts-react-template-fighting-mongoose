"use strict";
// Google Strategy
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { findOrCreateExternalUser } = require('../controllers/users');
module.exports = (app, passport, passportFunctions) => {
    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:3000/auth/google/callback"
    }, async function (accessToken, refreshToken, profile, done) {
        let searchUser = {};
        searchUser.provider_id = profile.id;
        searchUser.provider = profile.provider;
        const user = await findOrCreateExternalUser(searchUser);
        done(null, user);
    }));
    app.get('/auth/google', passportFunctions.setRedirect, passport.authenticate('google', { scope: ['profile'] }));
    app.get('/auth/google/callback', passport.authenticate('google', { session: false, failureRedirect: '/login' }), 
    // success
    passportFunctions.authSuccessCallback);
    // End Gogole Strategy
};
//# sourceMappingURL=google.js.map