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

// Same as findAll, but here the results will be paginated
exports.findUsersPaginated = (req, res) => {
    const pageNum = parseInt(req.params.page);

    User.paginate({}, { page: pageNum, limit: 10 })
        .then(users => {
            res.send(users);
        }).catch(error => {
            message: error.message || 'Error occurred while retrieving users'
        }); 
};

// Same as findAll, but here the results will be paginated and filtered
exports.findUsersPaginatedAndFiltered = (req, res) => {
    const pageNum = parseInt(req.params.page);
    const filter = { email: { $regex: new RegExp(req.params.filterString, "i") } };

    User.paginate(filter, { page: pageNum, limit: 10 })
        .then(users => {
            res.send(users);
        }).catch(error => {
            message: error.message || 'Error occurred while retrieving users'
        }); 
};

// Update a user given a userId in the request
exports.update = (req, res) => {
    // Validate the request
    if (!req.body.email || !req.body.password) {
        return res.status(400).send({
            message: 'Must include email and password'
        });
    }

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

// Authenticate one user from the collection given the user's email and password
// This is used when a user tries to login
exports.authenticate = (req, res) => {
    User.findOne({ email: req.body.email })
    .then(user => {
        if (!user) {
            return res.status(400).send({
                message: 'This email doesn\'t exist in our database. Try signing up instead.'
            });            
        }

        if (user.password !== req.body.password) {
            return res.status(400).send({
                message: 'Invalid password.'
            });
        } else {
            res.send(user);
        }
    }).catch(error => {
        return res.status(500).send({
            message: `Error finding user.`
        });
    });
};