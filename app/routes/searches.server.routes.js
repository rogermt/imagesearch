var searches = require('../../app/controllers/searches.server.controller');
module.exports = function(app) {
    /* 
    route list the last 10 searches 
    */
    app.route("/api/latest/imagesearch")
        .get(searches.list)

     /* 
    route 
    @1. Save search specified in the search string
    @2. Execute the search
    */
    app.route("/:searchStr")
        .get(searches.create)
        .get(searches.doSearch)
}
