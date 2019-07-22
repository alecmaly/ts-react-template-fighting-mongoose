"use strict";
const jwt = require('jsonwebtoken');
module.exports = {
    requiresLogin: (req, res, next) => {
        if (req.user)
            return next();
        res.sendStatus(401);
    },
    requiresAdmin: (req, res, next) => {
        if (req.user && req.user.type === 'admin')
            return next();
        res.sendStatus(401);
    },
    isLoggedIn: (req, res, next) => {
        // if (req.user()) {
        if (req.cookies['jwt'] !== undefined) {
            var decoded = jwt.verify(req.cookies['jwt'], publicKey, { algorithm: 'RS256' });
            // validate expiration on jwt
            // fail if expired
            next();
        }
        else {
            res.status(404).send('Not logged in');
        }
    }
};
//# sourceMappingURL=authorization.js.map