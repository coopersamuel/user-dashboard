/**
 * This module defines routes for user CRUD
 */ 

module.exports = (app) => {
    // Import the users controller
    const users = require('./controllers/users.js');

    // Create a new user
    app.post('/users', users.create);

    // Retrieve and authenticate one user
    app.post('/authenticate', users.authenticate);

    // Retrieve all users
    app.get('/users', users.findAll);

    // Retrieve users paginated
    app.get('/users/:page', users.findUsersPaginated);

    // Update a user with a userId
    app.put('/users/:userId', users.update);

    // Delete a user with a userId
    app.delete('/users/:userId', users.delete);
};