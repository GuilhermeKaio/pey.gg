const mongoose = require('mongoose');
const { model } = mongoose;

const matchPlayerSchema = require('../schema/matchPlayer.js');

const player = mongoose.model('playerMatches', matchPlayerSchema);

module.exports = player;