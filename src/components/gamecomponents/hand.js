import React, {Component} from 'react';
import "../css/basic-style.css";
import {Context} from './currentGameData';


export default class Hand extends Component
{
    constructor()
    {
        super();
        this.state=
        {
            "cards" : [0,0,0,0,0],
            finishedRemoving: true,
            selectedACard : false,
            type: undefined
        };

        this.selectCard = this.selectCard.bind(this);
        this.npcSelectCard = this.npcSelectCard.bind(this);
     //   this.deleteCard = this.deleteCard.bind(this);
    }

    componentDidMount()
    {
        this.setState({type:this.props.type});
    }


    render()
    {
        return(
        <Context.Consumer>
            {
                (value) =>
                {
                    if(value.currentDeck !== undefined && value.playerHand.length !== 0 && value.npcHand.length !== 0 && this.state.type !== undefined)
                    {
                        this.getHand(value.currentDeck,value.removeCard, this.props.toRemove, this.props.card,this.props.hand,value.setHand);
                        if(this.props.type === "npc")
                        {
                            this.npcSelectCard(value.npcCard,this.props.setCard,value.round, value.npcHand);
                            return (
                                <section>
                                    <h2>ENEMY SCORE: {value.npcScore}</h2>
                                </section>
                            )
                        }
                        return (
                            <section>
                                <h2>YOUR SCORE: {value.playerScore}</h2>
                                <p>Select your card</p>
                                <table className="center-margin card-table">
                                <tbody>
                                        <tr>
                                            {this.renderHand(value.playerHand,this.props.setCard, this.props.card)}
                                  
                                        </tr>
                                        </tbody>
                                    </table>
                            </section>
                        );
                    }
                    
                }

            }
        </Context.Consumer>
        );
    }

    getHand(deck,callback, toRemove, selected,handImport,setHand)
    {
        let hand = handImport;
        if(toRemove)
        {
            hand[selected[0]] = 0;
            //setCard(-1,0);
            setHand(this.state.type,hand);
        }
        if(hand.includes(0) && deck.length !== 0)
        {
            for(let i = 0; i < hand.length; i++)
            {
                if(hand[i] === 0 && deck.length !== 0)
                {
                    hand[i] = deck.pop();
                // console.log(deck);
                }

            }
            callback(deck);
           // console.log(this.state.type, hand);
            setHand(this.state.type,hand);
            this.setState({cards:hand});
        }
    }

    renderHand(playerHand,callback, selectedCard, cards)
    {
        let table = [];
        for(let i = 0; i < playerHand.length; i++)
        {
            if(i === selectedCard[0])
                table.push(<td key={i} className="player-deck card card-color-selected" onClick={(e)=>this.selectCard(i,e,callback,playerHand[i])}>{playerHand[i]}</td>);
            else
                table.push(<td key={i} className="player-deck card card-color" onClick={(e)=>this.selectCard(i,e,callback,playerHand[i])}>{playerHand[i]}</td>);
        }
        return table;
    }

    selectCard(index,e,callback,valueOfCard)
    {
        e.preventDefault();
        if(valueOfCard !== 0)
            callback(index);
    }

    npcSelectCard(selected,callback, round, npcHand)
    {
        if(selected[0] !== -1) // already picked a card
            return;
        let num = Math.floor(Math.random() * 5);
        while(npcHand[num] === 0 && round !== 15)
        {
            num = Math.floor(Math.random() * 5);
        }
        callback(num);
    }

}