import React from 'react';
import ReactDOM from 'react-dom';
import FileMenu from '../components/filemenu';
import NewFile from '../components/newfile';
import UserMenu from '../components/usermenu';
import {BrowserRouter} from 'react-router-dom';
import LandingPage from '../components/landingpage';
import instructions from '../components/instructions';
import File from '../components/file';
import GameMenu from '../components/gamemenu';
import App from '../App';


describe('menu component renderings',() =>
{
    it('fileMenu renders without crashing',() =>
    {
        const element = document.createElement('div');
    
        ReactDOM.render(<FileMenu/>,element);
        ReactDOM.unmountComponentAtNode(element);
    });

    it('newFile renders without crashing',()=>
    {
        const element = document.createElement('div');
    
        ReactDOM.render(<NewFile/>,element);
        ReactDOM.unmountComponentAtNode(element);
    });

    it('landing header renders without crashing',()=>
    {
        const element = document.createElement('div');
    
        ReactDOM.render(LandingPage,element);
        ReactDOM.unmountComponentAtNode(element);
    });

    it('instructions renders without crashing',()=>
    {
        const element = document.createElement('div');
    
        ReactDOM.render(instructions,element);
        ReactDOM.unmountComponentAtNode(element);
    });

    it('usermenu renders without crashing',() =>
    {
        const element = document.createElement('div');
 
                    let match = {
                        params:{
                            username:"hello"
                        }
                    }
            console.log(match);
        ReactDOM.render(<BrowserRouter><UserMenu match = {match}/></BrowserRouter>,element);
        ReactDOM.unmountComponentAtNode(element);
    });
    

    it('individual files can render',()=>
    {
        const element = document.createElement('div');
    
        ReactDOM.render(<BrowserRouter><File username="name" game="fake game" deleteUser="fake function"/></BrowserRouter>,element);
        ReactDOM.unmountComponentAtNode(element);
    })
})

