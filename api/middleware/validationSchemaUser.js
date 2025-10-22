const { body } = require("express-validator")

const validationSchemaUser = () => {
    return [
        body('name').notEmpty().withMessage('Name is required'),
        body('email').notEmpty().withMessage('Email is required').isEmail().withMessage('Invalid email format'),
        body('age').notEmpty().withMessage('Age is required').isInt({ min: 0 }).withMessage('Age must be a positive integer'),
        body('password').notEmpty().withMessage('Password is required').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
    ]
}

module.exports = validationSchemaUser;
