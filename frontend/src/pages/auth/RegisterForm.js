import React, { useState } from "react";

import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Alert from "react-bootstrap/Alert";
import TimedAlert from "../../components/TimedAlert";

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

	// State for managing form errors and error key to trigger update.
	const [errors, setErrors] = useState({});
	const [errorKey, setErrorKey] = useState(0);

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
		 * Handles form submission, sets and displays errors and a success message
		 * before redirecting the user to the login page
		 **/
		event.preventDefault();

		let formErrors = {};

		if (!username || username === "Enter a username") {
			formErrors.username = ["Please choose a username..."];
		}

		if (!password1 || password1 === "Enter a password at least 8 characters") {
			formErrors.password1 = ["Please choose a password..."];
		}

		if (!password2 || password2 === "Re-enter the same password") {
			formErrors.password2 = ["Please confirm using the same password..."];
		}

		if (Object.keys(formErrors).length > 0) {
			setErrorKey((prevKey) => prevKey + 1);
			setErrors(formErrors);
			return;
		}

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
				{successMessage && (
					<Alert
						className={styles.SuccessMessage}
						variant='success'>
						{successMessage}
					</Alert>
				)}

				<div className={styles.CardBlock}>
					<Card className={styles.FormCard}>
						<div
							className={`d-flex flex-column align-items-center ${styles.Intro}`}>
							<h1>
								<i
									className={`fa-solid fa-solid fa-user-plus ${styles.LoginRegisterIcon}`}
									aria-hidden='true'></i>
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
							<div key={`username-errors-${errorKey}`}>
								{errors.username?.map((message, index) => (
									<TimedAlert
										key={index}
										message={message}
										variant='warning'
										timeout={3000}
									/>
								))}
							</div>

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
							<div key={`password1-errors-${errorKey}`}>
								{errors.password1?.map((message, index) => (
									<TimedAlert
										key={index}
										message={message}
										variant='warning'
										timeout={3000}
									/>
								))}
							</div>

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
							<div key={`password2-errors-${errorKey}`}>
								{errors.password2?.map((message, index) => (
									<TimedAlert
										key={index}
										message={message}
										variant='warning'
										timeout={3000}
									/>
								))}
							</div>

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
