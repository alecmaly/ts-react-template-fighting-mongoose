module.exports = (jwt, privateKey) => {
  async function authSuccessCallback (req, res) { // check for cb? needed for passport-azure
    // get user from db (based on provider + GITHUB ID), return ID

    // req.user
    var token = await jwt.sign({ uid: req.user.id }, privateKey, { algorithm: 'RS256'});
    res.cookie('jwt', token, { httpOnly: true })


    console.log('Referrer is: ' + req.session.redirectTo);
    // res.send(JSON.stringify(Objecet.keys(req), null, 2))
    // res.send(JSON.stringify(Objecet.keys(req), null, 2));

    // VALIDATE REDIRECT URL FOR SECURITY
    // res.redirect(req.get('Referrer') || '/');
    res.redirect('http://fightingmongooses.com');
    // res.json({ jwt: token });  
  }

  function setRedirect (req, res, next) {
    req.session.redirectTo = req.get('Referrer')
    //req.session.redirectTo = 'http://fightingmongooses.com/'

    next()
  }

  return { authSuccessCallback: authSuccessCallback, setRedirect: setRedirect }
}


// var a = document.createElement('a');
// a.innerText = 'click me'
// a.href = 'http://localhost:3000/auth/github'

// document.body.appendChild(a)
