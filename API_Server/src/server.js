const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const passport = require('passport')
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const fs = require('fs');

// jwt secrets
const publicKey = fs.readFileSync('./public.key');
const privateKey = fs.readFileSync('./private.key');



// import middleware
const { isLoggedIn } = require('./auth/middlewares/authorization')(publicKey)


// const ideas = require('./controllers/ideas')

require('dotenv').config()


const app = express()
const port = process.env.PORT || 3000

app.set('port', port)
app.use(cors())
// app.set('view engine', 'html')

// parsers
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(cookieParser())


// set headers
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Origin', 'http://fightingmongooses.com'); // req.get('host')); || http://fightingmongooses.com
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
  if ('OPTIONS' == req.method) {
      res.send(200);
  } else {
      next();
    }
});



// add & configure session middleware
const session = require('express-session')
const crypto = require('crypto');

app.use(session({
  genid: (req) => {
    console.log('Inside the session middleware')
    console.log(req.sessionID)
    return crypto.randomBytes(16).toString("hex"); // session ID
      //crypto.randomBytes(3*4).toString('base64') session IDs
  },
  secret: 'keyboard cat',
  resave: false, // check setting
  saveUninitialized: true, // check setting
  proxy: true,
  // cookie: {
  //   domain: '.localhost'
  // }
}))




// passport config
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
  done(null, user)
})
passport.deserializeUser((user, done) => {
  done(null, user)
})
// end passport config








// custom login
const UserFunctions = require('./auth/controllers/user-custom')
app.post('/signup', UserFunctions.signup)




const passportFunctions = require('./auth/middlewares/misc')(jwt, privateKey)
const { findOrCreateExternalUser } = require ('./auth/controllers/users')
const authFunctions = {}
authFunctions.passportFunctions = passportFunctions
authFunctions.findOrCreateExternalUser = findOrCreateExternalUser



// require('./passport strategies/local')(app, passport)
// ^ needs work

require('./auth/passportStrategies/google')(app, passport, authFunctions)
require('./auth/passportStrategies/azure')(app, passport, jwt, authFunctions)
require('./auth/passportStrategies/twitter')(app, passport, authFunctions)
require('./auth/passportStrategies/facebook')(app, passport, authFunctions)
require('./auth/passportStrategies/github')(app, passport, authFunctions)
require('./auth/passportStrategies/linkedin')(app, passport, authFunctions)







app.get('/login', (req, res) => {
  res.redirect('/')
})

app.get('/logout', function(req, res){
  req.logout();
  // reset cookie and redirect
  res.cookie('jwt', '', { httpOnly: true, expires: new Date(0) })
  req.session.destroy(function (err) {
    res.redirect(req.get('Referrer') || '/');
  })
});




app.get('/me', isLoggedIn, function(req, res, next) {
  // req.user - will exist
  // load user orders and render them
  var decoded = jwt.verify(req.cookies['jwt'], publicKey, { algorithm: 'RS256'});

  console.log('logged in... send decoded back');
  console.log(decoded);
  res.send('logged in as ' + JSON.stringify(decoded, 2, null));
});


// // user model
// const { User } = require('../db/models/schema')
// // app.use('/ideas', ideas)

// app.get('/users', isLoggedIn, async (req, res) => {
//   const users = await User.query()
//   res.json(users)
// })


// import email controller
require('./api/controllers/email')(app)


// route homepage
app.get('/', (req, res) => {
  console.log('Inside the homepage callback function')
  console.log(req.sessionID)

  const userInfo = 
    req.cookies['jwt'] !== undefined ? 
      JSON.stringify(
        jwt.verify(req.cookies['jwt'], publicKey, { algorithm: 'RS256'}),
        null, 2)
      :
      'You are not logged in'

  res.send(`
  ${userInfo}<br><br>

  <a href='/auth/twitter'>Login with Twitter</a><br><br>
  <a href='/auth/Facebook'>Login with Facebook</a><br><br>
  <a href='/auth/Github'>Login with Github</a><br><br>
  <a href='/auth/LinkedIn'>Login with LinkedIn</a><br><br>
  <a href='/auth/azure'>Login with Microsoft Azure</a><br><br>
  <a href='/auth/google'>Login with Google</a><br><br>

  <br><br>
  <a href='/me'>Me</a><br><br>
  <a href='/logout'>Logout</a>
  `)

  // res.send(`You hit home page!\n`)
})



app.get('*', function(req, res){
  console.log('host: ' + req.get('host'))
  res.status('404').send('Page not found, bruh')
});

app.listen(app.get('port'), () => {
  console.log('env root: ' + process.env.ROOT_DOMAIN)
  console.log(`Server started on port: ${port}`)
})


