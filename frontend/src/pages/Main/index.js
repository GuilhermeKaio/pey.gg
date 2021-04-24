import React, { useState, useEffect} from 'react';
import { Link } from 'react-router-dom';

import api from '../../services/api';

import './styles.css';

import logoImg from '../../assets/logo.svg';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

export default function Main() {
  const [Winrate, setWinrate] = useState([]);
  const [Firstblood, setFirstblood] = useState([]);
  const [Logos, setLogos] = useState([]);
  const [WrColor, setWrColor] = useState([]);
  const [FbColor, setFbColor] = useState([]);
  
  const dataGet = async () => {
    try {
      var wr = [];
      var fb = [];
      var logos = [];
      var wrColor = [];
      var fbColor = [];
      await api
      .get('percentageArray?array=["Flamengo Esports","paiN Gaming","Vorax","Rensga Esports","INTZ","LOUD","FURIA Esports","RED Canids","KaBuM! e-Sports","Cruzeiro eSports"]')
      .then( res =>{
        wr = res.data.winrate;
        fb = res.data.firstblood;
        logos = res.data.logos;
      });
      
      wr.forEach((part, i, array) =>{
        wrColor.push((array[i] <= 50) ? "lower" : "high");
        array[i] += "%";
      })

      fb.forEach((part, i, array) =>{
        fbColor.push((array[i] <= 50) ? "lower" : "high");
        array[i] += "%";
      })

      setWinrate(wr);
      setWrColor(wrColor);
      setFirstblood(fb);
      setFbColor(fbColor);
      setLogos(logos);
    }
    catch (err) {
    }
  };


  useEffect(() => {
    dataGet();
  }, []);

  return (
    <div className="logon-container">
      <section className="form">
        <section className="logo">
          <img src={logoImg} alt="Pey.gg" className="noselect"/>
        </section>
      <section className="group-team noselect">
        <section className="row-team">
        <Link className="link" to="/team?name=Flamengo%20Esports">
          <section className="team">
            <section className="logo-team">
              { 
                Logos[0] == null ? 
              <SkeletonTheme color="#181A21" highlightColor="#2A2E38">
                  <Skeleton circle={true} height={100} width={100} className="loading"/>
              </SkeletonTheme> : <img src={Logos[0]} alt="Flamengo Esports"/>
              }
            </section>
            <section className="info">
              <p className="title">Flamengo Esports</p>
              <section className="stats">
                <section className={WrColor[0]}> 
                  <p className="noselect">Winrate</p>
                  { Winrate[0] == null ? 
                      <SkeletonTheme color="#181A21" highlightColor="#2A2E38">
                        <p>
                          <Skeleton circle={false} height={30} width={100}/>
                        </p>
                      </SkeletonTheme> : Winrate[0] }
                </section>
                <section className={FbColor[0]}> 
                  <p>First Blood</p>
                  { Firstblood[0] == null ? 
                      <SkeletonTheme color="#181A21" highlightColor="#2A2E38">
                        <p>
                          <Skeleton circle={false} height={30} width={100}/>
                        </p>
                      </SkeletonTheme> : Firstblood[0] }
                </section>
              </section>
            </section> 
          </section>
          </Link>
          <Link className="link" to="/team?name=paiN%20Gaming">
          <section className="team">
            <section className="logo-team">
            { 
                Logos[1] == null ? 
              <SkeletonTheme color="#181A21" highlightColor="#2A2E38">
                  <Skeleton circle={true} height={100} width={100} className="loading"/>
              </SkeletonTheme> : <img src={Logos[1]} alt="paiN Gaming"/>
              }
            </section>
            <section className="info">
              <p className="title">paiN Gaming</p>
              <section className="stats">
                <section className={WrColor[1]}> 
                  <p>Winrate</p>
                  { Winrate[1] == null ? 
                      <SkeletonTheme color="#181A21" highlightColor="#2A2E38">
                        <p>
                          <Skeleton circle={false} height={30} width={100}/>
                        </p>
                      </SkeletonTheme> : Winrate[1] }
                </section>
                <section className={FbColor[1]}> 
                  <p>First Blood</p>
                  { Firstblood[1] == null ? 
                      <SkeletonTheme color="#181A21" highlightColor="#2A2E38">
                        <p>
                          <Skeleton circle={false} height={30} width={100}/>
                        </p>
                      </SkeletonTheme> : Firstblood[1] }
                </section>
              </section>
            </section> 
          </section>
          </Link>
        </section>
        <section className="row-team">
          <Link className="link" to="/team?name=Vorax">
          <section className="team">
            <section className="logo-team">
            { 
              Logos[2] == null ? 
              <SkeletonTheme color="#181A21" highlightColor="#2A2E38">
                  <Skeleton circle={true} height={100} width={100} className="loading"/>
              </SkeletonTheme> : <img src={Logos[2]} alt="Vorax"/>
            }
            </section>
            <section className="info">
              <p className="title">Vorax</p>
              <section className="stats">
                <section className={WrColor[2]}> 
                  <p>Winrate</p>
                  { Winrate[2] == null ? 
                      <SkeletonTheme color="#181A21" highlightColor="#2A2E38">
                        <p>
                          <Skeleton circle={false} height={30} width={100}/>
                        </p>
                      </SkeletonTheme> : Winrate[2] }
                </section>
                <section className={FbColor[2]}> 
                  <p>First Blood</p>
                  { Firstblood[2] == null ? 
                      <SkeletonTheme color="#181A21" highlightColor="#2A2E38">
                        <p>
                          <Skeleton circle={false} height={30} width={100}/>
                        </p>
                      </SkeletonTheme> : Firstblood[2] }
                </section>
              </section>
            </section> 
          </section>
          </Link>
          <Link className="link" to="/team?name=Rensga%20Esports">
          <section className="team">
            <section className="logo-team">
            { 
              Logos[3] == null ? 
              <SkeletonTheme color="#181A21" highlightColor="#2A2E38">
                  <Skeleton circle={true} height={100} width={100} className="loading"/>
              </SkeletonTheme> : <img src={Logos[3]} alt="Rensga Esports"/>
            }
            </section>
            <section className="info">
              <p className="title">Rensga Esports</p>
              <section className="stats">
                <section className={WrColor[3]}> 
                  <p>Winrate</p>
                  { Winrate[3] == null ? 
                      <SkeletonTheme color="#181A21" highlightColor="#2A2E38">
                        <p>
                          <Skeleton circle={false} height={30} width={100}/>
                        </p>
                      </SkeletonTheme> : Winrate[3] }
                </section>
                <section className={FbColor[3]}> 
                  <p>First Blood</p>
                  { Firstblood[3] == null ? 
                      <SkeletonTheme color="#181A21" highlightColor="#2A2E38">
                        <p>
                          <Skeleton circle={false} height={30} width={100}/>
                        </p>
                      </SkeletonTheme> : Firstblood[3] }
                </section>
              </section>
            </section> 
          </section>
          </Link>
        </section>
        <section className="row-team">
          <Link className="link" to="/team?name=INTZ">
          <section className="team">
            <section className="logo-team">
            { 
              Logos[4] == null ? 
              <SkeletonTheme color="#181A21" highlightColor="#2A2E38">
                  <Skeleton circle={true} height={100} width={100} className="loading"/>
              </SkeletonTheme> : <img src={Logos[4]} alt="INTZ"/>
            }
            </section>
            <section className="info">
              <p className="title">INTZ</p>
              <section className="stats">
                <section className={WrColor[4]}> 
                  <p>Winrate</p>
                  { Winrate[4] == null ? 
                      <SkeletonTheme color="#181A21" highlightColor="#2A2E38">
                        <p>
                          <Skeleton circle={false} height={30} width={100}/>
                        </p>
                      </SkeletonTheme> : Winrate[4] }
                </section>
                <section className={FbColor[4]}> 
                  <p>First Blood</p>
                  { Firstblood[4] == null ? 
                      <SkeletonTheme color="#181A21" highlightColor="#2A2E38">
                        <p>
                          <Skeleton circle={false} height={30} width={100}/>
                        </p>
                      </SkeletonTheme> : Firstblood[4] }
                </section>
              </section>
            </section> 
          </section>
          </Link>
          <Link className="link" to="/team?name=LOUD">
          <section className="team">
            <section className="logo-team">
            { 
              Logos[5] == null ? 
              <SkeletonTheme color="#181A21" highlightColor="#2A2E38">
                  <Skeleton circle={true} height={100} width={100} className="loading"/>
              </SkeletonTheme> : <img src={Logos[5]} alt="LOUD"/>
            }
            </section>
            <section className="info">
              <p className="title">LOUD</p>
              <section className="stats">
                <section className={WrColor[5]}> 
                  <p>Winrate</p>
                  { Winrate[5] == null ? 
                      <SkeletonTheme color="#181A21" highlightColor="#2A2E38">
                        <p>
                          <Skeleton circle={false} height={30} width={100}/>
                        </p>
                      </SkeletonTheme> : Winrate[5] }
                </section>
                <section className={FbColor[5]}> 
                  <p>First Blood</p>
                  { Firstblood[5] == null ? 
                      <SkeletonTheme color="#181A21" highlightColor="#2A2E38">
                        <p>
                          <Skeleton circle={false} height={30} width={100}/>
                        </p>
                      </SkeletonTheme> : Firstblood[5] }
                </section>
              </section>
            </section> 
          </section>
          </Link>
        </section>
        <section className="row-team">
          <Link className="link" to="/team?name=FURIA%20Esports">
          <section className="team">
            <section className="logo-team">
            { 
              Logos[6] == null ? 
              <SkeletonTheme color="#181A21" highlightColor="#2A2E38">
                  <Skeleton circle={true} height={100} width={100} className="loading"/>
              </SkeletonTheme> : <img src={Logos[6]} alt="FURIA Esports"/>
            }
            </section>
            <section className="info">
              <p className="title">FURIA Esports</p>
              <section className="stats">
                <section className={WrColor[6]}> 
                  <p>Winrate</p>
                  { Winrate[6] == null ? 
                      <SkeletonTheme color="#181A21" highlightColor="#2A2E38">
                        <p>
                          <Skeleton circle={false} height={30} width={100}/>
                        </p>
                      </SkeletonTheme> : Winrate[6] }
                </section>
                <section className={FbColor[6]}> 
                  <p>First Blood</p>
                  { Firstblood[6] == null ? 
                      <SkeletonTheme color="#181A21" highlightColor="#2A2E38">
                        <p>
                          <Skeleton circle={false} height={30} width={100}/>
                        </p>
                      </SkeletonTheme> : Firstblood[6] }
                </section>
              </section>
            </section> 
          </section>
          </Link>
          <Link className="link" to="/team?name=RED%20Canids">
          <section className="team">
            <section className="logo-team">
            { 
              Logos[7] == null ? 
              <SkeletonTheme color="#181A21" highlightColor="#2A2E38">
                  <Skeleton circle={true} height={100} width={100} className="loading"/>
              </SkeletonTheme> : <img src={Logos[7]} alt="RED Canids"/>
            }
            </section>
            <section className="info">
              <p className="title">RED Canids</p>
              <section className="stats">
                <section className={WrColor[7]}> 
                  <p>Winrate</p>
                  { Winrate[7] == null ? 
                      <SkeletonTheme color="#181A21" highlightColor="#2A2E38">
                        <p>
                          <Skeleton circle={false} height={30} width={100}/>
                        </p>
                      </SkeletonTheme> : Winrate[7] }
                </section>
                <section className={FbColor[7]}> 
                  <p>First Blood</p>
                  { Firstblood[7] == null ? 
                      <SkeletonTheme color="#181A21" highlightColor="#2A2E38">
                        <p>
                          <Skeleton circle={false} height={30} width={100}/>
                        </p>
                      </SkeletonTheme> : Firstblood[7] }
                </section>
              </section>
            </section> 
          </section>
          </Link>
        </section>
        <section className="row-team">
          <Link className="link" to="/team?name=KaBuM!%20e-Sports">
          <section className="team">
            <section className="logo-team">
            { 
              Logos[8] == null ? 
              <SkeletonTheme color="#181A21" highlightColor="#2A2E38">
                  <Skeleton circle={true} height={100} width={100} className="loading"/>
              </SkeletonTheme> : <img src={Logos[8]} alt="KaBuM! e-Sports"/>
            }
            </section>
            <section className="info">
              <p className="title">KaBuM! e-Sports</p>
              <section className="stats">
                <section className={WrColor[8]}> 
                  <p>Winrate</p>
                  { Winrate[8] == null ? 
                      <SkeletonTheme color="#181A21" highlightColor="#2A2E38">
                        <p>
                          <Skeleton circle={false} height={30} width={100}/>
                        </p>
                      </SkeletonTheme> : Winrate[8] }
                </section>
                <section className={FbColor[8]}> 
                  <p>First Blood</p>
                  { Firstblood[8] == null ? 
                      <SkeletonTheme color="#181A21" highlightColor="#2A2E38">
                        <p>
                          <Skeleton circle={false} height={30} width={100}/>
                        </p>
                      </SkeletonTheme> : Firstblood[8] }
                </section>
              </section>
            </section> 
          </section>
          </Link>
          <Link className="link" to="/team?name=Cruzeiro%20eSports">
          <section className="team">
            <section className="logo-team">
            { 
              Logos[9] == null ? 
              <SkeletonTheme color="#181A21" highlightColor="#2A2E38">
                  <Skeleton circle={true} height={100} width={100} className="loading"/>
              </SkeletonTheme> : <img src={Logos[9]} alt="Cruzeiro eSports"/>
            }
            </section>
            <section className="info">
              <p className="title">Cruzeiro eSports</p>
              <section className="stats">
                <section className={WrColor[9]}> 
                  <p>Winrate</p>
                  { Winrate[9] == null ? 
                      <SkeletonTheme color="#181A21" highlightColor="#2A2E38">
                        <p>
                          <Skeleton circle={false} height={30} width={100}/>
                        </p>
                      </SkeletonTheme> : Winrate[9] }
                </section>
                <section className={FbColor[9]}> 
                  <p>First Blood</p>
                  { Firstblood[9] == null ? 
                      <SkeletonTheme color="#181A21" highlightColor="#2A2E38">
                        <p>
                          <Skeleton circle={false} height={30} width={100}/>
                        </p>
                      </SkeletonTheme> : Firstblood[9] }
                </section>
              </section>
            </section> 
          </section>
          </Link>
        </section> 
      </section>
      </section>
    </div>
  );
}