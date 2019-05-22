import React from 'react';
import './css/basic-style.css';
import {Link} from 'react-router-dom';


export default function File(props)
{
    return(<div className="file">
            <h3><Link to={{pathname:"/user/"+props.username, state:{user:props.user,game:props.game}}}>{props.username}</Link></h3>
                <button onClick={e => (handleDelete(e,props.username, props.deleteUser))}>Delete</button>
                </div>

    );
}

function handleDelete(e, user, callback)
{
    e.preventDefault();
    callback(user);
}

