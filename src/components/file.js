import React from 'react';
import './css/basic-style.css';
import {Link} from 'react-router-dom';
import { Context } from '../data';


export default function File(props)
{
    return(
        <Context.Consumer>
            {
                (value) =>
                {
                    console.log(value);
                    return(<div className="file">
                            <h3><Link to={"/user/"+props.username}>{props.username}</Link></h3>
                            <button onClick={e => (handleDelete(e,props.username, value.deleteUser))}>Delete</button>
                        </div>);
                }
            }

        </Context.Consumer>
    );
}

function handleDelete(e, user, callback)
{
    e.preventDefault();
    callback(user);
}