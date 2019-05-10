import React,{ Component } from 'react';
import "./css/basic-style.css";
import File from './file';
import { Context } from '../data';

export default class FileMenu extends Component
{
    render()
    {
        return(
            <Context.Consumer>
                {
                    (value) =>
                    {
                        if(value.users != undefined)
                        {
                            let rows = value.users.length / 3;
                            if (rows < 1) rows = 1;
                            const table = createTable(value.users,rows);
                            return (
                                <section aria-label="filemenu" className="gray">
                    <header className="center" aria-label="title">
                        <h1>Choose your file below</h1>
                        <p>Note: Both "load file" and "delete file" will go to this wireframe, but the purpose will be different</p>
                    </header>
                    <table className="center center-margin" aria-label="files">
                    {table}
            </table>
                </section>
                            );
                        }
                        
                    }
                    
                }
            </Context.Consumer>
        );
    }
}

function createTable(users,rows)
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
            singleRow.push(<td key={users[count].username}><File username={users[count].username}></File></td>);
            count++;
        }
        table.push(<tbody key={i}><tr>{singleRow}</tr></tbody>);
    }
    return table;
}