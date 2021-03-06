import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Card, Col, Row, Fade, Navbar, Nav, Form, Button, Alert } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import moment from 'moment';

import { selectHeroes, fetchHeroes, searchHero, resetOffset } from './heroesSlice';

import './Heroes.scss';
import { setModal } from '../modal/modalSlice';

let currentSearch = ''
const Heroes = () => {
	const dispatch = useDispatch()
	const heroes = [...useSelector(selectHeroes)]
	const loadingStatus = useSelector((state) => state.heroes.status)
	const [searchCharacter, setSearchCharacter] = useState('')

	const handleSearchCharacter = () => {
		currentSearch = searchCharacter
		if(currentSearch !== ''){
			dispatch(searchHero('name', currentSearch))
		}
	}
	const handleShowAll = () => {
		dispatch(resetOffset())
		setSearchCharacter('')
		dispatch(fetchHeroes())
	}
	const handleShowModal = (hero) => {
		dispatch(setModal(true, hero))
	}

	const renderedListItems = heroes.length === 0 && loadingStatus === 'idle'?
		<Col>
			<Alert key="0" variant="danger" className="text-center">
				No characters found named <b>{currentSearch}</b>
			</Alert>
		</Col>
	: heroes.map((hero) => {
		return (
			<Fade in={true} key={hero.index} id={hero.index}>
				<Col className="card-character" xs="12" sm="6" md="4" lg="3" xl="2" onClick={ handleShowModal.bind(this, hero) }>
					<div className="cut-corners">
						<Card bg="light" >
							<Card.Img variant="top" src={`${hero.thumbnail.path}/portrait_uncanny.${hero.thumbnail.extension}`} />
							<Card.Body>
								<Card.Title className="text-danger">{hero.name}</Card.Title>
								<Card.Text className="text-dark">{hero.description}</Card.Text>
							</Card.Body>
							<Card.Footer className="text-secondary">Modified: {moment(hero.modified).format('DD-MM-yyyy')}</Card.Footer>
						</Card>
					</div>
				</Col>
			</Fade>
		)
	})
	return (
		<div className="marvel-heroes">
			<Navbar bg="dark" variant="dark">
				<Navbar.Brand href="">Marvel Characters</Navbar.Brand>
				<Nav className="mr-auto"></Nav>
				<div className="form-inline">
					<Form.Control value={searchCharacter} onChange={(e) => setSearchCharacter(e.target.value) } type="text" placeholder="Search hero..." className="mr-sm-2" />
					<Button variant="outline-danger" onClick={ handleSearchCharacter }>Search</Button>
					{currentSearch !== ''? <Button className="show-all" variant="outline-info" onClick={ handleShowAll }>Show all</Button> : <></> }
				</div>
			</Navbar>
			<Row className="container-heroes">
				{renderedListItems}
			</Row>
		</div>
	)
}

export default Heroes;