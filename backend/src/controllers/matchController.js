const Match = require('../database/model/match');
const Team = require('../database/model/team');

function mergeBans(oneDocument, twoDocument) {
  oneDocument.forEach(elementOne =>{
    New = true;
    twoDocument.forEach(elementTwo =>{
      if(elementOne.name == elementTwo.name){
        elementTwo.count += elementOne.count;
        New = false;
      }
    })
    if(New){
      twoDocument.push(elementOne)
    }
  });

  return twoDocument;
}

function compare( a, b ) {
  if ( a.count < b.count ){
    return 1;
  }
  if ( a.count > b.count ){
    return -1;
  }
  return 0;
}

async function matchesTeam(req, res){

    let { page } = req.params;
    let { team, limit } = req.query;
    limit = parseInt(limit);
    documents = await Match.find({$or: [{ "blueSide.team" : team}, { "redSide.team" : team}]}).sort({'date': -1}).skip(page * limit).limit(limit);
    return res.json(documents);
}

async function teamStats(req, res) {
    let { team } = req.query;
    try{
        general = await Match.aggregate([
          {
            '$match': {
              'blueSide.team': team
            }
          }, {
            '$group': {
              '_id': null, 
              'blueTotalGold': {
                '$sum': '$blueSide.gold'
              }, 
              'blueMinutes': {
                '$sum': '$duration'
              }, 
              'blueKills': {
                '$sum': '$blueSide.kills'
              }, 
              'blueDeaths': {
                '$sum': '$redSide.kills'
              }, 
              'blueGames': {
                '$sum': 1
              }, 
              'blueHerald': {
                '$sum': '$blueSide.herald'
              }, 
              'blueBaron': {
                '$sum': '$blueSide.baron'
              }, 
              'blueDrakes': {
                '$sum': '$blueSide.drakes'
              }, 
              'blueCs': {
                '$sum': '$blueSide.csTotal'
              }, 
              'blueWin': {
                '$sum': {
                  '$cond': [
                    '$blueSide.victory', 1, 0
                  ]
                }
              }, 
              'blueLose': {
                '$sum': {
                  '$cond': [
                    '$blueSide.victory', 0, 1
                  ]
                }
              }, 
              'blueGetFireDragon': {
                '$sum': '$blueSide.dragonTypes.fire'
              }, 
              'blueGetAirDragon': {
                '$sum': '$blueSide.dragonTypes.air'
              }, 
              'blueGetEarthDragon': {
                '$sum': '$blueSide.dragonTypes.earth'
              }, 
              'blueGetOceanDragon': {
                '$sum': '$blueSide.dragonTypes.ocean'
              }, 
              'blueLostFireDragon': {
                '$sum': '$redSide.dragonTypes.fire'
              }, 
              'blueLostAirDragon': {
                '$sum': '$redSide.dragonTypes.air'
              }, 
              'blueLostEarthDragon': {
                '$sum': '$redSide.dragonTypes.earth'
              }, 
              'blueLostOceanDragon': {
                '$sum': '$redSide.dragonTypes.ocean'
              }, 
              'blueGetTower': {
                '$sum': '$blueSide.towers'
              }, 
              'blueLostTower': {
                '$sum': '$redSide.towers'
              }
            }
          }, {
            '$project': {
              '_id': 0, 
              'blueSide': {
                'totalGold': '$blueTotalGold', 
                'totalMinutes': '$blueMinutes', 
                'kills': '$blueKills', 
                'deaths': '$blueDeaths', 
                'games': '$blueGames', 
                'herald': '$blueHerald', 
                'baron': '$blueBaron', 
                'drakes': '$blueDrakes', 
                'cs': '$blueCs', 
                'win': '$blueWin', 
                'lose': '$blueLose', 
                'dragonTypes': {
                  'gotten': {
                    'fire': '$blueGetFireDragon', 
                    'air': '$blueGetAirDragon', 
                    'earth': '$blueGetEarthDragon', 
                    'ocean': '$blueGetOceanDragon'
                  }, 
                  'lost': {
                    'fire': '$blueLostFireDragon', 
                    'air': '$blueLostAirDragon', 
                    'earth': '$blueLostEarthDragon', 
                    'ocean': '$blueLostOceanDragon'
                  }
                }, 
                'towers': {
                  'gotten': '$blueGetTower', 
                  'lost': '$blueLostTower'
                }
              }
            }
          }, {
            '$lookup': {
              'from': 'matches', 
              'localField': 'blueSide.Team', 
              'foreignField': 'redSide.Team', 
              'as': 'red'
            }
          }, {
            '$unwind': {
              'path': '$red'
            }
          }, {
            '$match': {
              'red.redSide.team': team
            }
          }, {
            '$group': {
              '_id': null, 
              'blueSide': {
                '$first': '$blueSide'
              }, 
              'redTotalGold': {
                '$sum': '$red.redSide.gold'
              }, 
              'redMinutes': {
                '$sum': '$red.duration'
              }, 
              'redKills': {
                '$sum': '$red.redSide.kills'
              }, 
              'redDeaths': {
                '$sum': '$red.redSide.kills'
              }, 
              'redGames': {
                '$sum': 1
              }, 
              'redHerald': {
                '$sum': '$red.redSide.herald'
              }, 
              'redBaron': {
                '$sum': '$red.redSide.baron'
              }, 
              'redDrakes': {
                '$sum': '$red.redSide.drakes'
              }, 
              'redCs': {
                '$sum': '$red.redSide.csTotal'
              }, 
              'redWin': {
                '$sum': {
                  '$cond': [
                    '$red.redSide.victory', 1, 0
                  ]
                }
              }, 
              'redLose': {
                '$sum': {
                  '$cond': [
                    '$red.redSide.victory', 0, 1
                  ]
                }
              }, 
              'redGetFireDragon': {
                '$sum': '$red.redSide.dragonTypes.fire'
              }, 
              'redGetAirDragon': {
                '$sum': '$red.redSide.dragonTypes.air'
              }, 
              'redGetEarthDragon': {
                '$sum': '$red.redSide.dragonTypes.earth'
              }, 
              'redGetOceanDragon': {
                '$sum': '$red.redSide.dragonTypes.ocean'
              }, 
              'redLostFireDragon': {
                '$sum': '$red.blueSide.dragonTypes.fire'
              }, 
              'redLostAirDragon': {
                '$sum': '$red.blueSide.dragonTypes.air'
              }, 
              'redLostEarthDragon': {
                '$sum': '$red.blueSide.dragonTypes.earth'
              }, 
              'redLostOceanDragon': {
                '$sum': '$red.blueSide.dragonTypes.ocean'
              }, 
              'redLostTower': {
                '$sum': '$red.blueSide.towers'
              }, 
              'redGetTower': {
                '$sum': '$red.redSide.towers'
              }
            }
          }, {
            '$project': {
              '_id': 0, 
              'blueSide': '$blueSide', 
              'redSide': {
                'totalGold': '$redTotalGold', 
                'totalMinutes': '$redMinutes', 
                'kills': '$redKills', 
                'deaths': '$redDeaths', 
                'games': '$redGames', 
                'herald': '$redHerald', 
                'baron': '$redBaron', 
                'drakes': '$redDrakes', 
                'cs': '$redCs', 
                'win': '$redWin', 
                'lose': '$redLose', 
                'dragonTypes': {
                  'gotten': {
                    'fire': '$redGetFireDragon', 
                    'air': '$redGetAirDragon', 
                    'earth': '$redGetEarthDragon', 
                    'ocean': '$redGetOceanDragon'
                  }, 
                  'lost': {
                    'fire': '$redLostFireDragon', 
                    'air': '$redLostAirDragon', 
                    'earth': '$redLostEarthDragon', 
                    'ocean': '$redLostOceanDragon'
                  }
                }, 
                'towers': {
                  'gotten': '$redGetTower', 
                  'lost': '$redLostTower'
                }
              }
            }
          }, {
            '$project': {
              'goldPerMinute': {
                '$divide': [
                  {
                    '$sum': [
                      '$blueSide.totalGold', '$redSide.totalGold'
                    ]
                  }, {
                    '$sum': [
                      '$blueSide.totalMinutes', '$redSide.totalMinutes'
                    ]
                  }
                ]
              }, 
              'csPerMinute': {
                '$divide': [
                  {
                    '$sum': [
                      '$blueSide.cs', '$redSide.cs'
                    ]
                  }, {
                    '$sum': [
                      '$blueSide.totalMinutes', '$redSide.totalMinutes'
                    ]
                  }
                ]
              }, 
              'AvgTowerDiff': {
                '$divide': [
                  {
                    '$subtract': [
                      {
                        '$sum': [
                          '$blueSide.towers.gotten', '$redSide.towers.gotten'
                        ]
                      }, {
                        '$sum': [
                          '$blueSide.towers.lost', '$redSide.towers.lost'
                        ]
                      }
                    ]
                  }, {
                    '$sum': [
                      '$blueSide.games', '$redSide.games'
                    ]
                  }
                ]
              }, 
              'KillsPerGame': {
                '$divide': [
                  {
                    '$sum': [
                      '$blueSide.kills', '$redSide.kills'
                    ]
                  }, {
                    '$sum': [
                      '$blueSide.games', '$redSide.games'
                    ]
                  }
                ]
              }, 
              'DeathsPerGame': {
                '$divide': [
                  {
                    '$sum': [
                      '$blueSide.deaths', '$redSide.deaths'
                    ]
                  }, {
                    '$sum': [
                      '$blueSide.games', '$redSide.games'
                    ]
                  }
                ]
              }, 
              'KillsPerDeaths': {
                '$divide': [
                  {
                    '$sum': [
                      '$blueSide.kills', '$redSide.kills'
                    ]
                  }, {
                    '$sum': [
                      '$blueSide.deaths', '$redSide.deaths'
                    ]
                  }
                ]
              }, 
              'DragonsPerGame': {
                '$divide': [
                  {
                    '$sum': [
                      '$blueSide.drakes', '$redSide.drakes'
                    ]
                  }, {
                    '$sum': [
                      '$blueSide.games', '$redSide.games'
                    ]
                  }
                ]
              }, 
              'HeraldsPerGame': {
                '$divide': [
                  {
                    '$sum': [
                      '$blueSide.herald', '$redSide.herald'
                    ]
                  }, {
                    '$sum': [
                      '$blueSide.games', '$redSide.games'
                    ]
                  }
                ]
              }, 
              'BaronsPerGame': {
                '$divide': [
                  {
                    '$sum': [
                      '$blueSide.baron', '$redSide.baron'
                    ]
                  }, {
                    '$sum': [
                      '$blueSide.games', '$redSide.games'
                    ]
                  }
                ]
              }
            }
          }
        ]);
      
      bansBy = await Match.aggregate([[
        {
          '$match': {
            'blueSide.team': team
          }
        }, {
          '$unwind': {
            'path': '$blueSide.bans'
          }
        }, {
          '$group': {
            '_id': '$blueSide.bans', 
            'team': {
              '$first': '$blueSide.team'
            }, 
            'count': {
              '$sum': 1
            }
          }
        }, {
          '$sort': {
            'count': -1
          }
        }, {
          '$group': {
            '_id': null, 
            'team': {
              '$first': '$team'
            }, 
            'bans': {
              '$push': {
                'name': '$_id', 
                'count': '$count'
              }
            }
          }
        }, {
          '$lookup': {
            'from': 'matches', 
            'localField': 'team', 
            'foreignField': 'redSide.team', 
            'as': 'red'
          }
        }, {
          '$unwind': {
            'path': '$red'
          }
        }, {
          '$unwind': {
            'path': '$red.redSide.bans'
          }
        }, {
          '$group': {
            '_id': '$red.redSide.bans', 
            'team': {
              '$first': '$team'
            }, 
            'Bluebans': {
              '$first': '$bans'
            }, 
            'count': {
              '$sum': 1
            }
          }
        }, {
          '$sort': {
            'count': -1
          }
        }, {
          '$group': {
            '_id': null, 
            'team': {
              '$first': '$team'
            }, 
            'blueBans': {
              '$first': '$Bluebans'
            }, 
            'redBans': {
              '$push': {
                'name': '$_id', 
                'count': '$count'
              }
            }
          }
        }, {
          '$project': {
            '_id': 0, 
            'team': 0
          }
        }
      ]]);


      bansAgainst = await Match.aggregate([
        {
          '$match': {
            'blueSide.team': team
          }
        }, {
          '$unwind': {
            'path': '$redSide.bans'
          }
        }, {
          '$group': {
            '_id': '$redSide.bans', 
            'team': {
              '$first': '$blueSide.team'
            }, 
            'count': {
              '$sum': 1
            }
          }
        }, {
          '$sort': {
            'count': -1
          }
        }, {
          '$group': {
            '_id': null, 
            'team': {
              '$first': '$team'
            }, 
            'bans': {
              '$push': {
                'name': '$_id', 
                'count': '$count'
              }
            }
          }
        }, {
          '$lookup': {
            'from': 'matches', 
            'localField': 'team', 
            'foreignField': 'redSide.team', 
            'as': 'red'
          }
        }, {
          '$unwind': {
            'path': '$red'
          }
        }, {
          '$unwind': {
            'path': '$red.blueSide.bans'
          }
        }, {
          '$group': {
            '_id': '$red.blueSide.bans', 
            'team': {
              '$first': '$team'
            }, 
            'Bluebans': {
              '$first': '$bans'
            }, 
            'count': {
              '$sum': 1
            }
          }
        }, {
          '$sort': {
            'count': -1
          }
        }, {
          '$group': {
            '_id': null, 
            'team': {
              '$first': '$team'
            }, 
            'blueBans': {
              '$first': '$Bluebans'
            }, 
            'redBans': {
              '$push': {
                'name': '$_id', 
                'count': '$count'
              }
            }
          }
        }, {
          '$project': {
            '_id': 0, 
            'team': 0
          }
        }
      ]);

      blueMvp = await Match.aggregate([
        {
          '$match': {
            'blueSide.team': team
          }
        }, {
          '$match': {
            'blueSide.victory': true
          }
        }, {
          '$group': {
            '_id': '$mvp', 
            'count': {
              '$sum': 1
            }
          }
        }, {
          '$sort': {
            'mvp': -1
          }
        }, {
          '$project': {
            '_id': 0, 
            'name': '$_id', 
            'count': 1
          }
        }
      ]);

      redMvp = await Match.aggregate([
        {
          '$match': {
            'redSide.team': team
          }
        }, {
          '$match': {
            'redSide.victory': true
          }
        }, {
          '$group': {
            '_id': '$mvp', 
            'count': {
              '$sum': 1
            }
          }
        }, {
          '$sort': {
            'mvp': -1
          }
        }, {
          '$project': {
            '_id': 0, 
            'name': '$_id', 
            'count': 1
          }
        }
      ]);

      blueFirstTower = await Match.aggregate([
        {
          '$match': {
            'blueSide.team': team
          }
        }, {
          '$match': {
            'firstTower.team': 'blue'
          }
        }, {
          '$group': {
            '_id': null, 
            'count': {
              '$sum': 1
            }
          }
        }, {
          '$project': {
            '_id': 0, 
            'count': 1
          }
        }
      ]);

      redFirstTower = await Match.aggregate([
        {
          '$match': {
            'redSide.team': team
          }
        }, {
          '$match': {
            'firstTower.team': 'red'
          }
        }, {
          '$group': {
            '_id': null, 
            'count': {
              '$sum': 1
            }
          }
        }, {
          '$project': {
            '_id': 0, 
            'count': 1
          }
        }
      ]);

      blueAllieFirstBlood = await Match.aggregate([
        {
          '$match': {
            'blueSide.team': team
          }
        }, {
          '$unwind': {
            'path': '$blueSide.players'
          }
        }, {
          '$group': {
            '_id': null, 
            'count': {
              '$sum': {
                '$cond': [
                  '$blueSide.players.combat.firstBlood', 1, 0
                ]
              }
            }
          }
        }, {
          '$project': {
            '_id': 0, 
            'count': 1
          }
        }
      ]);

      blueEnemyFirstBlood = await Match.aggregate([
        {
          '$match': {
            'blueSide.team': team
          }
        }, {
          '$unwind': {
            'path': '$redSide.players'
          }
        }, {
          '$group': {
            '_id': null, 
            'count': {
              '$sum': {
                '$cond': [
                  '$redSide.players.combat.firstBlood', 1, 0
                ]
              }
            }
          }
        }, {
          '$project': {
            '_id': 0, 
            'count': 1
          }
        }
      ]);

      redAllieFirstBlood = await Match.aggregate([
        {
          '$match': {
            'redSide.team': team
          }
        }, {
          '$unwind': {
            'path': '$redSide.players'
          }
        }, {
          '$group': {
            '_id': null, 
            'count': {
              '$sum': {
                '$cond': [
                  '$redSide.players.combat.firstBlood', 1, 0
                ]
              }
            }
          }
        }, {
          '$project': {
            '_id': 0, 
            'count': 1
          }
        }
      ]);

      redEnemyFirstBlood = await Match.aggregate([
        {
          '$match': {
            'redSide.team': team
          }
        }, {
          '$unwind': {
            'path': '$blueSide.players'
          }
        }, {
          '$group': {
            '_id': null, 
            'count': {
              '$sum': {
                '$cond': [
                  '$blueSide.players.combat.firstBlood', 1, 0
                ]
              }
            }
          }
        }, {
          '$project': {
            '_id': 0, 
            'count': 1
          }
        }
      ]);

      blueSideWL = await Match.aggregate([
        {
          '$match': {
            'blueSide.team': team
          }
        }, {
          '$group': {
            '_id': null, 
            'win': {
              '$sum': {
                '$cond': [
                  '$blueSide.victory', 1, 0
                ]
              }
            }, 
            'lose': {
              '$sum': {
                '$cond': [
                  '$blueSide.victory', 0, 1
                ]
              }
            }
          }
        }, {
          '$project': {
            '_id': 0, 
            'win': 1, 
            'lose': 1
          }
        }
      ]);

      redSideWL = await Match.aggregate([
        {
          '$match': {
            'redSide.team': team
          }
        }, {
          '$group': {
            '_id': null, 
            'win': {
              '$sum': {
                '$cond': [
                  '$redSide.victory', 1, 0
                ]
              }
            }, 
            'lose': {
              '$sum': {
                '$cond': [
                  '$redSide.victory', 0, 1
                ]
              }
            }
          }
        }, {
          '$project': {
            '_id': 0, 
            'win': 1, 
            'lose': 1
          }
        }
      ]);

      teamInfo = await Team.findOne({ 'name': team});
    }
    catch (error){
      return res.send(error);
    }

    bannedBy = mergeBans(bansBy[0].blueBans, bansBy[0].redBans);
    bannedBy.sort(compare);
    bannedAgainst= mergeBans(bansAgainst[0].blueBans, bansAgainst[0].redBans);
    bannedAgainst.sort(compare);
    mvps = mergeBans(blueMvp, redMvp);
    mvps.sort(compare);
    
    return res.json({
      goldPerMinute: general[0].goldPerMinute,
      csPerMinute: general[0].csPerMinute,
      avgTowerDiff: general[0].AvgTowerDiff,
      killsPerGame: general[0].KillsPerGame,
      deathsPerGame: general[0].DeathsPerGame,
      killsPerDeaths: general[0].KillsPerDeaths,
      dragonsPerGame: general[0].DragonsPerGame,
      heraldsPerGame: general[0].HeraldsPerGame,
      baronsPerGame: general[0].BaronsPerGame,
      firstTower: blueFirstTower[0].count + redFirstTower[0].count,
      allieFirstBlood: blueAllieFirstBlood[0].count + redAllieFirstBlood[0].count,
      enemyFirstBlood: blueEnemyFirstBlood[0].count + redEnemyFirstBlood[0].count,
      firstBlood: ((blueAllieFirstBlood[0].count + redAllieFirstBlood[0].count) / (blueEnemyFirstBlood[0].count + redEnemyFirstBlood[0].count + blueAllieFirstBlood[0].count + redAllieFirstBlood[0].count) * 100).toFixed(2),
      blue: {wins: blueSideWL[0].win, lose: blueSideWL[0].lose },
      red: {wins: redSideWL[0].win, lose: redSideWL[0].lose },
      winrate: ((blueSideWL[0].win + redSideWL[0].win) / (blueSideWL[0].lose + redSideWL[0].lose + blueSideWL[0].win + redSideWL[0].win) * 100).toFixed(2),
      mvps,
      bans: { bannedBy, bannedAgainst },
      logo: teamInfo.logo
    });
    
}

