
const { validationResult } = require('express-validator');
const Course = require('../modals/model');
const asyncWrapper = require('../middleware/asyncWrapper');

const getAllCourses = asyncWrapper(
    async (req, res, next) => {
        try {
            const query = req.query || {};
            const limit = query.limit ? parseInt(query.limit) : 0;
            const page = query.page ? parseInt(query.page) : 1;
            const skip = limit > 0 ? (page - 1) * limit : 0;
            const courses = await Course.find({}, {
                __v: 0,
            }).limit(limit).skip(skip);
            res.json({
                status: "success",
                data: courses
            });
        } catch (error) {
            res.status(500).send({ message: "Error fetching courses" });
        }
    }
);

const getCourseById = async (req, res) => {
    const courseId = req.params.id;
    try {
        const course = await Course.findById(courseId);
        if (course) {
            res.json({
                status: "success",
                data: course
            });
        } else {
            res.status(404).send({ message: "Course not found" });
        }
    } catch (error) {
        res.status(500).send({ message: "Error fetching course" });
    }
};

const addCourse = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        console.log(errors.array());
        return res.status(400).json({ errors: errors.array() });
    }

    // if already exists
    const existingCourse = await Course.findOne({ name: req.body.name });
    if (existingCourse) {
        return res.status(400).send({ message: "Course already exists!" });
    }

    try {
        const newCourse = new Course(req.body);
        await newCourse.save();
        res.status(201).send({ message: "Course added!" });
        console.log(newCourse);
    } catch (error) {
        res.status(500).send({ message: "Error adding course" });

    }
};

const updateCourse = async (req, res) => {
    const courseId = req.params.id;
    const course = await Course.findById(courseId);
    if (!course) {
        return res.status(404).send({ message: "Course not found" });
    }

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    if (req.body.name) course.name = req.body.name;
    if (req.body.duration) course.duration = req.body.duration;
    await course.save();
    res.send({ message: "Course updated!" });
};

const deleteCourse = async (req, res) => {
    const courseId = req.params.id;
    try {
        const course = await Course.findByIdAndDelete(courseId);
        if (course) {
            res.send({ message: "Course deleted!" });
        } else {
            res.status(404).send({ message: "Course not found" });
        }
    } catch (error) {
        res.status(500).send({ message: "Error deleting course" });
    }
};

module.exports = {
    getAllCourses,
    getCourseById,
    addCourse,
    updateCourse,
    deleteCourse
}; 