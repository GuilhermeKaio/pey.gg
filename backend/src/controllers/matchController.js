const database = require('../database/connection.js');
const Match = require('../database/model/match');

async function matchesTeam(req, res){
    await database.connect();
    let { page } = req.params;
    let { team, limit } = req.query;
    limit = parseInt(limit);
    documents = await Match.find({$or: [{ "blueSide.team" : team}, { "redSide.team" : team}]}).sort({'date': -1}).skip(page * limit).limit(limit);
    await database.disconnect();
    return res.json(documents);
}

async function stats(req, res) {
    await database.connect();
    let { team } = req.query;
    result = await Match.aggregate([
        {$match: {"blueSide.team" : team}},
        { $group: { _id: null, blueTotalGold: {$sum: "$blueSide.gold"},blueMinutes: {$sum: "$duration"} }},
        {$lookup: {from: 'matches', localField: 'blueSide.Team', foreignField: 'redSide.Team', as: 'red'}},
        {$unwind: {path: "$red"}},
        {$match: {"red.redSide.team" : team}},
        {$group: {_id: null, blueTotalGold: {$first: "$blueTotalGold"}, blueMinutes: {$first: "$blueMinutes"}, redTotalGold: {$sum: "$red.redSide.gold"}, redMinutes: {$sum: "$red.duration"}}},
        {$project: {
            _id: 0,
            'goldPerMinute':{$divide: [
                {$sum : ["$blueTotalGold","$redTotalGold"]}, 
                {$sum : ["$blueMinutes","$redMinutes"]}
                ]}
        }}
    ]);
    await database.disconnect();
    return res.json(result);
}

module.exports = { team: matchesTeam, stats }