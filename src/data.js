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
    }

    addUser(name)
    {
        let array = this.state.users;
        /*            "username": "john",
            "date-made": "01/22/2001",
            "total-games": 2,
            "total-wins": 1,
            "win-lose": "50%",
            "gameid": null */
        const currentTime = new Date();
        const newEntry =
        {
            username: name,
            "date-made": currentTime.getDate(),
            "total-games": 0,
            "total-wins" : 0,
            "win-lose": "0%",
            gameid: null
        }
        array.push(newEntry);
        this.setState({users:array});
    }

    componentDidMount()
    {
       fetch('https://game-of-war-server.herokuapp.com/files')
        .then(res => res.json())
        .then(results => this.setState({users: results}))
        
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