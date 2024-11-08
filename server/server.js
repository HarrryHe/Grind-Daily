//initialize all necessary frameworks and settings
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 9000;
const loginRoute = require('./routes/login');
const registerRoute = require('./routes/register');
const userRoute = require('./routes/user');
const history = require('connect-history-api-fallback');
const path = require('path');

//MongoDB Connection:
const mongoose = require('mongoose')

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

app.use(history());
app.use(express.static(path.join(__dirname, '..', 'client', 'build')));

//for local test, change the URL after deploy to backend application
app.listen(PORT, () => {
    console.log(`Server running on https://grinddaily.onrender.com:${PORT}`);
});
