const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true },
    email: {
        type: String, 
        required: true},    
    password: {
        type: String,
        required: true},
    role: {
        type: String,
        uppercase: true,
        required: true
    },    
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

const user = mongoose.model('User', userSchema, 'User');
module.exports = user;