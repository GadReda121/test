const { body } = require("express-validator")

const validationSchema = () => {
    return [
        body('name').notEmpty().withMessage('Name is required'),
        body('duration').notEmpty().withMessage
            ('Duration is required')
    ]
}

module.exports = validationSchema;
