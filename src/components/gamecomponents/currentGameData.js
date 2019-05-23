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
            saveToFile:undefined
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
    }

  

    gameEnd()
    {
        if(this.state.playerScore > this.state.npcScore)
        {
            this.setState({winMessage:"YOU WIN!"});
        }
        if(this.state.playerScore < this.state.npcScore)
        {
            this.setState({winMessage:"YOU LOSE!"});
        }
        if(this.state.playerScore == this.state.npcScore)
        {
            this.setState({winMessage:"IT'S A TIE!"});
        }
        this.setState({gameIsOver:true});
    }

    componentWillMount()
    {
        const username = this.props.children._self.props.match.params.username;
        fetch(`http://localhost:5000/deck/${username}`,
        {
            headers: {'Content-Type':'application/json'}
        })
        .then(res => res.json())
        .then(result => {const d = createDeck(result); this.setState(() => ({currentDeck:d}))})
        fetch(`http://localhost:5000/games/${username}`,
        {
            headers: {'Content-Type':'application/json'}
        })
        .then(res => res.json())
        .then(result =>
            {
                console.log(result);
                this.setState({playerScore:result['player-score'],
                npcScore:result['npc-score'],
                round:result['round-num']});
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
        showWinPopup:false});
    }

    startGame()
    {
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
        });
    }

    start()
    {
        this.setState({showWinPopup: false,
            winMessage:"",

        removePlayerCard:true,removeNpcCard:true, round:this.state.round+1});
    }

    saveToFile()
    {
        console.log("SAVELH");
        const win = this.state.playerScore >= this.state.npcScore;
        const name = this.props.children._self.props.match.params.username;
        fetch(`http://localhost:5000/files/${name}`,
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
        })
    }

    saveGame()
    {
        const name = this.props.children._self.props.match.params.username;
        fetch(`http://localhost:5000/games/${name}`,
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
                deck: this.state.currentDeck
            })
        })
        .then(() => console.log("DONE"));
    }

    findWinner()
    {
        console.log(this.state.round);
        if(this.state.round >= 15 && !this.state.gameIsOver)
        {
            this.saveToFile();
            this.gameEnd();
            return;
        }
        if(this.state.playerCard[1] > this.state.npcCard[1])
        {
            this.setState({playerScore: this.state.playerScore+1,showWinPopup:true, winMessage:"Player Wins a Point!"},() => this.saveGame());
        }
        else if(this.state.playerCard[1] < this.state.npcCard[1])
        {
            this.setState({npcScore: this.state.npcScore+1,showWinPopup:true, winMessage:"Enemy Wins a Point!"},() => this.saveGame());
        }
        else
        {
            this.setState({showWinPopup:true,winMessage:"TIE"},() =>this.saveGame());
        }
        

       // this.setState({removePlayerCard:true,removeNpcCard:true, round:this.state.round+1});
    }

    setPlayerCard(index, card)
    {
        let newCard = [index,card]
        this.setState({playerCard:newCard, removePlayerCard: false});
    }

    setNpcCard(index, card)
    {
        let newCard = [index, card]
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