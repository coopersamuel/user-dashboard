const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

// Every user has an email, a password and an isAdmin indicator
// As of now, the passwords are stored in plaintext -
// This would NEVER be the case in a production application
const UserSchema = mongoose.Schema({
    email: String,
    password: String, 
    isAdmin: { type: Boolean, default: false }
}, { collection: 'users', timestamps: true });

UserSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('user', UserSchema);