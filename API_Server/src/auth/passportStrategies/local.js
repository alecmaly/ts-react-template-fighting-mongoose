
const LocalStrategy = require('passport-local').Strategy;

module.export = (app, passport) => {
  passport.use(new LocalStrategy({
      usernameField: 'alec',
      passwordField: 'passwd',
      passReqToCallback: true,
      session: false
    },
    function(username, password, done) {

      let user_obj = {}
      let searchUser = {}
      searchUser.provider_id = profile.id
      searchUser.provider = 'local'




      User.findOne({ username: username }, function (err, user) {
        if (err) { return done(err); }
        if (!user) { return done(null, false); }
        if (!user.verifyPassword(password)) { return done(null, false); }
        return done(null, user);
      });
    }
  ));


  app.post('/login', 
    passport.authenticate('local', { failureRedirect: '/login' }),
    function(req, res) {
      res.redirect('/');
    }
  );
}
