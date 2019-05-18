import React, {Component} from 'react';
import './css/basic-style.css';
import Hand from './gamecomponents/hand.js';
import createDeck from './gamecomponents/deck.js';
import DataProvider, {Context} from './gamecomponents/currentGameData';
export default class GameMenu extends Component
{
    constructor()
    {
        super();
        this.state=
        {
            deck : null,

                };
        this.removeCards = this.removeCards.bind(this);
        this.playRound = this.playRound.bind(this);
        this.startRound = this.startRound.bind(this);
    }

    componentWillMount()
    {
      //  console.log(this.props);
      //  console.log(this.props.history.location.deck);
      //      this.setState({deck: createDeck(this.props.history.location.deck)});
            

    }

    removeCards(newDeck)
    {
        this.setState({deck:newDeck});
    }

    startRound(callback,e)
    {
        e.preventDefault();
        callback();
    }
    render()
    {
        let p = this.state.playerCard, n = this.state.npcCard;
        if(p == 0)
            p = "Player's card";
        if(n == 0)
            n = "Enemy's card";
        return(
            <DataProvider>
            <section aria-label="game display">
            <section className="player" aria-label="enemy">
            <Context.Consumer>
                {
                    (value) =>
                    {
                        if(value.currentDeck != undefined)
                            return(<Hand round={value.round} type="npc" empty={value.handEmpty[0]} toRemove={value.removeNpcCard} setCard={value.setNpcCard} card={value.npcCard} score={value.npcScore} removeCards={this.removeCards}  deck={value.currentDeck}></Hand>);
                    }
                }
            </Context.Consumer>
        </section>
        <section className="gray" aria-label="attack area">
            <p>After choosing a card, player's and enemy's card will display here to compare.</p>
            <div className="center-margin small center">
                    <Context.Consumer>
                        {
                            (value) =>
                            {
                                let length = "loading";
                                if(value.currentDeck != undefined)
                                    length = value.currentDeck.length;
                                if(!value.showWinPopup)
                                {
                                    return(<section aria-label="chosen cards"> 
                                    <h3>Round {value.round}</h3>
                                    <button disabled={value.playerCard[0]==-1} onClick={e => this.playRound(value.findWinner,e)}>Accept</button>
    
                                    <div className = "card inline">
                                    <h4>Enemy</h4>
                                        ???
                                    </div>
                                    <div className = "card inline">
                                    <h4>Player</h4>
                                        {value.playerCard[1]}
                                    </div>
                                    <div id="deck">
                                    {length}
                        </div>    
                                </section>);
                                }
                                else if(value.gameIsOver)
                                {
                                    return(<section aria-label="round result screen">
                                    <button onClick={e => this.startRound(value.startGame,e)}>Play Again?</button>
     
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
            <p>Player's cards. Select a card to use in battle. Each card will hold an image representing that card</p>
            <Context.Consumer>
                {
                    (value) =>
                    {
                        if(value.currentDeck != undefined)
                            return(<Hand round={value.round} type="player" empty={value.handEmpty[1]} toRemove={value.removePlayerCard} setCard={value.setPlayerCard} card={value.playerCard} score={value.playerScore} removeCards={this.removeCards}  deck={value.currentDeck}></Hand>
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