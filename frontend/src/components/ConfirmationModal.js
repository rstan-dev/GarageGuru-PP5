import React from "react";
import { Modal, Button } from "react-bootstrap";
import styles from "../styles/ConfirmationModal.module.css";

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
			onHide={handleClose}
			className={styles.CenteredModal}
			centered>
			<Modal.Header closeButton>
				<Modal.Title className={styles.ModalTitle}>{title}</Modal.Title>
			</Modal.Header>
			<Modal.Body>{body}</Modal.Body>
			<Modal.Footer>
				<Button
					variant='outline-warning'
					size='sm'
					onClick={handleClose}>
					Cancel
				</Button>
				<Button
					variant='outline-success'
					size='sm'
					onClick={handleConfirm}>
					Confirm
				</Button>
			</Modal.Footer>
		</Modal>
	);
};

export default ConfirmationModal;
