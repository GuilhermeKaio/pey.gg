import React, { useState, useEffect} from 'react';
import { Link, useLocation, useHistory } from 'react-router-dom';

import api from '../../services/api';

import './styles.css';

import logoImg from '../../assets/logo.svg';
import blueSideLogo from '../../assets/BlueSide.svg';
import redSideLogo from '../../assets/RedSide.svg';
import fbLogo from '../../assets/FB.svg';
import towerLogo from '../../assets/tower.svg';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

export default function Logon() {
  const [Stats, setStats] = useState([]);
  const [Data, setData] = useState([]);
  const [Bans, setBans] = useState([]);
  const [Count, setCount] = useState([]);
  const [logoTeam, setLogoTeam] = useState(null);
  const history = useHistory();
  
  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }
  
  let query = useQuery();

  const dataGet = async () => {
    var stats = [];
    var data = [];
    var bans = [];
    var count = [];
   try{
    await api
    .get(`stats?team=${query.get("name")}`)
    .then( res =>{
      stats.push(res.data.winrate);
      stats.push(res.data.goldPerMinute.toFixed(1));
      stats.push(res.data.csPerMinute.toFixed(1));
      stats.push(res.data.avgTowerDiff.toFixed(1));
      stats.push(res.data.killsPerGame.toFixed(1));
      stats.push(res.data.deathsPerGame.toFixed(1));
      stats.push(res.data.killsPerDeaths.toFixed(1));
      stats.push(res.data.dragonsPerGame.toFixed(1));
      stats.push(res.data.heraldsPerGame.toFixed(1));
      stats.push(res.data.baronsPerGame.toFixed(1));
      data.push(res.data.blue.wins);
      data.push(res.data.blue.lose);
      data.push(res.data.red.wins);
      data.push(res.data.red.lose);
      data.push(res.data.firstBlood + '%');
      data.push(res.data.firstTower);
      res.data.bans.bannedAgainst.slice(0, 5).forEach(element => {
        bans.push(element.name);
        count.push(element.count);
      });
      res.data.bans.bannedBy.slice(0, 5).forEach(element => {
        bans.push(element.name);
        count.push(element.count);
      });
      setLogoTeam(res.data.logo);
    })

    setBans(bans);
    setStats(stats);
    setData(data);
    setCount(count);
    return false;
  }
  catch{
    return true;
  }
  };

  useEffect(() => {
    async function fetchData() {
      let response = false;
      response = await dataGet();
      if (response){
        history.push('/');
      }
    }
    fetchData();
    
  }, []);
  return (
    <div>
      <Link className="link" to="/">
        <img src={logoImg} alt="Pey.gg" className="back-logo noselect"/>
      </Link>


      <div className="team-container">
        <section className="header noselect">
          <section className="logo-team">
            { 
              logoTeam == null ? 
            <SkeletonTheme color="#181A21" highlightColor="#2A2E38">
              <p>
                <Skeleton circle={true} height={200} width={200} className="img-team"/>
              </p>
            </SkeletonTheme> : <img src={logoTeam} alt={query.get("name")} className="img-team"/>
            }
          </section>
          <section className="info-team">
            <p className="info-name">
              {
                logoTeam == null ? "⠀" : query.get("name")
              }
            </p>
            <section className="info-row">
              <p className="info-league">
                {
                  logoTeam == null ? 
                <SkeletonTheme color="#181A21" highlightColor="#2A2E38">
                    <Skeleton circle={false} height={55} width={123}/>
                </SkeletonTheme> : 'CBLOL'
                }
              </p>
              <p className="info-season">
              {
                  logoTeam == null ? 
                <SkeletonTheme color="#181A21" highlightColor="#2A2E38">
                    <Skeleton circle={false} height={55} width={234}/>
                </SkeletonTheme> : 'Season 2020'
                }
              </p>
              <p className="info-split">
              {
                  logoTeam == null ? 
                <SkeletonTheme color="#181A21" highlightColor="#2A2E38">
                    <Skeleton circle={false} height={55} width={103}/>
                </SkeletonTheme> : 'Split 1'
                }
              </p>
            </section>
          </section>
        </section>
      </div>
      <div className="info-container">
        <section className="stats-section">
          <p className="stats-title">Statistics </p>
          <section className="stats-info">
            <table className="table-striped">
              <tr>
                <th className="table-title">Winrate</th>
                <th>:</th>
                <th className="table-value">{ Stats[0] == null ? 
                      <SkeletonTheme color="#2A2E38" highlightColor="#181A21">
                          <Skeleton circle={false} height={30} width={100}/>
                      </SkeletonTheme> : <p className={ Stats[0] >  50 ? "high" : "lower"}> { Stats[0] + '%' } </p>  }</th>
              </tr>
              <tr>
                <th className="table-title">CS per Minute</th>
                <th>:</th>
                <th className="table-value">{ Stats[1] == null ? 
                      <SkeletonTheme color="#181A21" highlightColor="#2A2E38">
                          <Skeleton circle={false} height={30} width={100}/>
                      </SkeletonTheme> : Stats[1] }</th>
              </tr>
              <tr>
                <th className="table-title">Gold per minute</th>
                <th>:</th>
                <th className="table-value">{ Stats[2] == null ? 
                      <SkeletonTheme color="#2A2E38" highlightColor="#181A21">
                          <Skeleton circle={false} height={30} width={100}/>
                      </SkeletonTheme> : Stats[2] }</th>
              </tr>
              <tr>
                <th className="table-title">Avg. Tower Diff.</th>
                <th>:</th>
                <th className="table-value">{ Stats[3] == null ? 
                      <SkeletonTheme color="#181A21" highlightColor="#2A2E38">
                          <Skeleton circle={false} height={30} width={100}/>
                      </SkeletonTheme> : <p className={ Stats[3] >  0 ? "high" : "lower"}> { Stats[3] } </p>}</th>
              </tr>
              <tr>
                <th className="table-title">Kill per game</th>
                <th>:</th>
                <th className="table-value">{ Stats[4] == null ? 
                      <SkeletonTheme color="#2A2E38" highlightColor="#181A21">
                          <Skeleton circle={false} height={30} width={100}/>
                      </SkeletonTheme> : Stats[4] }</th>
              </tr>
              <tr>
                <th className="table-title">Death per game</th>
                <th>:</th>
                <th className="table-value">{ Stats[5] == null ? 
                      <SkeletonTheme color="#181A21" highlightColor="#2A2E38">
                          <Skeleton circle={false} height={30} width={100}/>
                      </SkeletonTheme> : Stats[5] }</th>
              </tr>
              <tr>
                <th className="table-title">Kill per deaths</th>
                <th>:</th>
                <th className="table-value">{ Stats[6] == null ? 
                      <SkeletonTheme color="#2A2E38" highlightColor="#181A21">
                          <Skeleton circle={false} height={30} width={100}/>
                      </SkeletonTheme> : Stats[6] }</th>
              </tr>
              <tr>
                <th className="table-title">Dragon per game</th>
                <th>:</th>
                <th className="table-value">{ Stats[7] == null ? 
                      <SkeletonTheme color="#181A21" highlightColor="#2A2E38">
                          <Skeleton circle={false} height={30} width={100}/>
                      </SkeletonTheme> : Stats[7] }</th>
              </tr>
              <tr>
                <th className="table-title">Herald per game</th>
                <th>:</th>
                <th className="table-value">{ Stats[8] == null ? 
                      <SkeletonTheme color="#2A2E38" highlightColor="#181A21">
                          <Skeleton circle={false} height={30} width={100}/>
                      </SkeletonTheme> : Stats[8] }</th>
              </tr>
              <tr>
                <th className="table-title">Baron per game</th>
                <th>:</th>
                <th className="table-value">{ Stats[9] == null ? 
                      <SkeletonTheme color="#181A21" highlightColor="#2A2E38">
                          <Skeleton circle={false} height={30} width={100}/>
                      </SkeletonTheme> : Stats[9] }</th>
              </tr>
            </table>
          </section>
        </section>
        <section className="stats-section second">
          <p className="stats-title">Data </p>

          <section className="data-container">
            <section className="data-element">
            <section className="matches">
              <section className="blueside">
                <img src={blueSideLogo} alt=''></img> Blue Side
                <section className="matches-winrate">
                  <section className="matches-element">
                    W: <p className="matches-value">{ Data[0] == null ? 
                      <SkeletonTheme color="#181A21" highlightColor="#2A2E38">
                          <Skeleton circle={false} height={26} width={35}/>
                      </SkeletonTheme> : Data[0]}</p>
                  </section>
                  <section className="matches-element">
                    L: <p className="matches-value">{ Data[1] == null ? 
                      <SkeletonTheme color="#181A21" highlightColor="#2A2E38">
                          <Skeleton circle={false} height={26} width={35}/>
                      </SkeletonTheme> : Data[1]}</p>
                  </section>
                </section>
              </section>
              <section className="redside">
                <img src={redSideLogo} alt=''></img> Red Side
                <section className="matches-winrate">
                  <section className="matches-element">
                    W: <p className="matches-value"> 
                      { Data[2] == null ? 
                      <SkeletonTheme color="#181A21" highlightColor="#2A2E38">

                          <Skeleton circle={false} height={26} width={35}/>
                      </SkeletonTheme> : Data[2]}
                        </p>
                  </section>
                  <section className="matches-element">
                    L: <p className="matches-value">{ Data[3] == null ? 
                      <SkeletonTheme color="#181A21" highlightColor="#2A2E38">

                          <Skeleton circle={false} height={26} width={35}/>
                      </SkeletonTheme> : Data[3]}</p>
                  </section>
                </section>
              </section>
            </section>
            <section className="bans">
              Bans over {query.get("name")}
              <section className="bans-row">
                <section className="bans-value">
                 { Bans[0] == null ? 
                  <SkeletonTheme color="#181A21" highlightColor="#2A2E38">
                      <Skeleton circle={true} height={50} width={50}/>
                  </SkeletonTheme> : <img src={`http://ddragon.leagueoflegends.com/cdn/11.7.1/img/champion/${Bans[0]}.png`} alt=""></img>}
                  
                  <p>
                    {Count[0] == null ?
                    <SkeletonTheme color="#181A21" highlightColor="#2A2E38">
                      <Skeleton circle={false} height={25} width={41}/>
                  </SkeletonTheme> : Count[0]}
                  </p>
                </section>
                <section className="bans-value">
                  { Bans[1] == null ? 
                  <SkeletonTheme color="#181A21" highlightColor="#2A2E38">
                      <Skeleton circle={true} height={50} width={50}/>
                  </SkeletonTheme> : <img src={`http://ddragon.leagueoflegends.com/cdn/11.7.1/img/champion/${Bans[1]}.png`} alt=""></img>}
                  <p>
                    {Count[1] == null ?
                    <SkeletonTheme color="#181A21" highlightColor="#2A2E38">
                      <Skeleton circle={false} height={25} width={41}/>
                  </SkeletonTheme> : Count[1]}
                  </p>
                </section>
                <section className="bans-value">
                  { Bans[2] == null ? 
                  <SkeletonTheme color="#181A21" highlightColor="#2A2E38">
                      <Skeleton circle={true} height={50} width={50}/>
                  </SkeletonTheme> : <img src={`http://ddragon.leagueoflegends.com/cdn/11.7.1/img/champion/${Bans[2]}.png`} alt=""></img>}
                  <p>
                    {Count[2] == null ?
                    <SkeletonTheme color="#181A21" highlightColor="#2A2E38">
                      <Skeleton circle={false} height={25} width={41}/>
                  </SkeletonTheme> : Count[2]}
                  </p>
                </section>
                <section className="bans-value">
                  { Bans[3] == null ? 
                  <SkeletonTheme color="#181A21" highlightColor="#2A2E38">
                      <Skeleton circle={true} height={50} width={50}/>
                  </SkeletonTheme> : <img src={`http://ddragon.leagueoflegends.com/cdn/11.7.1/img/champion/${Bans[3]}.png`} alt=""></img>}
                  <p>
                    {Count[3] == null ?
                    <SkeletonTheme color="#181A21" highlightColor="#2A2E38">
                      <Skeleton circle={false} height={25} width={41}/>
                  </SkeletonTheme> : Count[3]}
                  </p>
                </section>
                <section className="bans-value">
                  { Bans[4] == null ? 
                  <SkeletonTheme color="#181A21" highlightColor="#2A2E38">
                      <Skeleton circle={true} height={50} width={50}/>
                  </SkeletonTheme> : <img src={`http://ddragon.leagueoflegends.com/cdn/11.7.1/img/champion/${Bans[4]}.png`} alt=""></img>}
                  <p>
                    {Count[4] == null ?
                    <SkeletonTheme color="#181A21" highlightColor="#2A2E38">
                      <Skeleton circle={false} height={25} width={41}/>
                  </SkeletonTheme> : Count[4]}
                  </p>
                </section>
              </section>
            </section>
            <section className="bans">
              Bans by {query.get("name")}
              <section className="bans-row">
                <section className="bans-value">
                  { Bans[5] == null ? 
                  <SkeletonTheme color="#181A21" highlightColor="#2A2E38">
                      <Skeleton circle={true} height={50} width={50}/>
                  </SkeletonTheme> : <img src={`http://ddragon.leagueoflegends.com/cdn/11.7.1/img/champion/${Bans[5]}.png`} alt=""></img>}
                  <p>
                    {Count[5] == null ?
                    <SkeletonTheme color="#181A21" highlightColor="#2A2E38">
                      <Skeleton circle={false} height={25} width={41}/>
                  </SkeletonTheme> : Count[5]}
                  </p>
                </section>
                <section className="bans-value">
                  { Bans[6] == null ? 
                  <SkeletonTheme color="#181A21" highlightColor="#2A2E38">
                      <Skeleton circle={true} height={50} width={50}/>
                  </SkeletonTheme> : <img src={`http://ddragon.leagueoflegends.com/cdn/11.7.1/img/champion/${Bans[6]}.png`} alt=""></img>}
                  <p>
                    {Count[6] == null ?
                    <SkeletonTheme color="#181A21" highlightColor="#2A2E38">
                      <Skeleton circle={false} height={25} width={41}/>
                  </SkeletonTheme> : Count[6]}
                  </p>
                </section>
                <section className="bans-value">
                  { Bans[7] == null ? 
                  <SkeletonTheme color="#181A21" highlightColor="#2A2E38">
                      <Skeleton circle={true} height={50} width={50}/>
                  </SkeletonTheme> : <img src={`http://ddragon.leagueoflegends.com/cdn/11.7.1/img/champion/${Bans[7]}.png`} alt=""></img>}
                  <p>
                    {Count[7] == null ?
                    <SkeletonTheme color="#181A21" highlightColor="#2A2E38">
                      <Skeleton circle={false} height={25} width={41}/>
                  </SkeletonTheme> : Count[7]}
                  </p>
                </section>
                <section className="bans-value">
                  { Bans[8] == null ? 
                  <SkeletonTheme color="#181A21" highlightColor="#2A2E38">
                      <Skeleton circle={true} height={50} width={50}/>
                  </SkeletonTheme> : <img src={`http://ddragon.leagueoflegends.com/cdn/11.7.1/img/champion/${Bans[8]}.png`} alt=""></img>}
                  <p>
                    {Count[8] == null ?
                    <SkeletonTheme color="#181A21" highlightColor="#2A2E38">
                      <Skeleton circle={false} height={25} width={41}/>
                  </SkeletonTheme> : Count[8]}
                  </p>
                </section>
                <section className="bans-value">
                  { Bans[9] == null ? 
                  <SkeletonTheme color="#181A21" highlightColor="#2A2E38">
                      <Skeleton circle={true} height={50} width={50}/>
                  </SkeletonTheme> : <img src={`http://ddragon.leagueoflegends.com/cdn/11.7.1/img/champion/${Bans[9]}.png`} alt=""></img>}
                  <p>
                    {Count[9] == null ?
                    <SkeletonTheme color="#181A21" highlightColor="#2A2E38">
                      <Skeleton circle={false} height={25} width={41}/>
                  </SkeletonTheme> : Count[9]}
                  </p>
                </section>
              </section>
            </section>
            <section className="other-data">
              <table className="table-striped">
                <tr>
                  <th className="table-title icon-text"> <img src={fbLogo} className="icon" alt=""></img> First Blood</th>
                  <th>:</th>
                  <th className="table-value">{ Data[4] == null ? 
                      <SkeletonTheme color="#2A2E38" highlightColor="#181A21">

                          <Skeleton circle={false} height={30} width={100}/>
                      </SkeletonTheme> : Data[4] }</th>
                </tr>
                <tr>
                  <th className="table-title icon-text"> <img src={towerLogo} className="icon" alt=''></img> First turrets</th>
                  <th>:</th>
                  <th className="table-value">{ Data[5] == null ? 
                      <SkeletonTheme color="#2A2E38" highlightColor="#181A21">

                          <Skeleton circle={false} height={30} width={100}/>
                      </SkeletonTheme> : Data[5] }</th>
                </tr>
              </table>
            </section>
          </section>
          </section>
        </section>
      </div>
    </div>
  );
}