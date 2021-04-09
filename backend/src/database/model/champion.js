const mongoose = require('mongoose');
const { model } = mongoose;

const championSchema = require('../schema/champion.js');

const champion = mongoose.model('champions', championSchema);

module.exports = champion;