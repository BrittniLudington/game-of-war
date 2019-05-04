import React, {Component} from 'react';
import './css/basic-style.css';
export default class GameMenu extends Component
{
    render()
    {
        return(
            <section aria-label="game display">
            <section className="player" aria-label="enemy">
            <p>Enemy's cards. Player will not see which cards they are. This is only for show.</p>
            <h2>SCORE: </h2>
            <table className="center-margin">
                <tbody>
                <tr>
                    <td className="card">Example</td>
                    <td className="card">Example</td>
                    <td className="card">Example</td>
                    <td className="card">Example</td>                    
                </tr>
                </tbody>
            </table>
        </section>
        <section className="gray" aria-label="attack area">
            <p>After choosing a card, player's and enemy's card will display here to compare.</p>
            <div className="center-margin small center">
                    <button>Accept</button>
                    <div className = "card inline">
                        Enemy's card
                    </div>
                    <div className = "card inline">
                        Player's card
                    </div>     
                    <div id="deck">
                            Number of cards in deck left
                        </div>           
                </div>

        </section>
        <section className="player gray" aria-label="user">
            <p>Player's cards. Select a card to use in battle. Each card will hold an image representing that card</p>
            <h2>SCORE</h2>
                <table className="center-margin">
                <tbody>
                        <tr>
                            <td className="player-deck card">Example</td>
                            <td className="player-deck card">Example</td>
                            <td className="player-deck card">Example</td>
                            <td className="player-deck card">Example</td>                    
                        </tr>
                        </tbody>
                    </table>
        </section>

            </section>
        )
    }
}