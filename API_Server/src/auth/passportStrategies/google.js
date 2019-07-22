// Google Strategy
const GoogleStrategy = require('passport-google-oauth20').Strategy;


module.exports = (app, passport, authFunctions) => {
  passport.use(new GoogleStrategy({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `${process.env.ROOT_DOMAIN}/auth/google/callback`
    },
    async function(accessToken, refreshToken, profile, done) {
      let searchUser = {}
      searchUser.provider_id = profile.id
      searchUser.provider = profile.provider

      const user = await authFunctions.findOrCreateExternalUser(searchUser)

      done(null, user)
    }
  ));




  app.get('/auth/google', authFunctions.passportFunctions.setRedirect,
    passport.authenticate('google', { scope: ['profile'] }));

  app.get('/auth/google/callback',
    passport.authenticate('google', { session: false, failureRedirect: '/login' }),
    // success
    authFunctions.passportFunctions.authSuccessCallback
  );

// End Gogole Strategy
}
