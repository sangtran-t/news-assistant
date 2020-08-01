const mongoose = require('mongoose');

var articleSearchSchema = new mongoose.Schema({
    _id: {
        type: String,
        default: "",
        required: true
    },
    id: {
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
        type: String,
        default: "",
        required: true
    },
    paragraphs_clear: {
        type: String,
        default: "",
        required: true
    }
    
});

var ArticleSearch = mongoose.model("ArticleSearch", articleSearchSchema, "mrc_contents");
module.exports = ArticleSearch;