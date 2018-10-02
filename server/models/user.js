const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    email: String,
    password: String,  // TODO - Will need to hash the passwords later
    isAdmin: Boolean
}, { collection: 'users' });

module.exports = mongoose.model('user', UserSchema);