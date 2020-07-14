var Article = require('../models/article.model');

module.exports.GetAllArticles = async (req, res) => {
    try {
        const filter = {};
        const all = await Article.findOne(filter);
        res.send(all);
    } catch (error) {
        console.log(error);
    }
}

module.exports.GetAudio = async (req, res) => {
    var id = req.query.id;
    console.log('Getting audio data for article '+id);
    try {
        audio = await Article.findOne().select('audio').where('id').equals(id);
        res.send('<audio controls="controls" autobuffer="autobuffer" autoplay="autoplay"> <source src = "data:audio/wav;base64,'+audio['audio']+'" /></audio>');
    } catch (error) {
        console.log(error);
    }
}

module.exports.GetContents = async (req, res) => {
    var id = req.query.id;
    console.log('Getting contents data for article ' + id);
    try {
        contents = await Article.findOne().select('paragraphs_clear').where('id').equals(id);
        res.send(contents);
    } catch (error) {
        console.log(error);
    }
}