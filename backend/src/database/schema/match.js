const mongoose = require('mongoose');
const { Schema } = mongoose;
const playerSchema = require('../schema/matchPlayer.js');

const matchSchema = new Schema({
    url: {
        type: String,
        required: [true, 'match without url']
    },
    duration:{
        type: Number,
        required: [true, 'match without duração']
    },
    date:{
        type: Date,
        required:[true, 'match without Data']
    },
    firstTower:{
        time:{
            type: Number,
            required: [true, 'match without tempo de torre']
        },
        team:{
            type: String,
            required: [true, 'match without time de torre']
        }
    },
    mvp:{
        type: String,
        required: [true, 'match without mvp']
    },
    blueChampions:{
        type: [String],
        required: [true, 'match without champions in blue side']
    },
    redChampions:{
        type: [String],
        required: [true, 'match without champions in red side']
    },
    blueSide:{
        team: {
            type: String,
            required: [true, 'match without team name in blue side'] 
        },
        bans:{
            type: [String],
            required: [true, 'match without bans in blue side']
        },
        gold:{
            type: Number,
            required: [true, 'match without gold in blue side']
        },
        kills:{
            type: Number,
            required: [true, 'match without kills in blue side']
        },
        towers:{
            type: Number,
            required: [true, 'match without towers in blue side']
        },
        drakes:{
            type: Number,
            required: [true, 'match without drakes in blue side']
        },
        dragonTypes:{
            fire:{
                type: Number,
                required: [true, 'match without fire drake in blue side']
            },
            air:{
                type: Number,
                required: [true, 'match without air drake in blue side']
            },
            earth:{
                type: Number,
                required: [true, 'match without earth drake in blue side']
            },
            ocean:{
                type: Number,
                required: [true, 'match without ocean drake in blue side']
            }
        },
        herald:{
            type: Number,
            required: [true, 'match without herald in blue side']
        },
        baron:{
            type: Number,
            required: [true, 'match without baron in blue side']
        },
        players:{
            type: [playerSchema],
            required: [true, 'match without players in blue side']
        }
    },
    redSide:{
        team: {
            type: String,
            required: [true, 'match without team name in red side'] 
        },
        bans:{
            type: [String],
            required: [true, 'match without bans in red side']
        },
        gold:{
            type: Number,
            required: [true, 'match without gold in red side']
        },
        kills:{
            type: Number,
            required: [true, 'match without kills in red side']
        },
        towers:{
            type: Number,
            required: [true, 'match without towers in red side']
        },
        drakes:{
            type: Number,
            required: [true, 'match without drakes in red side']
        },
        dragonTypes:{
            fire:{
                type: Number,
                required: [true, 'match without fire drake in red side']
            },
            air:{
                type: Number,
                required: [true, 'match without air drake in red side']
            },
            earth:{
                type: Number,
                required: [true, 'match without earth drake in red side']
            },
            ocean:{
                type: Number,
                required: [true, 'match without ocean drake in red side']
            }
        },
        herald:{
            type: Number,
            required: [true, 'match without herald in red side']
        },
        baron:{
            type: Number,
            required: [true, 'match without baron in red side']
        },
        players:{
            type: [playerSchema],
            required: [true, 'match without players in red side']
        }
    }
});

  module.exports = matchSchema;