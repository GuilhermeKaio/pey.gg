const mongoose = require('mongoose');
const { model } = mongoose;

const matchSchema = require('../schema/match.js');

const match = mongoose.model('matches', matchSchema);

module.exports = match;