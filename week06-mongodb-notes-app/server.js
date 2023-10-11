const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

//const noteRoutes = require('./routes/NoteRoutes.js'); // Use a relative path
//when i run server.js with ^^ uncommented the application cannot
//find the location of NoteRoutes.js even when I give it a direct route
const DB_URL = "mongodb+srv://warstander45:comp3123@cluster0.djpgvtv.mongodb.net/?retryWrites=true&w=majority"
const app = express();
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

mongoose.Promise = global.Promise;

// TODO - Update your mongoDB Atals Url here to Connect to the database
mongoose.connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Successfully connected to the database mongoDB Atlas Server");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});


app.get('/', (req, res) => {
    res.send("<h1>Welcome to Note taking application - Week06 Exercise</h1>");
});


app.listen(8081, () => {
    console.log("Server is listening on port 8081");
});