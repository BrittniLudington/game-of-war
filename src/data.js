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
            users: undefined
        }
    }
    componentDidMount()
    {
       /* fetch('../temp.json')
        .then(res => res.json())
        .then(results => this.setState({users: results}))
        */
        const data = require('./temp.json');
        this.setState({users:data.users});
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