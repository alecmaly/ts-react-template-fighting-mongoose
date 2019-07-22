"use strict";
var GitHubStrategy = require('passport-github').Strategy;
const { findOrCreateExternalUser } = require('../controllers/users');
function redirectMiddleware(req, res, next) {
    req.session.redirectTo = req.get('Referrer');
    next();
}
module.exports = (app, passport, passportFunctions) => {
    passport.use(new GitHubStrategy({
        clientID: process.env.GITHUB_APP_ID,
        clientSecret: process.env.GITHUB_APP_SECRET,
        callbackURL: "http://localhost:3000/auth/github/callback"
    }, async function (accessToken, refreshToken, profile, done) {
        // User.findOrCreate({ githubId: profile.id }, function (err, user) {
        //   return cb(err, user);
        // })
        let searchUser = {};
        searchUser.provider_id = profile.id;
        searchUser.provider = profile.provider;
        const user = await findOrCreateExternalUser(searchUser);
        done(null, user);
    }));
    // routes
    app.get('/auth/github', passportFunctions.setRedirect, passport.authenticate('github'));
    app.get('/auth/github/callback', passport.authenticate('github', { session: false, failureRedirect: '/login' }), 
    // success
    passportFunctions.authSuccessCallback);
    // app.get('/auth/github/callback',
    //   passport.authenticate('github', { successRedirect: '/',
    //                                     failureRedirect: '/login' }
    //   )
    // );
};
//# sourceMappingURL=github.js.map