const express = require('express');
const bodyParser = require('body-parser');

const history = require('connect-history-api-fallback');
const mongoose = require('mongoose');
const webpackMiddleware = require('webpack-dev-middleware');
const webpack = require('webpack');
const { dbUsername, dbPassword } = require('./config');

// Create the express app
const app = express();
app.use(history());

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

// Webpack runs as a middleware.  If any request comes in for the root route ('/')
// Webpack will respond with the output of the webpack process: an HTML file and
// a single bundle.js output of all of our client side Javascript
const webpackConfig = require('../webpack.config.js');
app.use(webpackMiddleware(webpack(webpackConfig), {
    publicPath: webpackConfig.output.publicPath
}));

// Require users routes and pass it the express app
require('./routes.js')(app);

// Listen for requests
app.listen(3000, () => {
    console.log('Express server listening on port 3000');
});