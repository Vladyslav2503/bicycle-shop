const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
    name: String,
    type: String,
    image: String,
    price: Number,
    forWhom: String,
    color: String,
    typeOfBicycles: String


})

const ProductModel = mongoose.model("reviews", ProductSchema)
module.exports = ProductModel