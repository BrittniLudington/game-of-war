import React from 'react';
import './css/basic-style.css';
import {Link} from 'react-router-dom';

export default function LandingPage()
{
    return (
        <header className = "center landingpage" aria-label="main title">
            <Link to = {"/menu"}><h1 id="title">A Game of War</h1></Link>
            <p className="defaultCursor">A digital game of War with a functional save feature</p>
        </header>
    );
}