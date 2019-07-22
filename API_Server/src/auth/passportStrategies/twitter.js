const TwitterStrategy = require('passport-twitter').Strategy;

module.exports = (app, passport, authFunctions) => {
  passport.use('twitter', new TwitterStrategy({
      consumerKey: process.env.TWITTER_APP_ID,
      consumerSecret: process.env.TWITTER_APP_SECRET,
      callbackURL: `${process.env.ROOT_DOMAIN}/auth/twitter/callback`
    },
    async function(token, tokenSecret, profile, done) {

      // User.query().findById(1).then(...User, function(err, user) {
      //   if (err) { console.log(err); return done(err); }
      //     console.log(user);
      //     done(null, user);
      // })
      let searchUser = {}
      searchUser.provider_id = profile.id
      searchUser.provider = profile.provider

      const user = await authFunctions.findOrCreateExternalUser(searchUser)

      done(null, user)
    }
  ))


  // Twitter routes
  app.get('/auth/twitter', authFunctions.passportFunctions.setRedirect, passport.authenticate('twitter'));

  app.get('/auth/twitter/callback',
    passport.authenticate('twitter', { session: false, failureRedirect: '/login' }),
    authFunctions.passportFunctions.authSuccessCallback
  )

}
