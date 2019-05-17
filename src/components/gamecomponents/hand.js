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
            finishedRemoving: true
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

        this.getHand(this.props.deck,this.props.removeCards, this.props.toRemove, this.props.card, this.props.setCard);

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

    getHand(deck,callback, toRemove, selected, setCard)
    {
        let hand = this.state.cards;
        if(toRemove)
        {
            hand[selected[0]] = 0;
            setCard(-1,0);
        }
        console.log(deck.length);
        if(hand.includes(0) && deck.length != 0)
        {
            for(let i = 0; i < hand.length; i++)
            {
                if(hand[i] == 0 && deck.length != 0)
                {
                    hand[i] = deck.pop();
                }

            }
            callback(deck);
            this.setState({cards:hand});
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