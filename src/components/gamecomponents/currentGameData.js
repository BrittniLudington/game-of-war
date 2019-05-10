import React from 'react';

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
            start: undefined
       }
       this.setPlayerCard = this.setPlayerCard.bind(this);
       this.setNpcCard = this.setNpcCard.bind(this);
       this.findWinner = this.findWinner.bind(this);
       this.start = this.start.bind(this);

    }

    componentDidMount()
    {
        this.setState({setPlayerCard:this.setPlayerCard,
            setNpcCard:this.setNpcCard,
            findWinner:this.findWinner,
        start: this.start});
    }

    start()
    {
        this.setState({showWinPopup: false,
            winMessage:"",
        playerCard:[-1,0],
        npcCard:[-1,0]});
    }

    findWinner()
    {
        console.log(this.state.playerCard, this.state.npcCard);    
        if(this.state.playerCard[1] > this.state.npcCard[1])
        {
            this.setState({playerScore: this.state.playerScore+1,showWinPopup:true, winMessage:"Player Wins a Point!"});
        }
        else if(this.state.playerCard[1] < this.state.npcCard[1])
        {
            this.setState({npcScore: this.state.npcScore+1,showWinPopup:true, winMessage:"Enemy Wins a Point!"});
        }
        else
        {
            this.setState({winMessage:"TIE"});
        }
    }

    setPlayerCard(index, card)
    {
        let newCard = [index,card]
        this.setState({playerCard:newCard});
    }

    setNpcCard(index, card)
    {
        let newCard = [index, card]
        this.setState({npcCard:newCard});
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