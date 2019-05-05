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
                            const rows = value.users.length / 3;
                            console.log(rows);
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
    console.log(users);
    for(let i = 0; i < rows; i++)
    {
        let singleRow = [];
        for(let j = 0; j < columns; j++)
        {
            singleRow.push(<td><File username={users[count].username}></File></td>);
            count++;
        }
        table.push(<tbody><tr>{singleRow}</tr></tbody>);
    }
    return table;
}