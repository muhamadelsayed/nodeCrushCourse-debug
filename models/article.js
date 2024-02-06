const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const articleSchema = new Schema({
    title:String,
    body:String,
    numOflikes:Number
})

const article = mongoose.model("article",articleSchema);
module.exports = article;
