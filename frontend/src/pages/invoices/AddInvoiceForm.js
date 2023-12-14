import React, { useState, useEffect, useRef } from "react";

import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import TimedAlert from "../../components/TimedAlert";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";

import styles from "../../styles/AddEditInvoice.module.css";

import { useHistory, useLocation } from "react-router-dom";
import axios from "axios";
import { axiosReq } from "../../api/axiosDefaults";

/**
 * AddInvoiceForm Component
 *
 * This component renders a form to add a new invoice associated with a job.
 * It manages form state, handles data submission to the server, and performs basic validation.
 */
function AddInvoiceForm() {
	// Gets jobId from the URL using useLocation hook.
	const location = useLocation();
	const jobId = parseInt(location.state?.jobId, 10);

	// Initialize state of invoice data
	const [invoiceData, setInvoiceData] = useState({
		job: null,
		customer_firstname: "",
		customer_lastname: "",
		customer_email: "",
		customer_phone: "",
		amount: "",
		due_date: "",
		invoice_status: "Pending",
	});

	const {
		customer_firstname,
		customer_lastname,
		customer_email,
		customer_phone,
		amount,
		due_date,
		invoice_status,
	} = invoiceData;

	// State for managing form errors, error key and success messages.
	const [errors, setErrors] = useState({});
	const [errorKey, setErrorKey] = useState(0);
	const [successMessage, setSuccessMessage] = useState("");

	const successTimeoutRef = useRef();
	const history = useHistory();

	/**
	 * Utility function to get the current date in the format YYYY-MM-DD.
	 * Used to set a default due date for the invoice.
	 **/
	const getCurrentDate = () => {
		const now = new Date();
		const year = now.getFullYear();
		const month = String(now.getMonth() + 1).padStart(2, "0");
		const day = String(now.getDate()).padStart(2, "0");
		return `${year}-${month}-${day}`;
	};

	// Sets the due_date field to curent date when form initially loads.
	useEffect(() => {
		const currentDate = getCurrentDate();
		setInvoiceData((prevState) => ({
			...prevState,
			due_date: currentDate,
		}));
	}, []);

	// Handles any changes to main form.
	const handleChange = (event) => {
		setInvoiceData({
			...invoiceData,
			[event.target.name]: event.target.value,
		});
	};

	// Clears the success message timeout function
	useEffect(() => {
		return () => {
			if (successTimeoutRef.current) {
				clearTimeout(successTimeoutRef.current);
			}
		};
	}, []);

	/**
	 * Handles form submission to create a new invoice.
	 * Performs basic validation and sends data to the server.
	 * Navigates to the job page and displays a success message upon successful submission.
	 **/
	const handleSubmit = async (event) => {
		event.preventDefault();

		let formErrors = {};

		if (!customer_firstname || customer_firstname === "enter first name") {
			formErrors.customer_firstname = [
				"First name is required. Please enter the customer's name...",
			];
		}

		if (!customer_lastname || customer_lastname === "enter last name") {
			formErrors.customer_lastname = [
				"Last name is required. Please enter the customer's second name...",
			];
		}

		if (!amount || amount === "enter invoice amount") {
			formErrors.amount = [
				"An amount is required. Please enter a decimal amount...",
			];
		}

		if (!due_date) {
			formErrors.due_date = [
				"Due Date is required. Please select a due date...",
			];
		}

		if (!invoice_status || invoice_status === "") {
			formErrors.invoice_status = ["Please select a status for this job..."];
		}

		if (Object.keys(formErrors).length > 0) {
			setErrorKey((prevKey) => prevKey + 1);
			setErrors(formErrors);
			return;
		}

		const formData = new FormData();

		formData.append("job_id", jobId);
		formData.append("customer_firstname", customer_firstname);
		formData.append("customer_lastname", customer_lastname);
		formData.append("customer_email", customer_email);
		formData.append("customer_phone", customer_phone);
		formData.append("amount", amount);
		formData.append("inv_due_date", due_date);
		formData.append("invoice_status", invoice_status);

		try {
			await axiosReq.post("/invoices/", formData);
			// Sets success message and timeout
			setSuccessMessage("Invoice has been added successfully");
			successTimeoutRef.current = setTimeout(() => {
				setSuccessMessage("");
				history.push(`/jobs/${jobId}`);
			}, 2500);
		} catch (err) {
			if (axios.isAxiosError(err) && err.response) {
				// console.log(err);
				if (err.response.status !== 401) {
					setErrors(err.response.data);
				}
			} else {
				console.error(err);
				setErrors({ message: ["There was an error submitting the form."] });
			}
		}
	};

	// Text fields component to be rendered in form.
	const textFields = (
		<div className='text-center'>
			<Form.Group controlId='customer_firstname'>
				<Form.Label>Customer First Name:</Form.Label>
				<Form.Control
					type='text'
					name='customer_firstname'
					placeholder='enter first name'
					value={customer_firstname}
					onChange={handleChange}
					className={styles.FormControl}
				/>
			</Form.Group>
			<div key={`customer_firstname-errors-${errorKey}`}>
				{errors.customer_firstname?.map((message, index) => (
					<TimedAlert
						key={index}
						message={message}
						variant='warning'
						timeout={3000}
					/>
				))}
			</div>

			<Form.Group controlId='customer_lastname'>
				<Form.Label>Customer Last Name:</Form.Label>
				<Form.Control
					type='text'
					name='customer_lastname'
					value={customer_lastname}
					onChange={handleChange}
					className={styles.FormControl}
					placeholder='enter last name'
				/>
			</Form.Group>
			<div key={`customer_lastname-errors-${errorKey}`}>
				{errors.customer_lastname?.map((message, index) => (
					<TimedAlert
						key={index}
						message={message}
						variant='warning'
						timeout={3000}
					/>
				))}
			</div>
			<Form.Group controlId='customer_email'>
				<Form.Label>Email:</Form.Label>
				<Form.Control
					type='email'
					name='customer_email'
					value={customer_email}
					onChange={handleChange}
					className={styles.FormControl}
					placeholder='enter email'
				/>
			</Form.Group>
			<Form.Group controlId='customer_phone'>
				<Form.Label>Phone:</Form.Label>
				<Form.Control
					type='tel'
					name='customer_phone'
					value={customer_phone}
					onChange={handleChange}
					pattern='^\d{9,15}$'
					title='Phone number must be between 9 to 15 digits.'
					className={styles.FormControl}
					placeholder='enter phone no'
				/>
			</Form.Group>
			<Form.Group controlId='amount'>
				<Form.Label>Amount:</Form.Label>
				<Form.Control
					type='number'
					min='0'
					step='0.01'
					name='amount'
					value={amount}
					onChange={handleChange}
					className={styles.FormControl}
					placeholder='enter invoice amount'
				/>
			</Form.Group>
			<div key={`amount-errors-${errorKey}`}>
				{errors.amount?.map((message, index) => (
					<TimedAlert
						key={index}
						message={message}
						variant='warning'
						timeout={3000}
					/>
				))}
			</div>
			<Form.Group controlId='due_date'>
				<Form.Label>Due Date:</Form.Label>
				<Form.Control
					type='date'
					name='due_date'
					value={due_date}
					onChange={handleChange}
					min={getCurrentDate()}
					className={styles.FormControl}
				/>
			</Form.Group>
			<div key={`due_date-errors-${errorKey}`}>
				{errors.due_date?.map((message, index) => (
					<TimedAlert
						key={index}
						message={message}
						variant='warning'
						timeout={3000}
					/>
				))}
			</div>
			<Form.Group controlId='invoice_status'>
				<Form.Label>Invoice Status:</Form.Label>
				<Form.Control
					as='select'
					name='invoice_status'
					value={invoice_status}
					onChange={handleChange}
					className={styles.FormControl}>
					<option>Select status</option>
					<option value='Pending'>Pending</option>
					<option value='Invoiced'>Invoiced</option>
					<option value='Paid'>Paid</option>
				</Form.Control>
			</Form.Group>
			<div key={`invoice_status-errors-${errorKey}`}>
				{errors.invoice_status?.map((message, index) => (
					<TimedAlert
						key={index}
						message={message}
						variant='warning'
						timeout={3000}
					/>
				))}
			</div>
		</div>
	);

	return (
		<Container className={styles.AddEditInvoiceForm}>
			<Col
				xs={12}
				sm={12}
				md={10}
				lg={8}
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
						<p>
							<i
								className={`fa-solid fa-circle-plus ${styles.AddEditInvoiceIcon}`}
								aria-hidden='true'></i>
							Add Invoice Form
						</p>

						<Form onSubmit={handleSubmit}>
							<div>{textFields}</div>

							<Row className='justify-content-center'>
								<Col
									md='auto'
									className={styles.BtnContainer}>
									<Button
										variant='warning'
										onClick={() => history.goBack()}>
										Cancel
									</Button>
								</Col>
								<Col
									md='auto'
									className={styles.BtnContainer}>
									<Button
										variant='success'
										type='submit'>
										Add Invoice
									</Button>
								</Col>
							</Row>
						</Form>
					</Card>
				</div>
			</Col>
		</Container>
	);
}

export default AddInvoiceForm;
