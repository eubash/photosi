var mongoose = require('mongoose');

module.exports = mongoose.model('Products', {
    _id : Number,
    name: String,
    price: Number,
    description: String
});
