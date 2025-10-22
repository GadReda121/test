const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();

const cors = require('cors');
app.use(cors());

mongoose.connect(process.env.MONGODB).then((data) => {
}).catch(err => {
    console.error('Failed to connect to MongoDB', err);
});

const port = process.env.PORT || 4000;

app.use(express.json());

app.use('/courses', require('./routes/coursesRoutes'));
app.use('/users', require('./routes/userRoutes'));

app.use((req, res) => {
    res.status(404).send({ message: "Route not found" });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});