async function teamPercentage(req, res){
  let { team } = req.query;

  try{
      const [ fb ] = await Match.aggregate([ { '$match': { 'blueSide.team': team } }, { '$unwind': { 'path': '$blueSide.players' } }, { '$group': { '_id': null, 'team': { '$first': '$blueSide.team' }, 'blue': { '$sum': { '$cond': [ '$blueSide.players.combat.firstBlood', 1, 0 ] } }, 'total': { '$sum': 1 } } }, { '$project': { '_id': 0, 'team': 1, 'aBlueSide': '$blue', 'eBlueSide': { '$subtract': [ { '$divide': [ '$total', 5 ] }, '$blue' ] } } }, { '$lookup': { 'from': 'matches', 'localField': 'team', 'foreignField': 'redSide.team', 'as': 'red' } }, { '$unwind': { 'path': '$red' } }, { '$unwind': { 'path': '$red.redSide.players' } }, { '$group': { '_id': null, 'eBlueSide': { '$first': '$eBlueSide' }, 'aBlueSide': { '$first': '$aBlueSide' }, 'red': { '$sum': { '$cond': [ '$red.redSide.players.combat.firstBlood', 1, 0 ] } }, 'total': { '$sum': 1 } } }, { '$project': { '_id': 0, 'aBlueSide': 1, 'eBlueSide': 1, 'aRedSide': '$red', 'eRedSide': { '$subtract': [ { '$divide': [ '$total', 5 ] }, '$red' ] }, 'ally': { '$sum': [ '$red', '$aBlueSide' ] }, 'enemy': { '$sum': [ '$eBlueSide', { '$subtract': [ { '$divide': [ '$total', 5 ] }, '$red' ] } ] }, 'percentage': { '$multiply': [ { '$divide': [ { '$sum': [ '$red', '$aBlueSide' ] }, { '$sum': [ { '$sum': [ '$red', '$aBlueSide' ] }, { '$sum': [ '$eBlueSide', { '$subtract': [ { '$divide': [ '$total', 5 ] }, '$red' ] } ] } ] } ] }, 100 ] } } } ]);
      const [ wr ]= await Match.aggregate([ { '$match': { 'blueSide.team': team } }, { '$group': { '_id': null, 'team': { '$first': '$blueSide.team' }, 'winBlue': { '$sum': { '$cond': [ '$blueSide.victory', 1, 0 ] } }, 'loseBlue': { '$sum': { '$cond': [ '$blueSide.victory', 0, 1 ] } } } }, { '$lookup': { 'from': 'matches', 'localField': 'team', 'foreignField': 'redSide.team', 'as': 'red' } }, { '$unwind': { 'path': '$red' } }, { '$group': { '_id': null, 'winBlue': { '$first': '$winBlue' }, 'loseBlue': { '$first': '$loseBlue' }, 'winRed': { '$sum': { '$cond': [ '$red.redSide.victory', 1, 0 ] } }, 'loseRed': { '$sum': { '$cond': [ '$red.redSide.victory', 0, 1 ] } } } }, { '$project': { '_id': 0, 'winBlue': 1, 'loseBlue': 1, 'winRed': 1, 'loseRed': 1, 'win': { '$sum': [ '$winBlue', '$winRed' ] }, 'lose': { '$sum': [ '$loseBlue', '$loseRed' ] }, 'total': { '$sum': [ { '$sum': [ '$winBlue', '$winRed' ] }, { '$sum': [ '$loseBlue', '$loseRed' ] } ] }, 'percentage': { '$multiply': [ { '$divide': [ { '$sum': [ '$winBlue', '$winRed' ] }, { '$sum': [ { '$sum': [ '$winBlue', '$winRed' ] }, { '$sum': [ '$loseBlue', '$loseRed' ] } ] } ] }, 100 ] } } } ]);

      console.log(fb);
      console.log(wr)
      return res.json({
        firstBlood: fb.percentage.toFixed(1),
        winrate: wr.percentage.toFixed(1)
      });
  
    }
  catch {
    return res.sendStatus(500);
  }
}

