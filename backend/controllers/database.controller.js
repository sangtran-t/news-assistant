var Article = require('../models/article.model');

module.exports.GetAllArticles = async (req, res) => {
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
        var limit = Number(req.query.limit);
        const filter = {};
        var articles={};
        if (limit) {
            console.log('Getting '+limit+' articles');
            articles = await Article.find(filter).limit(limit);
        }
        else {
            console.log('Getting all articles');
            articles = await Article.find(filter).limit(0);
        }
        console.log('Preprocessing data...');
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
        res.send(JSON.stringify(audio));
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

{/* <audio controls = "controls" autobuffer = "autobuffer" autoplay = "autoplay" > < source src = "data:audio/wav;base64,'+audio['audio']+'" /> </audio>' */}