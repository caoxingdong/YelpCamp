const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CampgroundSchema = new Schema({
    body: String,
    rating: Number
})

module.exports = mongoose.model('Campground', CampgroundSchema)