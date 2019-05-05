import React from 'react';

export default function NewFile()
{
    return(<section aria-label="make a new file">
    <h1>New Game</h1>
    <form id="newFileForm" aria-label="fill out username here">
    <label>
        Name:
        <input type="text" name="username"/>
    </label>
    <input type="submit" value="submit"/>
    </form>
    </section>);
}