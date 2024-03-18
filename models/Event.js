const mongoose = require("mongoose");
const { Schema } = mongoose;

const eventSchema= new Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    organizer: {
        type: Schema.Types.ObjectId,
        ref: "user",
    },
    participantLimit: {
        type: Number,
        default:null,
    },
    participants: [
        {
        type: Schema.Types.ObjectId,
        ref: "user",
        },
    ],
    sponsors: [
        {
        type: Schema.Types.ObjectId,
        ref: "user",
        },
    ],
    duration: {
        type: Number,
        required: true,
    },
    keywords:{
        type: [String],
        required: true,
    },
    needSponsor: {
        type: Boolean,
        required: true,
    },
    deliverables: [
        {
        type: Schema.Types.ObjectId,
        ref: "deliverable",
        },
    ],
    status:{
        type: String,
        enum: ["open","closed","completed","ongoing","cancelled"],
        required: true,
    }
});

const Event = mongoose.model("event", eventSchema);