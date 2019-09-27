const jwt = require('jsonwebtoken')

module.exports = (publicKey) => {
	function requiresLogin(req, res, next) {
		if (req.user) return next()

		res.sendStatus(401)
	}

	function requiresAdmin(req, res, next) {
		if (req.user && req.user.type === 'admin') return next()

		res.sendStatus(401)
  }

  function isLoggedIn(req, res, next) {
    // if (req.user()) {
    if (req.cookies['jwt'] !== undefined) {

      var decoded = jwt.verify(req.cookies['jwt'], publicKey, { algorithm: 'RS256'});
      // validate expiration on jwt
      // fail if expired

      console.log('is logged in');
      next();
    } else {
      console.log('is NOT logged is');
      res.status(401).json({'msg': 'Not logged in'});
    }
  }

  return { requiresLogin:requiresLogin, requiresAdmin:requiresAdmin, isLoggedIn:isLoggedIn }
}
