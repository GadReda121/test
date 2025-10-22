const User = require('../modals/users');
const bcrypt = require('bcrypt');
const { generateJWTFun } = require('../utils/generateJWT');

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({}, '-__v');
        res.json({
            status: "success",
            data: users
        });
    } catch (error) {
        res.status(500).send({ message: "Error fetching users" });
    }
};

const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).send({ message: "User not found" });
        }
        res.json({
            status: "success",
            data: user
        });
    } catch (error) {
        res.status(500).send({ message: "Error fetching user" });
    }
};

const createUser = async (req, res) => {
    try {
        const { name, email, age, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const role = 'admin'; // default role
        const newUser = new User({
            name, email, age, role, password: hashedPassword
        });

        const token = await generateJWTFun({ id: newUser._id, email: newUser.email, role: newUser.role });
        newUser.token = token;

        const savedUser = await newUser.save();
        res.status(201).json({
            status: "success",
            data: savedUser
        });
        console.log(hashedPassword);
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: error });
    }
};

const updateUser = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!user) {
            return res.status(404).send({ message: "User not found" });
        }
        res.json({
            status: "success",
            data: user
        });
    } catch (error) {
        res.status(500).send({ message: "Error updating user" });
    }
};

const deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).send({ message: "User not found" });
        }
        res.json({
            status: "success",
            data: user
        });
    } catch (error) {
        res.status(500).send({ message: "Error deleting user" });
    }
};


const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).send({ message: "User not found" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).send({ message: "Invalid credentials" });
        }

        if (user && isMatch) {
            const token = await generateJWTFun({ id: user._id, email: user.email, role: user.role });
            user.token = token;
            await user.save();
        }

        res.json({
            status: "success",
            data: user
        });

    } catch (error) {
        res.status(500).send({ message: error });
        console.log(error, 'fffffffff');
    }
};

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    login,
    updateUser,
    deleteUser
}; 