const mongoose = require('mongoose')

// Schema
const commentSchema = new mongoose.Schema({
    body: {
        type: String,
        required: true
    },
    author: { type: String, required: true },
    // This lets you add comments to your comments
    // replies:[{
    //     body: {type: String, required: true},
    //     author: {type: String, required: true}
    // }]
},{timestamps: true})
const tweetSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        // mongoose offers multiple built-in required validators
        // Numbers : min and max values
        // Strings: enum, match, minLength, MaxLength
        // You can even make custom validators
        minLength: 1,
        maxLength: 100
    },
    body: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 255
    },
    author: {
        type: String,
        required: true
    },
    likes: {
        type: Number,
        default: 0 //Starting point
    },
    sponsored: {
        type: Boolean,
        default: false
    },
    comments: [commentSchema]


},
    // This tells the schema that you want to make timestamps, evertime this document is created or gets updated
    // This is an options object that isnt apart of the schema but is
    { timestamps: true })

// Model
const Tweet = mongoose.model('Tweet', tweetSchema)
// Export
module.exports = Tweet