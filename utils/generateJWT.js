const jwt = require('jsonwebtoken');

const generateJWTFun = async (payload) => {
    const token = await jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
    return token;
};

module.exports = { generateJWTFun }