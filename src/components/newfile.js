import React from 'react';
import { Context } from '../data';
import {withRouter} from 'react-router-dom';

export default function NewFile(props)
{
    let handleSubmit = function(e, callback,props)
    {
        e.preventDefault();
        callback(document.getElementById('username').value);
        props.history.push('/');
    }
    return(
    <Context.Consumer>
        {
            (value) =>
            {
                return(<section aria-label="make a new file">
                        <h1>New Game</h1>
                        <form id="newFileForm" aria-label="fill out username here" onSubmit={(e) =>handleSubmit(e,value.addUser,props)}>
                            <label>
                                Name:
                                <input type="text" id="username" name="username"/>
                            </label>
                            <input type="submit" value="submit"/>
                        </form>
                    </section>
                    )
            }
        }
    </Context.Consumer>
    );


}

