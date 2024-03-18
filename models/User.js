const mongoose = require('mongoose');
const {Schema} = mongoose;

const userSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        role:{
            type: String,
            enum: ['organizer', 'participant','sponsor'],
            required: true
        },
        date: {
            type: Date,
            default: Date.now
        },
        verifiedAt:{
            type: Date,
            default: null
        },
        verificationToken:{
            type: String,
            default: null
        }
    }
)

const User = mongoose.model('user', userSchema);
module.exports = User;