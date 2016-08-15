var URL_COLLECTION = "urls"

var mongoose = require('./config/mongoose')
var express = require('./config/express')

var db = mongoose();
var app = express();


process.env.NODE_ENV = process.env.NODE_ENV || 'development'

// Initialize the app.
var server = app.listen(process.env.PORT || 8080, function() {
    var port = server.address().port
    console.log("App now running on port", port)
})