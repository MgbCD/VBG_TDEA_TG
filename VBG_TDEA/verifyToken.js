const jwt = require('jsonwebtoken');
const jwksRsa = require('jwks-rsa');

const jwtVerifyMiddleware = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    const client = jwksRsa({
        jwksUri: 'https://login.microsoftonline.com/2618ef2a-7956-4b9a-b5c7-95fe306a3e7b/discovery/v2.0/keys'
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