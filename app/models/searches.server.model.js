var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
/* Model to store searches */
var searchSchema = new Schema({
    term: {
        type: String,
        required: 'Search cannot be blank'
    },
    when: {
        type: Date,
        default: Date.now,
        required: true
    }
});

mongoose.model('Search', searchSchema);