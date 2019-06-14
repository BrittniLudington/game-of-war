import React from 'react';
import './App.css';
import filebar from './components/filebar';
import {Switch, Route, Redirect} from 'react-router-dom';
import instructions from './components/instructions';
import FileMenu from './components/filemenu';
import UserMenu from './components/usermenu';
import GameMenu from './components/gamemenu';
import NewFile from './components/newfile';
import LandingPage from './components/landingpage';


function App() {
  return (
    <div className="App">
    {LandingPage()}
      <Switch>
        <Redirect exact from='/' to='/menu'></Redirect>
        <Route path='/instructions' component={instructions}></Route>
        <Route path='/menu' component={FileMenu}></Route>
        <Route path="/user/:username" component={UserMenu}></Route>
        <Route path='/gamemenu/:username' component={GameMenu}></Route>
        <Route path='/newfile' component={NewFile}></Route>
      </Switch>
      {filebar()}
    </div>
  );
}

export default App;
