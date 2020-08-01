const mongoose = require('mongoose');

var audioSchema = new mongoose.Schema({
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
    audio: {
        type: String,
        default: "",
        required: true
    },
});

var Audio = mongoose.model("Audio", audioSchema, "mrc_audio");
module.exports = Audio;