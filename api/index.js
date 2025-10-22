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

// ده كود بسيط بيقول "Hello" لما تفتح الرابط الرئيسي
export default function handler(request, response) {
    response.status(200).json({ message: 'Hello from Vercel!' });
}

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});