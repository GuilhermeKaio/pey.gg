const mongoose = require('mongoose');
const { Schema } = mongoose;

const playerSchema = new Schema({
    nick:{
        type: String,
        required: [true, 'Player without Nick']
    },
    champion: {
        type: String,
        required: [true, 'Player without champion']
    },
    level:{
        type: Number,
        required: [true, 'Player without level']
    },
    combat:{
        kill:{
            type: Number,
            required: [true, 'Player without kill']
        },
        death:{
            type: Number,
            required: [true, 'Player without death']
        },
        assists:{
            type: Number,
            required: [true, 'Player without assists']
        },
        firstBlood:{
            type: Boolean,
            required: [true, 'Player without first blood']
        },
        largestKillingSpree:{
            type: Number,
            required: [true, 'Player without largest killing spree']
        },
        largestMultiKill:{
            type: Number,
            required: [true, 'Player without largest multi kill']
        }
    },
    damageDealt:{
        totalDamageChampions:{
            type: Number,
            required: [true, 'Player without damage dealt to champions']
        },
        physicalDamageChampions:{
            type: Number,
            required: [true, 'Player without physical damage dealt to champions']
        },
        magicDamageChampions:{
            type: Number,
            required: [true, 'Player without magic damage dealt to champions']
        },
        trueDamageChampions:{
            type: Number,
            required: [true, 'Player without true damage dealt to champions']
        },
        totalDamageDealt:{
            type: Number,
            required: [true, 'Player without total damage dealt to champions']
        },
        physicalDamageDealt:{
            type: Number,
            required: [true, 'Player without physical damage dealt to champions']
        },
        magicDamageDealt:{
            type: Number,
            required: [true, 'Player without magic damage dealt to champions']
        },
        trueDamageDealt:{
            type: Number,
            required: [true, 'Player without true damage dealt to champions']
        },
        largestCriticalStrike: Number,
        totalDamageObjectives:{
            type: Number,
            required: [true, 'Player without total damage objectives']
        },
        totalDamageTurrets:{
            type: Number,
            required: [true, 'Player without total damage to turrets']
        }
    },
    damageTakenHealed:{
        damageHealed:{
            type: Number,
            required: [true, 'Player without damage healed']
        },
        damageTaken:{
            type: Number,
            required: [true, 'Player without damage taken']
        },
        physicalDamageTaken:{
            type: Number,
            required: [true, 'Player without physical damage taken to champions']
        },
        magicDamageTaken:{
            type: Number,
            required: [true, 'Player without magic damage taken to champions']
        },
        trueDamageTaken:{
            type: Number,
            required: [true, 'Player without true damage taken to champions']
        }
    },
    wards:{
        wardsPlaced:{
            type: Number,
            required: [true, 'Player without wards placed']
        },
        wardsDestroyed:{
            type: Number,
            required: [true, 'Player without wards destroyed']
        },
        controlWardsPurchased:{
            type: Number,
            required: [true, 'Player without control wards purchased']
        }
    },
    income:{
        goldEarned:{
            type: Number,
            required: [true, 'Player without gold earned']
        },
        goldSpent:{
            type: Number,
            required: [true, 'Player without gold spent']
        },
        minionsKilled: {
            type: Number,
            required: [true, 'Player without minions killed']
        },
        neutralMinionsKilled:{
            type: Number,
            required: [true, 'Player without neutral minions killed']
        },
        neutralMinionsKilledTeamJungle:{
            type: Number,
            required: [true, 'Player without neutral minions killed in team Jungle']
        },
        neutralMinionsKilledEnemyJungle:{
            type: Number,
            required: [true, 'Player without neutral minions killed in enemy jungle']
        }
    }
});

module.exports = playerSchema;