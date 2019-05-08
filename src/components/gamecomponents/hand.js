import React, {Component} from 'react';
import "../css/basic-style.css";

export default class Hand extends Component
{
    constructor()
    {
        super();
        this.state=
        {
            "score": 0,
            "cards" : [0,0,0,0,0],
            "selectedHand": -1
        };

        this.selectCard = this.selectCard.bind(this);
        this.toggle = this.toggle.bind(this);
        this.deleteCard = this.deleteCard.bind(this);
    }

    toggle(index, callback, type)
    {
        this.setState({"selectedHand":index},() =>
        {
            callback(this.state.cards[this.state.selectedHand],type);
        });
    }
    deleteCard(toDelete)
    {
        let nCards = this.state.cards;
        //nCards[this.state.selectedHand] = 0;
        let index = nCards.findIndex((entry) => {return entry == toDelete;});
        console.log(toDelete,index,nCards);
        nCards[index] = 0;
        this.setState({cards:nCards, selectedHand: -1});
    }

    componentDidUpdate(prevProps, prevState)
    {
        if(prevProps.playersReady < 2)
        {
            console.log("playersReady: "+prevProps.playersReady);
            this.deleteCard(prevProps.card);
            prevProps.startRound();
        }
    }
    render()
    {

        this.getHand(this.props.deck,this.props.removeCards);
        if(this.props.type == "player")
        {
            return (
                <section>
                    <h2>SCORE: {this.props.score}</h2>
                    <table className="center-margin card-table">
                    <tbody>
                            <tr>
                                {this.renderHand(this.props.selectedCard, this.props.type)}
                      
                            </tr>
                            </tbody>
                        </table>
                </section>
            );
        }
        else
        {
            return (
                <section>
                    <h2>SCORE: {this.props.score}</h2>
                    <table className="center-margin card-table">
                    <tbody>
                            <tr>
                                {this.renderHand(this.props.selectedCard, this.props.type)}
                      
                            </tr>
                            </tbody>
                        </table>
                </section>
            );
        }

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

    renderHand(callback, type)
    {
        let table = [];
        for(let i = 0; i < this.state.cards.length; i++)
        {
            if(i == this.state.selectedHand)
                table.push(<td key={i} className="player-deck card card-color-selected" onClick={(e)=>this.selectCard(i,e,callback, type)}>{this.state.cards[i]}</td>);
            else
                table.push(<td key={i} className="player-deck card card-color" onClick={(e)=>this.selectCard(i,e,callback, type)}>{this.state.cards[i]}</td>);
        }
        return table;
    }

    selectCard(index,e,callback, type)
    {
        e.preventDefault();
        this.toggle(index,callback,type);
    }
}