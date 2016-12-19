var Search = require('mongoose').model('Search');

const SEARCH_LIMIT = 10
const API_KEY = process.env.API_KEY //Google API Key
const CSE_ID = process.env.CSE_ID //Google Custome Search Engine ID
const GOGLE_CSE_URL = 'https://www.googleapis.com/customsearch/v1/'

/* Execute search by calling the Google CSE */
exports.doSearch = function(req, res, next) {
    var request = require('request');

    var qs = {
        cx: CSE_ID,
        key: API_KEY,
        searchType: 'image',
        q: req.path.slice(1),
        start: Math.abs((parseInt((req.query.offset || 0), 10)) || 0) + 1
    }

    var imageArray = function(items) {
        var arr = []
        items.forEach(function(e) {
            arr.push({
                url: e.link,
                snippet: e.snippet,
                thumbnail: e.image.thumbnailLink,
                context: e.image.contextLink
            })
        })

        return arr
    }

    var api = request(
        
        {
            url: GOGLE_CSE_URL,
            qs: qs
        },
        function(err, response, body) {
            if (err) {
                throw err;
            }
           
            res.json(imageArray(JSON.parse(body).items))
        }
    );


}

/* Save the search to the database */
exports.create = function(req, res, next) {
    var search = new Search({
        term: req.path.slice(1)
    })

    search.save(function(err) {
        if (err) {
            console.log(err.message)
            res.json({
                'error': getErrorMessage(err)
            })
            return next(err)
        }
        else {
            next()
        }
    });
}

/* Fetch list of searches which is 
limited by SEARCH_LIMIT */
exports.list = function(req, res) {
    Search.find({}).
    limit(SEARCH_LIMIT).
    sort('-when').
    select('-_id term when').
    exec(function(err, searches) {
        if (err) {
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        }
        else {
            res.json(searches);
        }
    });
};

var getErrorMessage = function(err) {
    var message = '';
    if (err.code) {
        switch (err.code) {
            default: message = 'Something went wrong';
        }
    }
    else {
        for (var errName in err.errors) {
            if (err.errors[errName].message) message = err.errors[errName].
            message;
        }
    }
    return message;
};
