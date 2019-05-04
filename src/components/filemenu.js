import React,{ Component } from 'react';
import "./css/basic-style.css";
import {Link} from 'react-router-dom';
import File from './file';

export default class FileMenu extends Component
{
    render()
    {
        return(
            <section aria-label="filemenu" className="gray">
                <header className="center" aria-label="title">
                    <h1>Choose your file below</h1>
                    <p>Note: Both "load file" and "delete file" will go to this wireframe, but the purpose will be different</p>
                </header>
                <table className="center center-margin" aria-label="files">
                <tbody>
            <tr>
                <td>
                    <File username="USER ONE"/>
                </td>
                <td>
                    <File username="USER TWO"/>
                </td>
                <td>
                    <File username="USER THREE"/>
                </td>
            </tr>
            <tr>
                    <td>
                        <File username="USER FOUR"/>
                    </td>
                    <td>
                        <File username="USER FIVE"/>
                    </td>
                    <td>
                        <File username="USER SIX"/>
                    </td>
                </tr>
                </tbody>
        </table>
            </section>
        );
    }
}