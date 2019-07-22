const LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;


module.exports = (app, passport, authFunctions) => {
  passport.use(new LinkedInStrategy({
    clientID: process.env.LINKEDIN_CLIENT_ID,
    clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
    callbackURL: `${process.env.ROOT_DOMAIN}/auth/linkedin/callback`,
    scope: ['r_emailaddress', 'r_liteprofile']
  },
  async function(token, tokenSecret, profile, done) {
    // User.findOrCreate({ linkedinId: profile.id }, function (err, user) {
    //   return done(err, user);
    // });

    // console.log(profile)
    let searchUser = {}
    searchUser.provider_id = profile.id
    searchUser.provider = profile.provider
    const user = await authFunctions.findOrCreateExternalUser(searchUser)

    console.log('user')
    console.log(user)
    done(null, user);
  }
  ));



  app.get('/auth/linkedin', authFunctions.passportFunctions.setRedirect,
    passport.authenticate('linkedin'));


  app.get('/auth/linkedin/callback',
    passport.authenticate('linkedin', { session: false, failureRedirect: '/login' }),
    authFunctions.passportFunctions.authSuccessCallback
  );

}
