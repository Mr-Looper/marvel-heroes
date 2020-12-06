import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Heroes from './features/heroes/Heroes'
import Loader from './features/loader/Loader'
import Modal from './features/modal/Modal';

import './App.scss';
import { fetchHeroes } from './features/heroes/heroesSlice';

let lastMove = 0
function App() {
	const dispatch = useDispatch()
	const elementIsShown = (elem, border, delta = 0) => {
		return (window.innerHeight - elem.getBoundingClientRect()[border]) >= delta
	}
	const handleScroll = () => {
		if(Date.now() - lastMove > 200) {
			const cards = document.getElementsByClassName('card-character fade')
			if(cards){
				const lastCard = cards[cards.length - 1]
				if(	elementIsShown(lastCard, 'top', -50)){
					lastMove = Date.now();
					dispatch(fetchHeroes())
				}
			}
		}
	}
  useEffect(() => {
		window.addEventListener('scroll', handleScroll)
		return () => {
      window.removeEventListener('scroll', () => {})
    };
	})
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
