import React from 'react';
import createDeck from './deck.js';


export const Context = React.createContext({
    state : undefined
});

export default class dataProvider extends React.Component
{
    constructor(props)
    {
        super(props);
       this.state =
       {
           playerHand: [],
           npcHand: [],
           playerScore: 0,
           npcScore: 0,
           playerCard: [-1,0],
           npcCard: [-1,0],
           playerReady: false,
           npcReady: false,
           setPlayerCard: undefined,
           setNpcCard: undefined,
           findWinner: undefined,
           showWinPopup: false,
            winMessage: "",
            start: undefined,
            removePlayerCard: false,
            removeNpcCard: false,
            gameEnd: undefined,
            handEmpty:[-1,-1],
            round: 1,
            gameIsOver: false,
            startGame: undefined,
            currentDeck: undefined,
            saveGame: undefined,
            saveToFile:undefined,
            setHand: undefined,
            removeCard:undefined
       }
       // total rounds: 15
       this.setPlayerCard = this.setPlayerCard.bind(this);
       this.setNpcCard = this.setNpcCard.bind(this);
       this.findWinner = this.findWinner.bind(this);
       this.start = this.start.bind(this);
       this.gameEnd = this.gameEnd.bind(this);
       this.startGame = this.startGame.bind(this);
       this.saveGame = this.saveGame.bind(this);
       this.saveToFile = this.saveToFile.bind(this);
       this.setHand = this.setHand.bind(this);
       this.removeCard = this.removeCard.bind(this);
    }

    removeCard(newDeck)
    {
        this.setState({currentDeck:newDeck});
    }


    gameEnd()
    {
        if(this.state.playerScore > this.state.npcScore)
        {
            this.setState({winMessage:"YOU WIN!",gameIsOver:true},() =>  this.saveToFile() );
        }
        if(this.state.playerScore < this.state.npcScore)
        {
            this.setState({winMessage:"YOU LOSE!",gameIsOver:true},() =>  this.saveToFile());
        }
        if(this.state.playerScore == this.state.npcScore)
        {
            this.setState({winMessage:"IT'S A TIE!",gameIsOver:true},() =>  this.saveToFile());
        }
        
    }

    setHand(type, handToSet)
    {
        if(type == "player")
            this.setState({playerHand:handToSet, removePlayerCard: false});
        if(type == "npc")
            this.setState({npcHand:handToSet, removeNpcCard: false});
    }

    componentWillMount()
    {
        const username = this.props.children._self.props.match.params.username;
        fetch(`https://game-of-war-server.herokuapp.com/games/${username}`,
        {
            headers: {'Content-Type':'application/json'}
        })
        .then(res => res.json())
        .then(result =>
            {
                const d = createDeck(result.deck);
                this.setState({playerScore:result['player-score'],
                npcScore:result['npc-score'],
                round:result['round-num'],
                playerHand:result['player-hand'],
                npcHand:result['npc-hand'],
                removeCard:this.removeCard,
                currentDeck: d});
            })
        
        //.then(result => this.setState(() =>({currentDeck:result})))
        
        this.setState({setPlayerCard:this.setPlayerCard,
            setNpcCard:this.setNpcCard,
            findWinner:this.findWinner,
        start: this.start,
        gameEnd: this.gameEnd,
        startGame:this.startGame,
        saveGame: this.saveGame,
        saveToFile:this.saveToFile,
        winMessage: "",
        gameIsOver:false,
        showWinPopup:false,
        setHand:this.setHand});
    }

    startGame()
    {
        const newDeck = createDeck([1,2,3,4,5,6,7,8,9,10,1,2,3,4,5,6,7,8,9,10,1,2,3,4,5,6,7,8,9,10]);
        this.setState({showWinPopup: false,
        winMessage:"",
        playerCard:[-1,0],
        npcCard:[-1,0],
        playerScore: 0,
        npcScore: 0,
        playerReady: false,
        npcReady: false,
        removePlayerCard: false,
        removeNpcCard: false,
        handEmpty:[-1,-1],
        round: 1,
        gameIsOver: false,
        currentDeck: newDeck
        });
        const name = this.props.children._self.props.match.params.username;

        console.log(name);
        fetch(`https://game-of-war-server.herokuapp.com/games/${name}`,
        {
            crossDomain: true,
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: name,
                pscore: 0,
                nscore: 0,
                round: 0,
                deck: newDeck,
                playerHand: [0,0,0,0,0],
                npcHand: [0,0,0,0,0]
            })
        });
    }

    start()
    {
        this.setState({showWinPopup: false,
            winMessage:"",
             round:this.state.round+1,
            playerCard: [-1,0],
            npcCard:[-1,0]});
    }

    saveToFile()
    {
        const win = this.state.playerScore >= this.state.npcScore;
        const name = this.props.children._self.props.match.params.username;
        fetch(`https://game-of-war-server.herokuapp.com/files/${name}`,
        {
            crossDomain: true,
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: name,
                didWin: win
            })
        });

    }

    saveGame()
    {
        const name = this.props.children._self.props.match.params.username;
        fetch(`https://game-of-war-server.herokuapp.com/games/${name}`,
        {
            crossDomain: true,
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: name,
                pscore: this.state.playerScore,
                nscore: this.state.npcScore,
                round: this.state.round,
                deck: this.state.currentDeck,
                playerHand: this.state.playerHand,
                npcHand: this.state.npcHand
            })
        });
    }

    findWinner()
    {

        if(this.state.playerCard[1] > this.state.npcCard[1])
        {
            this.setState({playerScore: this.state.playerScore+1, removePlayerCard:true,removeNpcCard:true,showWinPopup:true, winMessage:"Player Wins a Point!"},() => 
            {
                this.saveGame();
                if(this.state.round >= 14 && !this.state.gameIsOver)
                {
                    this.gameEnd();
                    return;
                }
            });
        }
        else if(this.state.playerCard[1] < this.state.npcCard[1])
        {
            this.setState({npcScore: this.state.npcScore+1, removePlayerCard:true,removeNpcCard:true, showWinPopup:true, winMessage:"Enemy Wins a Point!"},() => 
            {
                this.saveGame()
                if(this.state.round >= 14 && !this.state.gameIsOver)
                {
                    this.gameEnd();
                    return;
                }
            });
        }
        else
        {
            this.setState({showWinPopup:true,winMessage:"TIE", removePlayerCard:true,removeNpcCard:true},() =>
            {
                this.saveGame()
                if(this.state.round >= 14 && !this.state.gameIsOver)
                {
                    this.gameEnd();
                    return;
                }
            });
        }
        

       // this.setState({removePlayerCard:true,removeNpcCard:true, round:this.state.round+1});
    }

    setPlayerCard(index)
    {
        let newCard = [index,this.state.playerHand[index]];
        this.setState({playerCard:newCard, removePlayerCard: false});
    }

    setNpcCard(index)
    {
        let newCard = [index, this.state.npcHand[index]];
        this.setState({npcCard:newCard, removeNpcCard: false});
    }

    render()
    {
        return(
            <Context.Provider value={this.state}>
                {this.props.children}
            </Context.Provider>
        );
    }
}