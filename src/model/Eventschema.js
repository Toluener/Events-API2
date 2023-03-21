const mongoose = require('mongoose');
const EventSchema = new mongoose.Schema(
    {
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },    
    eventname: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }, 
    attendees: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Attendee'
    }]
    }, 
    { versionKey: false})
     

const Event = mongoose.model('Event', EventSchema, 'Event');

module.exports = Event;