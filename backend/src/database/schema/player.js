const mongoose = require('mongoose');
const { Schema } = mongoose;

const championsSchema = new Schema({
    name: String,
    wins: Number,
    loses: Number,
});

const playerSchema = new Schema({
    nick: {
        type: String,
        required:  [true, 'Jogador sem Nick!']
    },
    role: {
        type: String,
        required: [true, 'Jogador sem Role!']
    },
    league: {
        type: String,
        required: [true, 'Jogador sem Liga!']
    },
    team: {
        type: String,
        required: [true, 'Jogador sem Time']
    },
    general: {
        wins:{
            type: Number,
            default: 0
        },
        loses:{
            type: Number,
            default: 0
        }
    },
    champions: {
        type: [championsSchema]
    }
  });

  module.exports = playerSchema;