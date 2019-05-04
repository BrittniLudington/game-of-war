import React from 'react';
import './css/basic-style.css';
export default function instructions()
{
    return(
        <section aria-label="instructions">
            <h1>How To Play</h1>

            <p>This is a simplified version of the classic card game WAR</p>
            <h2>To Start</h2>
            <p>Each game will start with a pack of 52 cards</p>
            <ul>
                <li>Each card has a number from 1 to 10</li>
                <li>The deck will be randomized and then cut in half</li>
                <li>Both players will receive each half of the deck</li>
                <li>Both players will take five cards from the top of their halves</li>
            </ul>

            <h2>Playing</h2>
            <ul>
                <li>Players will choose a card out of their hands to use each round</li>
                <li>The player with the highest card that round receives a point</li>
                <li>If both cards are the same level, no one receives a point</li>
                <li>Players dispose of the cards they just used</li>
                <li>Players then take a new card from the deck to replace the card just used</li>
                <li>Players then play another round</li>
            </ul>

            <h2>To Win</h2>
            <ul>
                <li>Players will continue playing rounds until no more cards are available</li>
                <li>Whoever has the most points officially wins the game</li>
            </ul>
        </section>
    );
}