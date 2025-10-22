const jwt = require('jsonwebtoken');

const allowedTo = (...roles) => {
    return (req, res, next) => {
        try { 
            const token = req.headers.authorization.split(" ")[2];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const currentUser = decoded;
            console.log(currentUser);
            if (!roles.includes(currentUser.role)) {
                return res.status(403).send({ message: "You are not allowed to perform this action" });
            }
            next();
        } catch (error) {
            res.status(500).send({ message: "Error verifying token" });
        }
    };
};

module.exports = { allowedTo };