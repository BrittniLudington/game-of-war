import React from 'react';
import './App.css';
import filebar from './components/filebar';
import {Switch, Route} from 'react-router-dom';
import instructions from './components/instructions';
import FileMenu from './components/filemenu';
import UserMenu from './components/usermenu';
import GameMenu from './components/gamemenu';
import LandingPage from './components/landingpage';
import NewFile from './components/newfile';
import DataProvider from './data';


function App() {
  return (
    <div className="App">
    <DataProvider>
      <Switch>
        <Route exact path="/" component={LandingPage}></Route>
        <Route path='/instructions' component={instructions}></Route>
        <Route path='/menu' component={FileMenu}></Route>
        <Route path="/user/:username" component={UserMenu}></Route>
        <Route path='/gamemenu/:username' component={GameMenu}></Route>
        <Route path='/newfile' component={NewFile}></Route>
      </Switch>
      {filebar()}
      </DataProvider>
    </div>
  );
}

export default App;
