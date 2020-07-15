var Article = require('../models/article.model');

module.exports.GetAllArticles = async (req, res) => {
    console.log('Getting all articles');
    results = [];
    var preprocess = (object) => {
        results.push({
            id: object['id'],
            title: object['title'],
            link: object['link'],
            description: object['description'].join('. '),
            images: object['images'],
            time: object['time_created']
        });
    }
    try {
        const filter = {};
        const articles = await Article.find(filter).limit(2);
        articles.forEach(preprocess);
        
        res.send(JSON.stringify(results));
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