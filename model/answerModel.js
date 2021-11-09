const mongoose = require('mongoose')
const User = require('../model/userModel')
const Question = require('../model/questionModel')


const Schema = mongoose.Schema
const answerSchema = new Schema({
    answer: {
        type: String,
        required: [true]
    },

    user: {
        type: Schema.Types.ObjectId,
        ref: User,
    },

    question: {
        type: Schema.Types.ObjectId,
        ref: Question,
    }

}, { timestamps: true })


module.exports = mongoose.model('answer', answerSchema)