import React, { useState, useEffect } from "react";

import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import styles from "../../styles/ChangeUsernamePassword.module.css";

import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { axiosRes } from "../../api/axiosDefaults";
import { useHistory, useParams } from "react-router-dom";

/**
 * ChangePasswordForm Component
 *
 * This component renders a form for changing a user's password.
 * It includes functionality for updating the password, handling form submission,
 * performing validation, and managing success and error messages.
 */
const ChangePasswordForm = () => {
	// Fetching current user details for authentication checks.
	const currentUser = useCurrentUser();
	const currentUserId = currentUser ? currentUser.pk : null;

	// Extracting user ID from URL parameters.
	const { id } = useParams();

	// State for managing password data.
	const [userData, setUserData] = useState({
		new_password1: "",
		new_password2: "",
	});
	const { new_password1, new_password2 } = userData;

	// State for managing form errors and success messages.
	const [errors, setErrors] = useState({});
	const [successMessage, setSuccessMessage] = useState("");

	const history = useHistory();

	/**
	 * Handles changes to any of the form fields and updates the corresponding state.
	 **/
	const handleChange = (event) => {
		setUserData({
			...userData,
			[event.target.name]: event.target.value,
		});
	};

	useEffect(() => {
		if (currentUserId !== parseInt(id)) {
			// redirect user if they are not the owner of this profile.
			history.push("/");
		}
	}, [currentUser, history, currentUserId, id]);

	/**
	 * Handles form submission to change the user's password.
	 * Submits the new password data to the server and handles success and error cases.
	 **/
	const handleSubmit = async (event) => {
		event.preventDefault();
		try {
			await axiosRes.post("/dj-rest-auth/password/change/", userData);
			setSuccessMessage("Password updated successfully");
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

					<Card className={styles.FormCard}>
						<div className={`d-flex flex-column align-items-center`}>
							<p>
								<i
									className={`fa-solid fa-pencil ${styles.EditIcon}`}
									aria-hidden='true'></i>
								Change Password
							</p>
						</div>

						<Form onSubmit={handleSubmit}>
							<Form.Group>
								{errors?.new_password1?.map((message, index) => (
									<Alert
										key={index}
										variant='warning'>
										{message}
									</Alert>
								))}
								<Form.Label>Update password</Form.Label>
								<Form.Control
									placeholder='choose a new password'
									type='password'
									name='new_password1'
									value={new_password1}
									onChange={handleChange}
									className={styles.FormControl}
								/>
							</Form.Group>

							<Form.Group>
								{errors?.new_password2?.map((message, index) => (
									<Alert
										key={index}
										variant='warning'>
										{message}
									</Alert>
								))}
								<Form.Label>Confirm password</Form.Label>
								<Form.Control
									placeholder='confirm new password'
									type='password'
									name='new_password2'
									value={new_password2}
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
										Update Password
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

export default ChangePasswordForm;
