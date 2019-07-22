var AzureOAuth2Strategy = require('passport-azure-oauth2');

module.exports = (app, passport, jwt, authFunctions) => {
  passport.use('azure', new AzureOAuth2Strategy({
    clientID: process.env.AZUREAD_clientID,
    clientSecret: process.env.AZUREAD_clientSecret,
    callbackURL: `${process.env.ROOT_DOMAIN}/auth/azure/callback`,
    prompt: process.env.AZUREAD_prompt,
    state: process.env.AZUREAD_state,
    tenant: 'pushharder.onmicrosoft.com'
  },
  async function (accessToken, refreshtoken, params, profile, done) {
    console.log('GOT HERE HAHA')
    let decoded_token = jwt.decode(params.id_token, "", true);

    // user.token = decoded_token
    console.log("\n\nprofile:\n")
    console.log(profile)
    console.log("\n\nparams:\n")
    console.log(params)
    console.log("\n\ndecoded token:\n")
    console.log(decoded_token)


    let searchUser = {}
    searchUser.provider_id = decoded_token.oid
    searchUser.provider = 'azure'
    const user = await authFunctions.findOrCreateExternalUser(searchUser)

    done(null, user);
  }));


  // AzureAD routes
  app.get('/auth/azure', authFunctions.passportFunctions.setRedirect, passport.authenticate('azure'));

  app.get('/auth/azure/callback',
    passport.authenticate('azure', { session: false, failureRedirect: '/login' }),
    authFunctions.passportFunctions.authSuccessCallback
  )
  // app.get('/auth/AzureAD/callback', passport.authenticate('azuread', { successRedirect: '/', failureRedirect: '/login' }))
}
