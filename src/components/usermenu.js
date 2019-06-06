import React, {Component} from 'react';
import './css/basic-style.css';
import {Link} from 'react-router-dom';

export default class UserMenu extends Component
{
    state = {
        user: {
            username: "",
            'total-wins': "",
            'total-games': "",
            'win-lose': ""
        },
        game: {
            'round-num':"",
            'player-score': "",
            'npc-score': ""
        }
    };
    constructor()
    {
        super();

    }
    componentDidMount()
    {
        let dummyUser = this.state.user;
        let user = this.props.match.params.username;


        Promise.all([
            fetch(`https://game-of-war-server.herokuapp.com/files/${user}`,
            {
                headers: {'Content-Type':'application/json'}
            }),
            fetch(`https://game-of-war-server.herokuapp.com/games/${user}`,
            {
                headers: {'Content-Type':'application/json'}
            })
        ]).then(([fileRes,gameRes]) =>
        {
            fileRes.json().then(result =>
                {
                    console.log(result);
                    dummyUser['total-games'] = result[0]['total-games'];
                    dummyUser['total-wins'] = result[0]['total-wins'];
                    dummyUser['win-lose'] = result[0]['win-lose'];
                    dummyUser.username = user;

                    this.setState({user:dummyUser});
                })
            gameRes.json().then(result =>
                {
                    this.setState({game:result})
                })
        })
        /*fetch(`https://game-of-war-server.herokuapp.com/files/${user}`,
        {
            headers: {'Content-Type':'application/json'}
        })
        .then(res => res.json())
        .then(result => 
            {
                dummyUser['total-games'] = result[0]['total-games'];
                dummyUser['total-wins'] = result[0]['total-wins'];
                dummyUser['win-lose'] = result[0]['win-lose'];
                dummyUser.username = user;

                this.setState({user:dummyUser});
            });
        fetch(`https://game-of-war-server.herokuapp.com/games/${user}`,
        {
            headers: {'Content-Type':'application/json'}
        })
        .then(res => res.json())
        .then(result => this.setState({game:result}));
        */
    }
    render()
    {
        return(
            <section aria-label="user menu">
            <header className="center" aria-label = "title">
                <h1 className="font">{this.state.user.username}</h1>
            </header>
            <section className=" center whitebox" aria-label="stats">
            <ul className = "statList">
                <li>Number of games won: {this.state.user['total-wins']}</li>
                <li>Number of games played: {this.state.user['total-games']}</li>
                <li>Win rate: {this.state.user['win-lose']}</li>
            </ul>
        </section>
        <section className="center whitebox" aria-label="current stats">
        <ul className = "statList">
        <h2>Current Game</h2>
            <li>Round: {this.state.game['round-num']}</li>
            <li>Player Score: {this.state.game[`player-score`]}</li>
            <li>Enemy Score: {this.state.game['npc-score']}</li>
        </ul>
        </section>
        <section aria-label="button directory">
            <ul id="gameButtons">
                <li><Link to={{pathname:`/gamemenu/${this.state.user.username}`}}>Continue/Begin Game</Link></li>
                <li><Link to="/">Return to Menu</Link></li>
            </ul>
        </section>
        </section>
        );
    }
}