const mongoose = require('mongoose');
const { model } = mongoose;

const playerSchema = require('../schema/player.js');

const player = mongoose.model('players', playerSchema);

module.exports = player;