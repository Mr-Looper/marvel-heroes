import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Heroes from './features/heroes/Heroes'
import Loader from './features/loader/Loader'
import Modal from './features/modal/Modal'

import './App.scss';

function App() {
  return (
    <div className="marvel-heroes">
      <div className="background-app"></div>
      <Loader></Loader>
			<Modal></Modal>
      <BrowserRouter>
        <Switch>
          <Route path='/' exact><Heroes></Heroes></Route>
          <Route path='' exact><Heroes></Heroes></Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
