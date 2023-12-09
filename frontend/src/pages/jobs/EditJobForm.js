import React, { useState, useRef, useEffect } from "react";

import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import TimedAlert from "../../components/TimedAlert";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";

import styles from "../../styles/AddEditJob.module.css";

import { useHistory, useParams } from "react-router-dom";
import axios from "axios";
import { axiosReq, axiosRes } from "../../api/axiosDefaults";
import ConfirmationModal from "../../components/ConfirmationModal";

/**
 * EditJobForm Component
 *
 * This component renders a form for editing an existing job.
 * It includes functionality for updating job data, handling form submission,
 * performing validation, and managing delete confirmations via a modal.
 */
function EditJobForm() {
	// State for managing the list of users (for assigned_to dropdown).
	const [users, setUsers] = useState([]);

	// Extracts job ID from URL parameters.
	const { id } = useParams();

	// Initialize state of job data.
	const [jobData, setJobData] = useState({
		job_type: "",
		job_details: "",
		image: "",
		due_date: "",
		assigned_to: "",
		status: "",
		is_owner: null,
	});

	const { job_type, job_details, image, due_date, assigned_to, status } =
		jobData;

	// State for managing form errors, error key, and success messages, displaying
	// the confirmation modal and its content.
	const [errors, setErrors] = useState({});
	const [successMessage, setSuccessMessage] = useState("");
	const [errorKey, setErrorKey] = useState(0);
	const [showConfirmationModal, setShowConfirmationModal] = useState(false);
	const [confirmationModalContent, setConfirmationModalContent] = useState({
		title: "",
		body: "",
		confirmAction: () => {},
	});

	// useRef hooks for managing the image input and success message timeout.
	const imageInput = useRef();
	const successTimeoutRef = useRef();

	const history = useHistory();

	/**
	 * Fetches original job data on component mount to populate the form.
	 */
	useEffect(() => {
		const handleMount = async () => {
			try {
				const { data } = await axiosReq.get(`/jobs/${id}/`);
				const {
					job_type,
					job_details,
					image,
					due_date,
					assigned_to,
					status,
					is_owner,
				} = data;

				is_owner
					? setJobData({
							job_type,
							job_details,
							image,
							due_date,
							assigned_to,
							status,
					  })
					: history.push("/");
			} catch (err) {
				console.log(err);
			}
		};
		handleMount();
	}, [history, id]);

	/**
	 * Fetches profiles to populate the assigned_to dropdown.
	 */
	useEffect(() => {
		const fetchProfiles = async () => {
			try {
				const { data } = await axiosReq.get(`/profiles/`);
				setUsers(data);
			} catch (err) {
				console.log(err);
			}
		};
		fetchProfiles();
	}, []);

	// Get current date to use as minimum date - prevents a user selecting
	// a past date.
	const getCurrentDate = () => {
		const now = new Date();
		const year = now.getFullYear();
		const month = String(now.getMonth() + 1).padStart(2, "0");
		const day = String(now.getDate()).padStart(2, "0");
		return `${year}-${month}-${day}`;
	};

	/**
	 * Handles changes to any of the form fields and updates the corresponding state.
	 **/
	const handleChange = (event) => {
		setJobData({
			...jobData,
			[event.target.name]: event.target.value,
		});
	};

	/**
	 * Handles image upload and updates the image state.
	 **/
	const handleUploadImage = (event) => {
		if (event.target.files.length) {
			URL.revokeObjectURL(image);
			setJobData({
				...jobData,
				image: URL.createObjectURL(event.target.files[0]),
			});
		}
	};

	// Clears the success message timeout function.
	useEffect(() => {
		return () => {
			if (successTimeoutRef.current) {
				clearTimeout(successTimeoutRef.current);
			}
		};
	}, []);

	/**
	 * Handles form submission to update a job.
	 * Performs validation and sets confirmation modal content.
	 **/
	const handleSubmit = (event) => {
		event.preventDefault();

		let formErrors = {};

		if (!job_type || job_type === "Choose Job Type") {
			formErrors.job_type = [
				"Job Type is Required. Please select a job type...",
			];
		}

		if (
			!job_details ||
			job_details === "Enter some details about the vehicle and the job here..."
		) {
			formErrors.job_details = [
				"Please enter some details about the vehicle and the job",
			];
		}

		if (!due_date) {
			formErrors.due_date = [
				"Due Date is required. Please select a due date...",
			];
		}

		if (!assigned_to || assigned_to === "") {
			formErrors.assigned_to = ["Please assign this job to a user..."];
		}

		if (!status || status === "") {
			formErrors.assigned_to = ["Please select a status for thjis job..."];
		}

		if (Object.keys(formErrors).length > 0) {
			setErrorKey((prevKey) => prevKey + 1);
			setErrors(formErrors);
			return;
		}

		setConfirmationModalContent({
			title: "Confirm Job Update",
			body: "Are you sure you want to update this job?",
			confirmAction: handleUpdateConfirm, // References the function that performs the update.
		});
		setShowConfirmationModal(true);
	};

	// Updates api and closes Confirmation Modal when update confirmed.
	const handleUpdateConfirm = async () => {
		const formData = new FormData();

		formData.append("job_type", job_type);
		formData.append("job_details", job_details);
		formData.append("due_date", due_date);
		formData.append("assigned_to", assigned_to);
		formData.append("status", status);
		if (imageInput.current && imageInput.current.files[0]) {
			formData.append("image", imageInput.current.files[0]);
		}
		try {
			await axiosReq.put(`/jobs/${id}/`, formData);
			setSuccessMessage("Job has been updated successfully");
			successTimeoutRef.current = setTimeout(() => {
				setSuccessMessage("");
				history.push(`/jobs/${id}`);
			}, 1500);
		} catch (err) {
			if (axios.isAxiosError(err) && err.response) {
				console.log(err);
				if (err.response.status !== 401) {
					setErrors(err.response.data);
				}
			} else {
				console.error(err);
				setErrors({ message: ["There was an error submitting the form."] });
			}
			setErrorKey(prevKey => prevKey + 1);
		}

		setShowConfirmationModal(false);
	};

	// Handles the delete button.
	const handleDelete = () => {
		setConfirmationModalContent({
			title: "Confirm Job Deletion",
			body: "Are you sure you want to delete this job? This action cannot be undone.",
			confirmAction: handleDeleteConfirm, // Reference to the function that performs the delete.
		});
		setShowConfirmationModal(true);
	};

	// Submits the delete request after modal confirmation.
	const handleDeleteConfirm = async () => {
		try {
			await axiosRes.delete(`/jobs/${id}/`);
			setSuccessMessage("Job has been deleted successfully");
			successTimeoutRef.current = setTimeout(() => {
				setSuccessMessage("");
				history.goBack();
			}, 1500);
		} catch (err) {
			console.log(err);
		}
		setShowConfirmationModal(false);
	};

	// Handles modal's confirmation.
	const handleModalConfirm = () => {
		confirmationModalContent.confirmAction();
	};

	// This function will be used to close the modal without taking action.
	const handleModalClose = () => {
		setShowConfirmationModal(false);
	};

	// Text fields component to be rendered in form.
	const textFields = (
		<div className='text-center'>
			{/* Job Type Field */}
			<Form.Group controlId='job_type'>
				<Form.Label>Job Type:</Form.Label>
				<Form.Control
					as='select'
					name='job_type'
					value={job_type}
					onChange={handleChange}
					isrequired='true'
					className={styles.FormControl}>
					<option>Choose Job Type</option>
					<option value='Major Service'>Major Service</option>
					<option value='Minor Service'>Minor Service</option>
					<option value='MOT'>MOT</option>
					<option value='Tyre Change'>Tyre Change</option>
				</Form.Control>
			</Form.Group>
			<div key={`job_type-errors-${errorKey}`}>
				{errors.job_type?.map((message, index) => (
					<TimedAlert
						key={index}
						message={message}
						variant='warning'
						timeout={3000}
					/>
				))}
			</div>

			{/* Job Details Field */}
			<Form.Group controlId='job_details'>
				<Form.Label>Job Details:</Form.Label>
				<Form.Control
					as='textarea'
					name='job_details'
					rows={2}
					value={job_details}
					onChange={handleChange}
					className={styles.FormControl}
				/>
			</Form.Group>
			<div key={`job_details-errors-${errorKey}`}>
				{errors.job_details?.map((message, index) => (
					<TimedAlert
						key={index}
						message={message}
						variant='warning'
						timeout={3000}
					/>
				))}
			</div>

			{/* Assigned To Field */}
			<Form.Group controlId='assigned_to'>
				<Form.Label>Assigned to:</Form.Label>
				<Form.Control
					as='select'
					name='assigned_to'
					value={assigned_to}
					onChange={handleChange}
					isrequired='true'
					className={styles.FormControl}>
					<option>Choose a user</option>
					{users.map((user) => (
						<option
							key={user.id}
							value={user.id}>
							{user.owner}
						</option>
					))}
				</Form.Control>
			</Form.Group>
			<div key={`assigned_to-errors-${errorKey}`}>
				{errors.assigned_to?.map((message, index) => (
					<TimedAlert
						key={index}
						message={message}
						variant='warning'
						timeout={3000}
					/>
				))}
			</div>

			{/* Due Date Field */}
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

			{/* Status Field */}
			<Form.Group controlId='status'>
				<Form.Label>Status:</Form.Label>
				<Form.Control
					as='select'
					name='status'
					value={status}
					onChange={handleChange}
					className={styles.FormControl}>
					<option>Select status</option>
					<option value='Pending'>Pending</option>
					<option value='Underway'>Underway</option>
					<option value='Completed'>Completed</option>
					<option value='Overdue'>Overdue</option>
				</Form.Control>
			</Form.Group>
			<div key={`status-errors-${errorKey}`}>
				{errors.status?.map((message, index) => (
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
		<Container className={styles.AddEditJobForm}>
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
								className={`fa-solid fa-pencil ${styles.AddJobIcon}`}
								aria-hidden='true'>
								{" "}
							</i>
							Edit Job Form
						</p>

						<Form onSubmit={(e) => e.preventDefault()}>
							<div>
								{textFields}

								<Card>
									{/* Image & Image Change Field */}
									<Form.Group className='text-center'>
										{image ? (
											<>
												<figure>
													<Image
														className={styles.Image}
														src={image}
														rounded
														alt='Job Image'
													/>
												</figure>
												<div key={`image-errors-${errorKey}`}>
													{errors.image?.map((message, index) => (
														<TimedAlert
															key={index}
															message={message}
															variant='warning'
															timeout={3000}
														/>
													))}
												</div>

												<div>
													<Form.Label
														className='d-flex justify-content-center'
														htmlFor='image-upload'>
														<div className={styles.UploadIcon}>
															<i
																className='fa-solid fa-arrow-up-from-bracket'
																aria-hidden='true'></i>
															<p>Change image</p>
														</div>
													</Form.Label>
												</div>
											</>
										) : (
											<div className='d-flex justify-content-center'>
												<Form.Label
													className='d-flex justify-content-center'
													htmlFor='image-upload'>
													<div className={styles.UploadIcon}>
														<i
															className='fa-solid fa-arrow-up-from-bracket'
															aria-hidden='true'></i>
														<p>Upload an image</p>
													</div>
												</Form.Label>
											</div>
										)}
										<div className='d-flex justify-content-center'>
											<Form.File
												id='image-upload'
												accept='image/*'
												ref={imageInput}
												onChange={handleUploadImage}
											/>
										</div>
									</Form.Group>
								</Card>
							</div>
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
										onClick={handleSubmit}>
										Update Job
									</Button>
								</Col>
								<Col
									md='auto'
									className={styles.BtnContainer}>
									<Button
										variant='danger'
										onClick={handleDelete}>
										Delete Job
									</Button>
								</Col>
							</Row>
						</Form>

						{/* Confirmation Modal */}
						<ConfirmationModal
							showModal={showConfirmationModal}
							handleClose={handleModalClose}
							handleConfirm={handleModalConfirm}
							title={confirmationModalContent.title}
							body={confirmationModalContent.body}
						/>
					</Card>
				</div>
			</Col>
		</Container>
	);
}

export default EditJobForm;