async function teamPercentageArray(req, res){
  var arr = JSON.parse(req.query.array);
  var wr = [];
  var fb = [];
  var logos = [];
  
  try{
    for (team of arr){
        let [ firstBlood ] = await Match.aggregate([ { '$match': { 'blueSide.team': team } }, { '$unwind': { 'path': '$blueSide.players' } }, { '$group': { '_id': null, 'team': { '$first': '$blueSide.team' }, 'blue': { '$sum': { '$cond': [ '$blueSide.players.combat.firstBlood', 1, 0 ] } }, 'total': { '$sum': 1 } } }, { '$project': { '_id': 0, 'team': 1, 'aBlueSide': '$blue', 'eBlueSide': { '$subtract': [ { '$divide': [ '$total', 5 ] }, '$blue' ] } } }, { '$lookup': { 'from': 'matches', 'localField': 'team', 'foreignField': 'redSide.team', 'as': 'red' } }, { '$unwind': { 'path': '$red' } }, { '$unwind': { 'path': '$red.redSide.players' } }, { '$group': { '_id': null, 'eBlueSide': { '$first': '$eBlueSide' }, 'aBlueSide': { '$first': '$aBlueSide' }, 'red': { '$sum': { '$cond': [ '$red.redSide.players.combat.firstBlood', 1, 0 ] } }, 'total': { '$sum': 1 } } }, { '$project': { '_id': 0, 'aBlueSide': 1, 'eBlueSide': 1, 'aRedSide': '$red', 'eRedSide': { '$subtract': [ { '$divide': [ '$total', 5 ] }, '$red' ] }, 'ally': { '$sum': [ '$red', '$aBlueSide' ] }, 'enemy': { '$sum': [ '$eBlueSide', { '$subtract': [ { '$divide': [ '$total', 5 ] }, '$red' ] } ] }, 'percentage': { '$multiply': [ { '$divide': [ { '$sum': [ '$red', '$aBlueSide' ] }, { '$sum': [ { '$sum': [ '$red', '$aBlueSide' ] }, { '$sum': [ '$eBlueSide', { '$subtract': [ { '$divide': [ '$total', 5 ] }, '$red' ] } ] } ] } ] }, 100 ] } } } ]);      
        let [ winrate ]= await Match.aggregate([ { '$match': { 'blueSide.team': team } }, { '$group': { '_id': null, 'team': { '$first': '$blueSide.team' }, 'winBlue': { '$sum': { '$cond': [ '$blueSide.victory', 1, 0 ] } }, 'loseBlue': { '$sum': { '$cond': [ '$blueSide.victory', 0, 1 ] } } } }, { '$lookup': { 'from': 'matches', 'localField': 'team', 'foreignField': 'redSide.team', 'as': 'red' } }, { '$unwind': { 'path': '$red' } }, { '$group': { '_id': null, 'winBlue': { '$first': '$winBlue' }, 'loseBlue': { '$first': '$loseBlue' }, 'winRed': { '$sum': { '$cond': [ '$red.redSide.victory', 1, 0 ] } }, 'loseRed': { '$sum': { '$cond': [ '$red.redSide.victory', 0, 1 ] } } } }, { '$project': { '_id': 0, 'winBlue': 1, 'loseBlue': 1, 'winRed': 1, 'loseRed': 1, 'win': { '$sum': [ '$winBlue', '$winRed' ] }, 'lose': { '$sum': [ '$loseBlue', '$loseRed' ] }, 'total': { '$sum': [ { '$sum': [ '$winBlue', '$winRed' ] }, { '$sum': [ '$loseBlue', '$loseRed' ] } ] }, 'percentage': { '$multiply': [ { '$divide': [ { '$sum': [ '$winBlue', '$winRed' ] }, { '$sum': [ { '$sum': [ '$winBlue', '$winRed' ] }, { '$sum': [ '$loseBlue', '$loseRed' ] } ] } ] }, 100 ] } } } ]);

        teamInfo = await Team.findOne({ 'name': team});

        fb.push( firstBlood.percentage.toFixed(1));
        wr.push( winrate.percentage.toFixed(1));
        logos.push(teamInfo.logo);
    }
  }
  catch {
    return res.sendStatus(500);
  }

  return res.json({
    winrate: wr,
    firstblood: fb,
    logos: logos,
  });
}

module.exports = { team: matchesTeam, teamStats, teamPercentage, teamPercentageArray }