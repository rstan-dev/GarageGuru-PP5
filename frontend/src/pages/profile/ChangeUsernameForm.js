import React, { useState, useEffect } from "react";

import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";

import styles from "../../styles/ChangeUsernamePassword.module.css";

import {
	useCurrentUser,
	useSetCurrentUser,
} from "../../contexts/CurrentUserContext";
import { axiosRes } from "../../api/axiosDefaults";
import { useHistory, useParams } from "react-router-dom";

/**
 * ChangeUsernameForm Component
 *
 * This component renders a form for changing a user's username.
 * It includes functionality for updating the username, handling form submission,
 * performing validation, and managing success and error messages.
 */
const ChangeUsernameForm = () => {
	// Fetching current user details and a setter function for updating the user.
	const currentUser = useCurrentUser();
	const currentUserId = currentUser ? currentUser.pk : null;

	// Extracting user ID from URL parameters.
	const { id } = useParams();

	// State for managing the username and form errors and success messages.
	const setCurrentUser = useSetCurrentUser();
	const [username, setUsername] = useState("");
	const [errors, setErrors] = useState({});
	const [successMessage, setSuccessMessage] = useState("");

	const history = useHistory();

	/**
	 * Handles changes to the username input field.
	 **/
	const handleChange = (event) => {
		setUsername(event.target.value);
	};

	/**
	 * Ensures that the current user is the owner of the profile.
	 * Initializes the username state with the current user's username.
	 */
	useEffect(() => {
		if (!currentUser || currentUserId !== parseInt(id)) {
			// redirect user if they are not the owner of this profile
			history.push("/");
		} else {
			setUsername(currentUser.username);
		}
	}, [currentUser, history, currentUserId, id]);

	/**
	 * Handles form submission to change the user's username.
	 * Submits the new username to the server and updates the user state.
	 **/
	const handleSubmit = async (event) => {
		event.preventDefault();
		try {
			await axiosRes.put("/dj-rest-auth/user/", { username });
			setCurrentUser((prevUser) => ({
				...prevUser,
				username,
			}));
			setSuccessMessage("Username updated successfully");
			setTimeout(() => {
				setSuccessMessage("");
				history.goBack();
			}, 1500);
		} catch (err) {
			console.log(err);
			setErrors(err.response?.data);
		}
	};

	return (
		<Container className={styles.ProfileForm}>
			<Col
				xs={12}
				sm={12}
				md={8}
				lg={8}
				xl={8}
				className='mx-auto'>
				<div className={styles.CardBlock}>

          			{/* Display success message */}
					{successMessage && <Alert variant='success'>{successMessage}</Alert>}

					{/* Display error messages */}
					{errors.response && (
						<Alert variant='danger'>{errors.response[0]}</Alert>
					)}

					<Card className={styles.FormCard}>
						<div className={`d-flex flex-column align-items-center`}>
							<p>
								<i className={`fa-solid fa-pencil ${styles.EditIcon}`}></i>
								Change Username
							</p>
						</div>

						<Form onSubmit={handleSubmit}>
							<Form.Group>
								{errors?.username?.map((message, index) => (
									<Alert
										key={index}
										variant='warning'>
										{message}
									</Alert>
								))}
								<Form.Label>Update username</Form.Label>
								<Form.Control
									placeholder='choose a new username'
									type='text'
									value={username}
									onChange={handleChange}
									className={styles.FormControl}
								/>
							</Form.Group>

							<Row className='justify-content-center'>
								<Col
									md='auto'
									className={styles.BtnContainer}>
									<Button
										onClick={() => history.goBack()}
										variant='warning'>
										Cancel
									</Button>
								</Col>
								<Col
									md='auto'
									className={styles.BtnContainer}>
									<Button
										type='submit'
										variant='success'>
										Update Username
									</Button>
								</Col>
							</Row>
						</Form>
					</Card>
				</div>
			</Col>
		</Container>
	);
};

export default ChangeUsernameForm;
