const { body } = require('express-validator');
const { getAllUsers, deleteUser, updateUser, createUser, getUserById, login } = require('../../controllers/usersCrud');
const { verifyToken } = require('../../middleware/verifyToken');
const { allowedTo } = require('../../utils/allowedTo');

const router = require('express').Router();

const multer = require('multer');
const upload = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, 'uploads/');
        },
        filename: function (req, file, cb) {
            cb(null, Date.now() + path.extname(file.originalname));
        }
    }),
    fileFilter: function (req, file, cb) {
        const allowedTypes = /jpeg|jpg|png/;
        const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = allowedTypes.test(file.mimetype);
        if (extname && mimetype) {
            return cb(null, true);
        }
        cb(new Error('File type not allowed'), false);
    }
});

router.route('/').get(verifyToken, getAllUsers)
    .post([
        body('name').notEmpty().withMessage('Name is required'),
        body('email').notEmpty().withMessage('Email is required').isEmail().withMessage('Invalid email format'),
        body('age').notEmpty().withMessage('Age is required').isInt({ min: 0 }).withMessage('Age must be a positive integer'),
        body('password').notEmpty().withMessage('Password is required').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
    ], createUser);


router.post('/login', [
    body('email').notEmpty().withMessage('Email is required').isEmail().withMessage('Invalid email format'),
    body('password').notEmpty().withMessage('Password is required')
], login);


router.route('/:id').get(getUserById)
    .put(updateUser)
    .delete(verifyToken, allowedTo('admin'), deleteUser);

router.post('/upload', upload.single('avatar'), (req, res) => {
    res.send({ file: req.file });
});

module.exports = router;