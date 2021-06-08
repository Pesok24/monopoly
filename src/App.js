import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import MainMenu from './components/MainMenu';
import Game from './components/Game';

function App() {
  return (
    <>
    <BrowserRouter>
    <Route path='/' exact>
      <MainMenu />
      </Route>
      <Route path='/game/:roomNumb'>
      <Game />
      </Route>
    </BrowserRouter>
    </>
  );
}

export default App;
