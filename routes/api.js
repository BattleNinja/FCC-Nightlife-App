var express = require('express');
var router = express.Router();
var Yelp = require('yelp-api-v3');

var yelp = new Yelp({
    app_id: '58gaDojr-rJQ2Iq67N6yGQ',
    app_secret: 'SCGuXivyVjVKUpx4fegFVMKl96MePfx8L4zwhpiUiFPv9QARKVgKPaVFobJ68vFq'
});

router.get('/search', function(req, res) {
    var place = req.query.place;
    yelp.search({
            term: 'food',
            location: place,
            limit: 18
        })
        .then(function(data) {
            res.json(JSON.parse(data).businesses);
            console.log(JSON.parse(data).businesses);
        })
        .catch(function(err) {
            console.error(err);
        });

});



module.exports = router;
