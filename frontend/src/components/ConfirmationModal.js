import React from "react";
import { Modal, Button } from "react-bootstrap";

/*
  Reusable Modal to offer a user the chance to Confirm or Cancel
  the request
*/
const ConfirmationModal = ({
	showModal,
	handleClose,
	handleConfirm,
	title,
	body,
}) => {
	return (
		<Modal
			show={showModal}
			onHide={handleClose}>
			<Modal.Header closeButton>
				<Modal.Title>{title}</Modal.Title>
			</Modal.Header>
			<Modal.Body>{body}</Modal.Body>
			<Modal.Footer>
				<Button
					variant='warning'
					onClick={handleClose}>
					Cancel
				</Button>
				<Button
					variant='success'
					onClick={handleConfirm}>
					Confirm
				</Button>
			</Modal.Footer>
		</Modal>
	);
};

export default ConfirmationModal;
