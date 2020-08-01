var Article = require('../models/article.model');
var ArticleSearch = require('../models/article.search.model');
var Audio = require('../models/audio.model');

module.exports.GetAllArticles = async (req, res) => {
    results = [];
    var preprocess = (object) => {
        results.push({
            id: object['id'],
            title: object['title'],
            description: object['description'],
            images: object['images'],
            // link: object['link'],
            // description: object['description'].join('. '),
            // time: object['time_created']
        });
    }
    try {
        var current = Number(req.query.current);
        const filter = {};
        var articles = {};
        articles = await Article.find(filter).skip(current).limit(10);
        console.log('Got ' + articles.length + ' articles');
        // if (limit) {
        //     articles = await Article.find(filter).skip(limit-10).limit(10);
        //     console.log('Getting ' + articles.length + ' articles');
        // }
        // else {
        //     console.log('Getting all articles');
        //     articles = await Article.find(filter).limit(0);
        // }
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
        audio = await Audio.findOne().select('audio').where('id').equals(id);
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

module.exports.GetRelevantContent = async (req, res) => {
    var user_input = req.query.q;
    const aggregation = [{
        '$search': {
            'index': 'indexes',
            'text': {
                'query': user_input,
                'path': [
                    'paragraphs_clear', 'title', 'description'
                ],
                'score': {
                    'boost': {
                        'value': 5
                    }
                }
            },
            'highlight': {
                'path': [
                    'paragraphs_clear', 'title', 'description'
                ]
            }
        }
    }, {
        '$limit': 1
    }, {
        '$project': {
            'paragraphs_clear': 1,
            'score': {
                '$meta': 'searchScore'
            }
        }
    }];
    try {
        await ArticleSearch.aggregate(aggregation, (cmdErr, result) => {
            res.send(result);
        });
    } catch (error) {
        console.log(error);
    }
    
}

{/* <audio controls = "controls" autobuffer = "autobuffer" autoplay = "autoplay" > < source src = "data:audio/wav;base64,'+audio['audio']+'" /> </audio>' */}