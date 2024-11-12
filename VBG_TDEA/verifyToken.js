const jwt = require('jsonwebtoken');
const jwksRsa = require('jwks-rsa');
require('dotenv').config();

const jwtVerifyMiddleware = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    const client = jwksRsa({
        jwksUri: process.env.JWKS_URI
    });

    const getKey = (header, callback) => {
        client.getSigningKey(header.kid, (err, key) => {
            if (err) {
                return callback(err);
            }
            const signingKey = key.publicKey || key.rsaPublicKey;
            callback(null, signingKey);
        });
    };

    jwt.verify(token, getKey, {}, (err, decoded) => {
        if (err) {
            return res.status(401).json({ error: 'Invalid token' });
        }
        req.user = decoded;
        next();
    });
};

module.exports = jwtVerifyMiddleware;