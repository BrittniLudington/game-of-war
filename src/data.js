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
            games: undefined
        }
        this.deleteUser = this.deleteUser.bind(this);
    }

    deleteUser(username)
    {
        let array = this.state.users.filter(user => user.username != username);
        console.log(array);
        this.setState({users:array});
    }
    componentDidMount()
    {
       /* fetch('../temp.json')
        .then(res => res.json())
        .then(results => this.setState({users: results}))
        */
        const data = require('./temp.json');
        this.setState({users:data.users});
        this.setState({deleteUser:this.deleteUser});
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