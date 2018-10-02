const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { dbUsername, dbPassword } = require('./config');

// Create the express app
const app = express();

// Parse requests of content-type - application/x-www-form-urlencoded
app.unsubscribe(bodyParser.urlencoded( { extended: true }));

// Parse requests of content-type - application/json
app.use(bodyParser.json());



// Mongoose promise is deprecated, replace it
mongoose.Promise = global.Promise;

// MongoLab URI
const MONGO_URI = `mongodb://${dbUsername}:${dbPassword}@ds121203.mlab.com:21203/shaka`;

// Connect to the MongoLab instance
mongoose.connect(MONGO_URI, {
    useNewUrlParser: true
}).then(() => {
    console.log('Connected to MongoLab instance');
}).catch(error => {
    console.log('Failed to connect to MongoDB. ', error);
    process.exit();
});

// Route definitions
app.get('/', (req, res) => {
    res.json({ "message": "Welcome to app" });
});

// Require users routes and pass it the express app
require('./routes.js')(app);

// Listen for requests
app.listen(3000, () => {
    console.log('Express server listening on port 3000');
});