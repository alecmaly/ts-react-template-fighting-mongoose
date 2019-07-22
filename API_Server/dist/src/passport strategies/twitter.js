"use strict";
const TwitterStrategy = require('passport-twitter').Strategy;
const { findOrCreateExternalUser } = require('../controllers/users');
module.exports = (app, passport, passportFunctions) => {
    passport.use('twitter', new TwitterStrategy({
        consumerKey: process.env.TWITTER_APP_ID,
        consumerSecret: process.env.TWITTER_APP_SECRET,
        callbackURL: "http://localhost:3000/auth/twitter/callback"
    }, async function (token, tokenSecret, profile, done) {
        // User.query().findById(1).then(...User, function(err, user) {
        //   if (err) { console.log(err); return done(err); }
        //     console.log(user);
        //     done(null, user);
        // })
        let searchUser = {};
        searchUser.provider_id = profile.id;
        searchUser.provider = profile.provider;
        const user = await findOrCreateExternalUser(searchUser);
        done(null, user);
    }));
    // Twitter routes
    app.get('/auth/twitter', passportFunctions.setRedirect, passport.authenticate('twitter'));
    app.get('/auth/twitter/callback', passport.authenticate('twitter', { session: false, failureRedirect: '/login' }), passportFunctions.authSuccessCallback);
};
//# sourceMappingURL=twitter.js.map