import React from 'react';
import './css/basic-style.css';
export default function LandingPage()
{
    return (
        <header className = "center landingpage" aria-label="main title">
            <h1 id="title">A Game of War</h1>
            <p className="defaultCursor">A digital game of War with a functional save feature</p>
        </header>
    );
}