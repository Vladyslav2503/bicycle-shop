const mongoose = require('mongoose')

const feedbackSchema = new mongoose.Schema({
    name: String,
    description: String,
    rating: Number
})

const FeedBackModel = mongoose.model("feedbacks", feedbackSchema)
module.exports = FeedBackModel