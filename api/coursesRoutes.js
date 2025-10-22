const { getAllCourses, addCourse, getCourseById, updateCourse, deleteCourse } = require('./controllers/coursesCrud');
const validationSchema = require('./middleware/validationSchema');

const router = require('express').Router();

router.route('/').get(getAllCourses)


router.route('/add').post(addCourse)


router.route('/:id')
    .get(getCourseById)
    .patch(updateCourse)
    .delete(deleteCourse)

module.exports = router;