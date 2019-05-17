import React, {Component} from 'react';
import './css/basic-style.css';
import {Link} from 'react-router-dom';

export default class UserMenu extends Component
{
    state = {
        user: null,
        game: null,
        deckData: null,
    };
    constructor()
    {
        super();

    }
    componentWillMount()
    {
        let {user, game} = this.props.location.state;
        fetch(`http://localhost:5000/deck/${user.username}`,
        {
            headers: {'Content-Type':'application/json'}
        })
        .then(res => res.json())
        .then(result => this.setState(() =>({deckData:result})))
        
        this.setState(()=>({user,game}));
    }
    render()
    {
        console.log(this.state.deckData);
        return(
            <section aria-label="user menu">
            <header className="center" aria-label = "title">
                <h1>{this.state.user.username}</h1>
                <p>This page will show the player's current stats, and allow them to either continue playing their current battle or start a new one</p>
            </header>
            <section className=" center gray" aria-label="stats">
            <ul className = "statList">
                <li>Number of games won: {this.state.user['total-wins']}</li>
                <li>Number of games played: {this.state.user['total-games']}</li>
                <li>Win rate: {this.state.user['win-lose']}</li>
            </ul>
        </section>
        <section className="center gray" aria-label="current stats">
        <ul className = "statList">
        <h2>Current Game</h2>
            <li>Round: {this.state.game['round-num']}</li>
            <li>Player Score: {this.state.game[`player-score`]}</li>
            <li>Enemy Score: {this.state.game['npc-score']}</li>
        </ul>
        </section>
        <section aria-label="button directory">
            <ul id="gameButtons">
                <li><Link to={{pathname:'/gamemenu-temp',gameid:this.state.user.gameid, deck:this.state.deckData}}>Continue/Begin Game</Link></li>
                <li><Link to="/">Return to Menu</Link></li>
            </ul>
        </section>
        </section>
        );
    }
}