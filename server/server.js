//initialize all necessary frameworks and settings
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 9000;
const loginRoute = require('./routes/login');
const registerRoute = require('./routes/register');
const challengeRoute = require('./routes/challenge');
const userRoute = require('./routes/user');
const changePasswordRouter = require('./routes/changePassword');
const friendRoute = require('./routes/friend');
const commentRoute = require('./routes/comment');

//MongoDB Connection:
const mongoose = require('mongoose');

app.use(express.json());
app.use(cors({
    origin: ['http://localhost:3000', 'https://grinddaily.onrender.com']
}));

mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log("Connected to MongoDB"))
.catch(error => console.error("MongoDB connection error:", error));

//Router Area
app.use('/api/login', loginRoute);
app.use('/api/register', registerRoute);
app.use('/api/user', userRoute);
app.use('/api/challenge', challengeRoute);
app.use('/api/change-password', changePasswordRouter);
app.use('/api/comment', commentRoute);
app.use('/api/friends', friendRoute);

//for local test, change the URL after deploy to backend application
app.listen(PORT, () => {
    console.log(`Server running on https://grinddaily.onrender.com:${PORT}`);
});
