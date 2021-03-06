import React, {Component} from 'react';
import './css/basic-style.css';
import './css/filebar.css';
import Hand from './gamecomponents/hand.js';
import DataProvider, {Context} from './gamecomponents/currentGameData';
import {Link} from 'react-router-dom';

export default class GameMenu extends Component
{
    constructor()
    {
        super();
        this.state=
        {
            deck : null,
                };
        this.playRound = this.playRound.bind(this);
        this.startRound = this.startRound.bind(this);
    }


    startRound(callback,e)
    {
        e.preventDefault();
        callback();
    }
    render()
    {
        let p = this.state.playerCard, n = this.state.npcCard;
        if(p === 0)
            p = "Player's card";
        if(n === 0)
            n = "Enemy's card";
        return(
            <DataProvider>
            <Context.Consumer>
                {
                    (value) =>
                    {
                        return(<Link className = "entry" to ={`/user/${value.username}`}>Return</Link>
                        );
                    }
                }
            </Context.Consumer>
            <section aria-label="game display">
            <section className="player" aria-label="enemy">
            <Context.Consumer>
                {
                    (value) =>
                    {
                        if(value.currentDeck !== undefined && value.npcHand.length !== 0)
                            return(<Hand hand={value.npcHand} name={this.state.username} type="npc" empty={value.handEmpty[0]} toRemove={value.removeNpcCard} setCard={value.setNpcCard} card={value.npcCard}></Hand>);
                    }
                }
            </Context.Consumer>
        </section>
        <section className="gray" aria-label="attack area">
            <div className="center-margin small center">
                    <Context.Consumer>
                        {
                            (value) =>
                            {
                                let length = "loading";
                                if(value.currentDeck !== undefined)
                                    length = value.currentDeck.length;
                                if(value.gameIsOver)
                                {
                                        return(<section aria-label="round result screen">
                                        <button onClick={e => this.startRound(value.startGame,e)}>Play Again?</button>
         
                                         <div className = "card inline">
                                         <h4>Enemy</h4>
                                         {value.selectedCards[1]}
                                         </div>
                                         <div className = "card inline">
                                         <h4>Player</h4>
                                         {value.playerCard[1]}
                                         </div>
                                         <h2>{value.winMessage}</h2>
                                         </section>);
                                }
                                else if(!value.showWinPopup)
                                {
                                    return(<section aria-label="chosen cards"> 
                                    <h3>Round {value.round}</h3>
                                    <button disabled={value.playerCard[0]===-1} onClick={e => this.playRound(value.findWinner,e)}>Accept</button>
    
                                    <div className = "card inline">
                                    <h4>Enemy</h4>
                                        <p>???</p>
                                    </div>
                                    <div className = "card inline">
                                    <h4>Player</h4>
                                        <p>{value.selectedCards[0]}</p>
                                    </div>
                                    <div id="deck">
                                    <p id="deckstatement">Cards left in deck: {length}</p>
                        </div>    
                                </section>);
                                }
                               
                                else
                                {
                                    return(<section aria-label="round result screen">
                                   <button onClick={e => this.startRound(value.start,e)}>Continue</button>
    
                                    <div className = "card inline">
                                    <h4>Enemy</h4>
                                    {value.npcCard[1]}
                                    </div>
                                    <div className = "card inline">
                                    <h4>Player</h4>
                                    {value.playerCard[1]}
                                    </div>
                                    <h2>{value.winMessage}</h2>
                                    </section>);
                                }
                                
                            }
                        }
                    </Context.Consumer>
                    
       
                </div>

        </section>
        <section className="player gray" aria-label="user">
            <Context.Consumer>
                {
                    (value) =>
                    {
                        if(value.currentDeck !== undefined && value.playerHand.length !== 0)
                            return(<Hand hand={value.playerHand} name={this.state.username} type="player" empty={value.handEmpty[1]} toRemove={value.removePlayerCard} setCard={value.setPlayerCard} card={value.playerCard}></Hand>
                        );
                    }
                }
            </Context.Consumer>
        </section>
        </section>
        </DataProvider>
        )
    }

    playRound(callback,e)
    {
        e.preventDefault();
        callback();
    }
}