const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[2];
    console.log(token, req.header('Authorization')?.split(' '));
    if (!token) {
        return res.status(401).send({ message: "Access denied" });
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).send({ message: "Invalid token" });
        }
        req.user = user;
        next();
    });
};

module.exports = { verifyToken };