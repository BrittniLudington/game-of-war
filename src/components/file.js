import React from 'react';
import './css/basic-style.css';
import {Link} from 'react-router-dom';

export default function File(props)
{
    return(
        <div className="file">
            <h3><Link to={"/user/"+props.username}>{props.username}</Link></h3>
        </div>
    );
}