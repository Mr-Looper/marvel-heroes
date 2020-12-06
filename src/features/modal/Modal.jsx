import React from 'react'
import { setModal } from './modalSlice';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Modal } from 'react-bootstrap';

export default function ModalCharacter() {
	const dispatch = useDispatch()
	const hero = useSelector(state => state.modal).content
	const renderedButtons = hero.urls ? hero.urls.map((url, index) =>
		<div key={index}>
			<Button onClick={() => window.open(url.url, '_blank')}>{ url.type.charAt(0).toUpperCase() + url.type.slice(1)}</Button>
		</div>
	) : <></>
	const statusModal = useSelector(state => state.modal).status
	const handleClose = () => {
		dispatch(setModal(false, {}))
	}
	return (
	  <>
			{ statusModal ? 
				<Modal show={statusModal} onHide={handleClose}>
					<Modal.Header closeButton>
						<Modal.Title>{hero.name}</Modal.Title>
					</Modal.Header>
					<Modal.Body>{hero.description || 'No description'}
					</Modal.Body>
					<Modal.Footer>
						{renderedButtons}
						<Button variant="secondary" onClick={handleClose}>
							Close
						</Button>
					</Modal.Footer>
				</Modal> 
				: 
				<></>
			}
	  </>
	);
}