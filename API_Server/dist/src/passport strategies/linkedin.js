"use strict";
const LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;
const { findOrCreateExternalUser } = require('../controllers/users');
module.exports = (app, passport, passportFunctions) => {
    passport.use(new LinkedInStrategy({
        clientID: process.env.LINKEDIN_CLIENT_ID,
        clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
        callbackURL: "http://localhost:3000/auth/linkedin/callback",
        scope: ['r_emailaddress', 'r_liteprofile']
    }, async function (token, tokenSecret, profile, done) {
        // User.findOrCreate({ linkedinId: profile.id }, function (err, user) {
        //   return done(err, user);
        // });
        // console.log(profile)
        let searchUser = {};
        searchUser.provider_id = profile.id;
        searchUser.provider = profile.provider;
        const user = await findOrCreateExternalUser(searchUser);
        console.log('user');
        console.log(user);
        done(null, user);
    }));
    app.get('/auth/linkedin', passportFunctions.setRedirect, passport.authenticate('linkedin'));
    app.get('/auth/linkedin/callback', passport.authenticate('linkedin', { session: false, failureRedirect: '/login' }), passportFunctions.authSuccessCallback);
};
//# sourceMappingURL=linkedin.js.map