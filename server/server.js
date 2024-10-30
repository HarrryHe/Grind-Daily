//initialize all necessary frameworks and settings
require('dotenv').config();
const express = require('express');
const app = express();
const PORT = 5000;
const loginRoute = require('./routes/login');
const registerRoute = require('./routes/register');

//MongoDB Connection:
const mongoose = require('mongoose')

app.use(express.json());

mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log("Connected to MongoDB"))
.catch(error => console.error("MongoDB connection error:", error));

//Router Area
app.use('/login', loginRoute);
app.use('/register', registerRoute);

//for local test, change the URL after deploy to backend application
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
