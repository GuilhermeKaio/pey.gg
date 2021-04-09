const mongoose = require('mongoose');
const { Schema } = mongoose;

const championSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Campeao sem nome']
    },
    title:{
        type: String,
        required: [true, 'Campeao sem titulo']
    },
    icon:{
        type: String,
        required:[true, 'Campeao sem icone']
    },
    wins:{
        type: Number,
        default: 0
    },
    loses:{
        type: Number,
        default: 0
    }
});

  module.exports = championSchema;