const mongoose = require('mongoose');

const homepage = new mongoose.Schema({
heading:Object,
content:Object
})

module.exports = mongoose.model('Homepage', homepage)