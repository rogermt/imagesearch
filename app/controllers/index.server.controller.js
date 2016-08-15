exports.render = function(req, res) {
    var domain =
        (req.get('X-Forwarded-Proto') || req.protocol) +
        '://' +
        req.get('host') + '/'
    res.render('index', {
        title: 'API: Image Search',
        url1: domain + 'olympics 2016?offset=20',
        url2: domain + 'api/latest/imagesearch',
        results: '{"url":"http://www.thehindu.com/multimedia/dynamic/02818/Dipa_Karmakar1_2818812f.jpg","snippet":"Dipa Karmakar on Monday ...","thumbnail":"https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcTlH6Rf-VIemfRuzq8AwuNd_J0tEGiC-goB1fJ2Kfha4i7miUtiRB-Rq98","context":"http://www.thehindu.com/sport/other-sports/rio-olympics-2016-dipa-karmakar-first-indian-woman-gymnast-to-seal-olympic-berth/article8488838.ece"}',
        recent: '[{"term":"lolcats funny","when":"2016-08-15T20:03:22.849Z"},{"term":"lolcats funny","when":"2016-08-15T20:00:05.953Z"}]'
    })
};