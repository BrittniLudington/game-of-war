import React, {Component} from 'react';
import './css/basic-style.css';
import Hand from './gamecomponents/hand.js';
import createDeck from './gamecomponents/deck.js';
export default class GameMenu extends Component
{
    constructor()
    {
        super();
        this.state=
        {
            deck : createDeck(),
            playerCard: 0,
            npcCard: 0,
            pScore: 0,
            nScore: 0,
            playersReady: 2,
        };
        this.removeCards = this.removeCards.bind(this);
        this.selectedCard = this.selectedCard.bind(this);
        this.playRound = this.playRound.bind(this);
        this.startRound = this.startRound.bind(this);
    }

    removeCards(newDeck)
    {
        this.setState({deck:newDeck});
    }

    selectedCard(card, player)
    {
        if(player =="player")
        {
            this.setState({playerCard:card});
        }
        if(player =="npc")
        {
            this.setState({npcCard:card});
        }
    }

    startRound()
    {
        this.setState({playersReady: this.state.playersReady+1}, () =>
        {
            if(this.state.playersReady >= 2)
                this.setState({newRound: false});
        })
    }
    render()
    {
        let p = this.state.playerCard, n = this.state.npcCard;
        if(p == 0)
            p = "Player's card";
        if(n == 0)
            n = "Enemy's card";
        return(
            <section aria-label="game display">
            <section className="player" aria-label="enemy">
            <p>Enemy's cards. Player will not see which cards they are. This is only for show.</p>
           <Hand type="npc" card={this.state.npcCard} startRound={this.startRound} playersReady={this.state.playersReady} score={this.state.nScore} removeCards={this.removeCards} selectedCard={this.selectedCard} deck={this.state.deck}></Hand>
        </section>
        <section className="gray" aria-label="attack area">
            <p>After choosing a card, player's and enemy's card will display here to compare.</p>
            <div className="center-margin small center">
                    <button onClick={this.playRound}>Accept</button>
                    <div className = "card inline">
                        {n}
                    </div>
                    <div className = "card inline">
                        {p}
                    </div>     
                    <div id="deck">
                            {this.state.deck.length}
                        </div>           
                </div>

        </section>
        <section className="player gray" aria-label="user">
            <p>Player's cards. Select a card to use in battle. Each card will hold an image representing that card</p>
            <Hand type="player" card={this.state.playerCard} startRound={this.startRound} playersReady={this.state.playersReady} score={this.state.pScore} removeCards={this.removeCards} selectedCard={this.selectedCard} deck={this.state.deck}></Hand>
        </section>

            </section>
        )
    }

    playRound()
    {
        let p = this.state.playerCard;
        let n = this.state.npcCard;
        if(p > n)
        {
            console.log("Player wins a point!");
            this.setState({pScore: this.state.pScore+1});
        }
        if(n > p)
        {
            console.log("Enemy wins a point!");
            this.setState({nScore: this.state.nScore+1});

        }
        if(n == p)
        {
            console.log("TIE!");
        }
        this.setState({ playersReady: 0});
    }
}