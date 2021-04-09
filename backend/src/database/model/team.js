const mongoose = require('mongoose');
const { model } = mongoose;

const teamSchema = require('../schema/team.js');

const team = mongoose.model('teams', teamSchema);

module.exports = team;