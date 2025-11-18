const jwt = require('jsonwebtoken');


const SECRET = process.env.JWT_SECRET || 'dev_secret';


module.exports.signToken = (payload) => {
return jwt.sign(payload, SECRET, { expiresIn: '7d' });
};


module.exports.verifyToken = (token) => jwt.verify(token, SECRET);