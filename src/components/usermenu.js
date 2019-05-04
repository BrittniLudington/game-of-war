import React, {Component} from 'react';
import './css/basic-style.css';
import {Link} from 'react-router-dom';

export default class UserMenu extends Component
{
    state = {
        user: null,
    };
    constructor()
    {
        super();
        let gameid = 0; // temporary
    }
    componentDidMount()
    {
        let user = this.props.match.params.username;
        this.setState(()=>({user}));
    }
    render()
    {
        return(
            <section aria-label="user menu">
            <header className="center" aria-label = "title">
                <h1>{this.state.user}</h1>
                <p>This page will show the player's current stats, and allow them to either continue playing their current battle or start a new one</p>
            </header>
            <section className=" center gray" aria-label="stats">
            <ul id = "statList">
                <li>Number of games won: </li>
                <li>Number of games played: </li>
                <li>Win rate: </li>
                <li>Average card power: </li>
            </ul>
        </section>
        <section aria-label="button directory">
                <Link to='/gamemenu-temp'>Continue/Begin Game</Link>
                <Link to="/">Return to Menu</Link>
        </section>
        </section>
        );
    }
}