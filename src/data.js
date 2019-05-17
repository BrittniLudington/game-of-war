import React from 'react';

export const Context = React.createContext({
    state : undefined
});

export default class dataProvider extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state={
            users: undefined,
            deleteUser: null,
            games: undefined,
            addUser: null
        }
        this.deleteUser = this.deleteUser.bind(this);
        this.addUser = this.addUser.bind(this);
    }

    deleteUser(username)
    {
        let array = this.state.users.filter(user => user.username != username);
        console.log(array);
        this.setState({users:array});
        fetch(`http://localhost:5000/user/${username}`,
        {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
        })
    }

    addUser(name)
    {
        const alreadyExists = this.state.users.find(function(entry)
        {
            return entry.username == name;
        });
        if(alreadyExists != undefined)
        {
            return;
        }
        let array = this.state.users;
        let gameArray = this.state.games;
        let gameids = array.map(entry => entry.gameid);
        /*            "username": "john",
            "date-made": "01/22/2001",
            "total-games": 2,
            "total-wins": 1,
            "win-lose": "50%",
            "gameid": null */
        const newId = Math.max(gameids) + 1;
        const currentTime = new Date();
        const newEntry =
        {
            username: name,
            "date-made": currentTime,
            "total-games": 0,
            "total-wins" : 0,
            "win-lose": "0%",
            gameid: null
        }
        const newGame = 
        {
            gameid: newId,
            'npc-score': 0,
            'player-score': 0,
            'round-num': 0
        }
        fetch('http://localhost:5000/files',//'https://game-of-war-server.herokuapp.com/files',
        {
            crossDomain: true,
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: name,
                date: currentTime
            })
        })
        gameArray.push(newGame);
        array.push(newEntry);
        this.setState({users:array, games:gameArray});

    }

    componentDidMount()
    {
       fetch('http://localhost:5000/files',//'https://game-of-war-server.herokuapp.com/files',
       {
           //crossDomain: true,
           headers: {'Content-Type':'application/json'}
       })
        .then(res => res.json())
        .then(results => this.setState({users: results}))
        
       fetch('http://localhost:5000/games',//'https://game-of-war-server.herokuapp.com/games',
       {
       // crossDomain: true,
        headers: {'Content-Type':'application/json'}
       })
       .then(res => res.json())
       .then(results => this.setState({games: results}))
        //const data = require('./temp.json');
        //this.setState({users:data.users});
        this.setState({deleteUser:this.deleteUser,addUser:this.addUser});
    }
    render()
    {
        return(
            <Context.Provider value={this.state}>
                {this.props.children}
            </Context.Provider>
        );
    }
}