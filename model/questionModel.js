const mongoose = require('mongoose');
const User = require('../model/userModel');

const Schema = mongoose.Schema
const questionSchema = new Schema({
    question: {
        type: String,
        required: [true]
    },
    description: {
        type: String,
        required: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: User,
    }

}, { timestamps: true })



module.exports = mongoose.model('question', questionSchema)
