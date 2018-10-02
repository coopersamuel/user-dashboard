/**
 * This controller contains methods for handling all CRUD operations for users
 */

const User = require('../models/user');

// Create and save a new User
exports.create = (req, res) => {
    // Validate the request
    if (!req.body.email || !req.body.password) {
        return res.status(400).send({
            message: 'Must include email and password'
        });
    }

    // Create a new user
    const user = new User({
        email: req.body.email,
        password: req.body.password,
        isAdmin: req.body.isAdmin
    });

    // Save the user in the collection
    user.save()
        .then(data => {
            res.send(data);
        }).catch(error => {
            res.status(500).send({
                message: error.message || 'Error occurred while creating this user'
            });
        });
};

// Retrieve and return all the users in the collection
exports.findAll = (req, res) => {
    User.find()
        .then(users => {
            res.send(users);
        }).catch(error => {
            message: error.message || 'Error occurred while retrieving users'
        });
};

// Update a user given a userId in the request
exports.update = (req, res) => {
    // Find a user and update it with the request body
    User.findByIdAndUpdate(req.params.userId, {
        email: req.body.email,
        password: req.body.password,
        isAdmin: req.body.isAdmin
    }, { new: true })
        .then(user => {
            if (!user) {
                return res.status(404).send({
                    message: `User could not be found with id ${req.params.userId}`
                });
            }

            res.send(user);
        }).catch(error => {
            return res.status(500).send({
                message: `Error updating user with id ${req.params.userId}`
            });
        });
};

// Delete a user given a userId in the request
exports.delete = (req, res) => {
    User.findByIdAndRemove(req.params.userId)
        .then(user => {
            if (!user) {
                return res.status(404).send({
                    message: `User could not be found with id ${req.params.userId}`
                });
            }

            res.send({ message: 'User successfully deleted' });
        }).catch(error => {
            return res.status(500).send({
                message: `Error deleting user with id ${req.params.userId}`
            });
        });
};