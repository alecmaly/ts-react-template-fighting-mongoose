"use strict";
const FacebookStrategy = require('passport-facebook').Strategy;
module.exports = (app, passport) => {
    passport.use(new FacebookStrategy({
        clientID: process.env.FACEBOOK_APP_ID,
        clientSecret: process.env.FACEBOOK_APP_SECRET,
        callbackURL: "http://localhost:3000/auth/facebook/callback"
    }, function (accessToken, refreshToken, profile, done) {
        // User.findOrCreate(..., function(err, user) {
        //   if (err) { return done(err); }
        //   done(null, user);
        // });
        let user = {};
        user.provider = profile.provider;
        user.id = profile.id;
        user.username = profile.username;
        user.displayname = profile.displayName;
        console.log(profile);
        done(null, user);
    }));
    // Redirect the user to Facebook for authentication.  When complete,
    // Facebook will redirect the user back to the application at
    //     /auth/facebook/callback
    app.get('/auth/facebook', passport.authenticate('facebook'));
    // Facebook will redirect the user to this URL after approval.  Finish the
    // authentication process by attempting to obtain an access token.  If
    // access was granted, the user will be logged in.  Otherwise,
    // authentication has failed.
    app.get('/auth/facebook/callback', passport.authenticate('facebook', { successRedirect: '/',
        failureRedirect: '/login' }));
};
//# sourceMappingURL=facebook.js.map