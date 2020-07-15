const mongoose = require('mongoose');

var articleSchema = new mongoose.Schema({
    _id: {
        type: String,
        default: "",
        required: true
    },
    link: {
        type: String,
        default: "",
        required: true
    },
    tags: {
        type: Array,
        default: "",
        required: true
    },
    time_created: {
        type: String,
        default: "",
        required: true
    },
    title: {
        type: String,
        default: "",
        required: true
    },
    description: {
        type: Array,
        default: "",
        required: true
    },
    paragraphs: {
        type: String,
        default: "",
        required: true
    },
    paragraphs_clear: {
        type: String,
        default: "",
        required: true
    },
    id: {
        type: String,
        default: "",
        required: true
    },
    images: {
        type: String,
        default: "",
        required: true
    },
    audio: {
        type: String,
        default: "",
        required: true
    },
});

var Article = mongoose.model("Article", articleSchema, "mrc_data");
module.exports = Article;