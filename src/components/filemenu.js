import React,{ Component } from 'react';
import "./css/basic-style.css";
import File from './file';

export default class FileMenu extends Component
{
    state= 
    {
        users: [],
        deleteUser: function(){}
    }
    constructor()
    {
        super();
        this.deleteUser = this.deleteUser.bind(this);
    }
    componentDidMount()
    {
        fetch('https://game-of-war-server.herokuapp.com/files',//'https://game-of-war-server.herokuapp.com/files',
        {
            //crossDomain: true,
            headers: {'Content-Type':'application/json'}
        })
         .then(res => res.json())
         .then(results => this.setState({users:results, deleteUser:this.deleteUser}));
         
    }
    render()
    {
        let rows = this.state.users.length / 3;
        if (rows < 1) rows = 1;
        const table = createTable(this.state.users,rows, this.deleteUser);
        return (<section aria-label="filemenu" className="gray">
                    <header className="center" aria-label="title">
                        <h1>Choose your file below</h1>
                        <p>Note: Both "load file" and "delete file" will go to this wireframe, but the purpose will be different</p>
                    </header>
                    <table className="center center-margin" aria-label="files">
                    {table}
                    </table>
                </section>);
                        //}
                        

        
    }

    deleteUser(username)
{
    let array = this.state.users.filter(user => user.username != username);
    this.setState({users:array});
    fetch(`https://game-of-war-server.herokuapp.com/user/${username}`,
    {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
    })
}

}

function createTable(users,rows, deleteFunction)
{
    const columns = 3;
    let count = 0;
    let table = [];
    for(let i = 0; i < rows; i++)
    {
        let singleRow = [];
        for(let j = 0; j < columns; j++)
        {
            if(count > users.length-1) break;
            singleRow.push(<td key={users[count].username}><File deleteUser={deleteFunction} user={users[count]} username={users[count].username}></File></td>);
            count++;
        }
        table.push(<tbody key={i}><tr>{singleRow}</tr></tbody>);
    }
    return table;
}


