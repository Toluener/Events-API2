const mongoose = require('mongoose');
const attendeeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    }})

    

const Attendee = mongoose.model('Attendee', attendeeSchema, 'Attendee');

module.exports = Attendee;