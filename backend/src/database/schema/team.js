const mongoose = require('mongoose');
const { Schema } = mongoose;

const teamSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Time sem nome']
    },
    region:{
        type: String,
        required: [true, 'Time sem regiao']
    },
    wins:{
        type: Number,
        default: 0
    },
    loses:{
        type: Number,
        default: 0
    },
    logo: String
});

  module.exports = teamSchema;