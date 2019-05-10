import React, {Component} from 'react';
import "../css/basic-style.css";

export default class Hand extends Component
{
    constructor()
    {
        super();
        this.state=
        {
            "cards" : [0,0,0,0,0],
        };

        this.selectCard = this.selectCard.bind(this);
        this.toggle = this.toggle.bind(this);
     //   this.deleteCard = this.deleteCard.bind(this);
    }


    /*deleteCard(toDelete)
    {
        let nCards = this.state.cards;
        //nCards[this.state.selectedHand] = 0;
        let index = nCards.findIndex((entry) => {return entry == toDelete;});
        console.log(toDelete,index,nCards);
        nCards[index] = 0;
        this.setState({cards:nCards, selectedHand: -1});
    }
    */


    render()
    {

        this.getHand(this.props.deck,this.props.removeCards);

            return (
                <section>
                    <h2>SCORE: {this.props.score}</h2>
                    <table className="center-margin card-table">
                    <tbody>
                            <tr>
                                {this.renderHand(this.props.setCard, this.props.card)}
                      
                            </tr>
                            </tbody>
                        </table>
                </section>
            );
    }

    getHand(deck,callback)
    {
        let hand = this.state.cards;
        if(hand.includes(0))
        {
            for(let i = 0; i < hand.length; i++)
            {
                if(hand[i] == 0 && deck.length != 0)
                {
                    console.log(hand[i], deck[deck.length-1]);
                    hand[i] = deck.pop();
                }
            }
            callback(deck);
        }

    }

    renderHand(callback, selectedCard)
    {
        let table = [];
        for(let i = 0; i < this.state.cards.length; i++)
        {
            if(i == selectedCard[0])
                table.push(<td key={i} className="player-deck card card-color-selected" onClick={(e)=>this.selectCard(i,e,callback)}>{this.state.cards[i]}</td>);
            else
                table.push(<td key={i} className="player-deck card card-color" onClick={(e)=>this.selectCard(i,e,callback)}>{this.state.cards[i]}</td>);
        }
        return table;
    }

    selectCard(index,e,callback)
    {
        e.preventDefault();
        this.toggle(index,callback);
    }

    toggle(index, callback)
    {
            callback(index, this.state.cards[index]);
    }
}