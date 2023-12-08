import React, { useState } from "react";

import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import { Alert } from "react-bootstrap";

import styles from "../../styles/LoginRegister.module.css";
import axios from "axios";
import { Link, useHistory } from "react-router-dom/";

/**
 * RegisterForm Component
 *
 * This component renders a registration form that allows new users to create an account.
 * It handles user input, form submission, and displays success or error messages.
 **/
function RegisterForm() {
	// State for managing registration form data.
	const [registerData, setRegisterData] = useState({
		username: "",
		password1: "",
		password2: "",
	});

	const { username, password1, password2 } = registerData;

	// State for managing form errors.
	const [errors, setErrors] = useState({});

	// State for managing the success message post-registration.
	const [successMessage, setSuccessMessage] = useState("");
	const history = useHistory();

	const handleChange = (event) => {
		/**
		 * Handles input change events and updates the registerData state.
		 **/
		setRegisterData({
			...registerData,
			[event.target.name]: event.target.value,
		});
	};

	const handleSubmit = async (event) => {
		/**
		 * Handles form submission, sets and displays a success message
		 * before redirecting the user to the login page
		 **/
		event.preventDefault();
		try {
			await axios.post("dj-rest-auth/registration/", registerData);
			setSuccessMessage(
				"Congratulations you have successfully registered to GarageGuru.  You will be redirected to the login page shortly"
			);
			setTimeout(() => {
				setSuccessMessage("");
				history.push("/login");
			}, 2500);
		} catch (error) {
			setErrors(error.response?.data);
		}
	};

	return (
		<Container className={styles.LoginRegisterForm}>
			<Col
				xs={12}
				sm={12}
				md={8}
				lg={6}
				xl={6}
				className='mx-auto'>
				{/* Display success message */}
				{successMessage && <Alert className={styles.SuccessMessage} variant='success'>{successMessage}</Alert>}

				<div className={styles.CardBlock}>
					<Card className={styles.FormCard}>
						<div
							className={`d-flex flex-column align-items-center ${styles.Intro}`}>
							<h1>
								<i
									className={`fa-solid fa-solid fa-user-plus ${styles.LoginRegisterIcon}`} aria-hidden='true'>
								</i>
								Register for an Account
							</h1>
							<p>Sign up to GarageGuru, the dynamic job card management app.</p>
						</div>
						<Form onSubmit={handleSubmit}>
							<Form.Group controlId='username'>
								<Form.Label>Username</Form.Label>
								<Form.Control
									type='text'
									placeholder='Enter a username'
									name='username'
									value={username}
									onChange={handleChange}
									className={styles.FormControl}
								/>
							</Form.Group>

							{/* Display error message */}
							{errors.username?.map((message, index) => (
								<Alert
									key={index}
									variant='warning'>
									{message}
								</Alert>
							))}

							<Form.Group controlId='password1'>
								<Form.Label>Choose Password</Form.Label>
								<Form.Control
									type='password'
									placeholder='Enter a password at least 8 characters'
									name='password1'
									value={password1}
									onChange={handleChange}
									className={styles.FormControl}
								/>
							</Form.Group>

							{/* Display error message */}
							{errors.password1?.map((message, index) => (
								<Alert
									key={index}
									variant='warning'>
									{message}
								</Alert>
							))}

							<Form.Group controlId='password2'>
								<Form.Label>Confirm Password</Form.Label>
								<Form.Control
									type='password'
									placeholder='Re-enter the same password'
									name='password2'
									value={password2}
									onChange={handleChange}
									className={styles.FormControl}
								/>
							</Form.Group>

							{/* Display error message */}
							{errors.password2?.map((message, index) => (
								<Alert
									key={index}
									variant='warning'>
									{message}
								</Alert>
							))}

							<Row className='justify-content-center'>
								<Col
									md='12'
									className={styles.BtnContainer}>
									<div className={styles.FullWidthLink}>
										<Button
											variant='primary'
											type='submit'
											size='lg'
											block>
											Register
										</Button>
									</div>
								</Col>
							</Row>

							{/* Display error message */}
							{errors.non_field_errors?.map((message, index) => (
								<Alert
									variant='warning'
									key={index}
									className='mt-3'>
									{message}
								</Alert>
							))}
							<div
								className={`d-flex flex-column align-items-center ${styles.LoginRegisterSection}`}>
								<Link to='/login'>
									<p>
										Already have an account?
										<br />
										Click here to log in
									</p>
								</Link>
							</div>
						</Form>
					</Card>
				</div>
			</Col>
		</Container>
	);
}

export default RegisterForm;
