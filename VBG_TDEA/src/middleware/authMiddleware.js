const jwt = require('jsonwebtoken');
const jwksClient = require('jwks-rsa');

const client = jwksClient({
    jwksUri: 'https://login.microsoftonline.com/common/discovery/v2.0/keys'
});

const getKey = (header, callback) => {
    client.getSigningKey(header.kid, (err, key) => {
        const signingKey = key.getPublicKey();
        callback(null, signingKey);
    });
};

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.sendStatus(401);
    }

    jwt.verify(token, getKey, { algorithms: ['RS256'] }, (err, user) => {
        if (err) {
            console.log('Error en la verificación del token:', err);
            console.log('Header del token:', jwt.decode(token, { complete: true }).header);
            return res.sendStatus(403);
        }

        //console.log('Token decodificado:', user);
        req.user = user;
        next();
    });
};

module.exports = authenticateToken;
