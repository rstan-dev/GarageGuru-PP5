import React, { useEffect, useState, useRef } from "react";
import { useHistory, useParams } from "react-router-dom";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Alert from "react-bootstrap/Alert";
import { Image } from "react-bootstrap";
import styles from "../../styles/EditProfile.module.css";

import {
	useCurrentUser,
	useSetCurrentUser,
} from "../../contexts/CurrentUserContext";
import { axiosReq } from "../../api/axiosDefaults";
import { Link } from "react-router-dom";
import ConfirmationModal from "../../components/ConfirmationModal";

/**
 * EditProfileForm Component
 *
 * This component renders a form for editing a user's profile.
 * It includes functionality for updating profile data, handling form submission,
 * performing validation, managing success and error messages, and confirming updates via a modal.
 */
const EditProfileForm = () => {
	// Fetching current user details and setting function for state updates.
	const currentUser = useCurrentUser();
	const setCurrentUser = useSetCurrentUser();
	const currentUserId = currentUser ? currentUser.pk : null;

	// Extracting profile ID from URL parameters.
	const { id } = useParams();

	// Initializing state for profile edit data.
	const [editProfileData, setEditProfileData] = useState({
		name: "",
		bio: "",
		image: "",
	});

	const { name, bio, image } = editProfileData;

	// State for managing form errors and success messages, displaying confirmation
	// modal and its content.
	const [errors, setErrors] = useState({});
	const [successMessage, setSuccessMessage] = useState("");
	const [showConfirmationModal, setShowConfirmationModal] = useState(false);
	const [confirmationModalContent, setConfirmationModalContent] = useState({
		title: "",
		body: "",
		confirmAction: () => {},
	});

	const history = useHistory();
	const imageFile = useRef();

	/**
	 * Fetches original profile data on component mount to populate the form.
	 * Handles redirection based on user authentication and authorization.
	 */
	useEffect(() => {
		let isMounted = true; // Flag to track if the component is mounted.

		const handleMount = async () => {
			try {
				const { data } = await axiosReq.get(`/profiles/${id}/`);
				const { name, bio, image } = data;
				if (isMounted) {
					setEditProfileData({
						name,
						bio,
						image,
					});
				}
			} catch (err) {
				console.log(err);
				if (err.response?.status === 401) {
					history.push("/login");
				} else {
					history.push("/");
				}
			}
		};

		if (!currentUser || currentUserId !== parseInt(id)) {
			history.push("/");
		}

		handleMount();
		return () => {
			isMounted = false; // Set the flag to false when the component unmounts.
		};
	}, [currentUserId, currentUser, history, id]);

	/**
	 * Handles changes to any of the form fields.
	 **/
	const handleChange = (event) => {
		setEditProfileData({
			...editProfileData,
			[event.target.name]: event.target.value,
		});
	};

	/**
	 * Handles form submission to update the profile.
	 * Sets confirmation modal content and shows the modal.
	 **/
	const handleSubmit = (event) => {
		event.preventDefault();

		setConfirmationModalContent({
			title: "Confirm Profile Update",
			body: "Are you sure you want to update your profile?",
			confirmAction: handleUpdateConfirm, // References the function that performs the update.
		});
		setShowConfirmationModal(true);
	};

	/**
	 * Handles profile update confirmation and performs the API request.
	 * Updates the profile data and manages success messages.
	 */
	const handleUpdateConfirm = async (event) => {
		const formData = new FormData();
		formData.append("name", name);
		formData.append("bio", bio);

		if (imageFile?.current?.files[0]) {
			formData.append("image", imageFile?.current?.files[0]);
		}

		try {
			const { data } = await axiosReq.put(`/profiles/${id}/`, formData);
			setCurrentUser((currentUser) => ({
				...currentUser,
				profile_image: data.image,
			}));
			setSuccessMessage("Profile updated successfully");
			setTimeout(() => {
				setSuccessMessage("");
				history.goBack();
			}, 1500);
		} catch (err) {
			setErrors(err.response?.data);
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

	return (
		<Container className={styles.EditProfileForm}>
			<Col
				xs={12}
				sm={12}
				md={8}
				lg={8}
				xl={8}
				className='mx-auto'>

        		{/* Display success message */}
				{successMessage && <Alert variant='success'>{successMessage}</Alert>}

				{/* Display error messages */}
				{errors.name && <Alert variant='danger'>{errors.name[0]}</Alert>}
				{errors.bio && <Alert variant='danger'>{errors.bio[0]}</Alert>}

				<div className={styles.CardBlock}>
					<Card className={styles.FormCard}>
						<div
							className={`d-flex flex-column align-items-center ${styles.Intro}`}>
							<h1>
								<i className={`fa-solid fa-pencil ${styles.EditProfileIcon}`}>
									{" "}
								</i>
								Edit Profile Page
							</h1>
						</div>

						<Form onSubmit={(e) => e.preventDefault()}>
							<Card className={styles.ImageUploadContainer}>
								<Form.Group className='text-center'>
									{image && (
										<figure>
											<Image
												src={image}
												fluid
											/>
										</figure>
									)}
									{errors?.image?.map((message, idx) => (
										<Alert
											variant='warning'
											key={idx}>
											{message}
										</Alert>
									))}
									<div>
										<Form.Label
											className='d-flex justify-content-center'
											htmlFor='image-upload'>
											<div className={styles.UploadIcon}>
												<i className='fas fa-upload'></i>
												Change Profile Image
											</div>
										</Form.Label>
									</div>
									<div className='d-flex justify-content-center'>
										<Form.File
											id='image-upload'
											ref={imageFile}
											accept='image/*'
											onChange={(e) => {
												if (e.target.files.length) {
													setEditProfileData({
														...editProfileData,
														image: URL.createObjectURL(e.target.files[0]),
													});
												}
											}}
										/>
									</div>
								</Form.Group>
							</Card>
							<Form.Group controlId='name'>
								<Form.Label>Update Name</Form.Label>
								<Form.Control
									as='input'
									type='text'
									name='name'
									value={name}
									onChange={handleChange}
									className={styles.FormControl}
								/>
							</Form.Group>
							<Form.Group controlId='bio'>
								<Form.Label>Update Bio</Form.Label>
								<Form.Control
									as='textarea'
									name='bio'
									value={bio}
									rows={4}
									onChange={handleChange}
									className={styles.FormControl}
								/>
							</Form.Group>

							<Row className='justify-content-center'>
								<Col
									md='auto'
									className={styles.BtnContainer}>
									<Link to={`/profile/${id}`}>
										<Button variant='warning'>Cancel</Button>
									</Link>
								</Col>
								<Col
									md='auto'
									className={styles.BtnContainer}>
									<Button
										variant='success'
										onClick={handleSubmit}>
										Update Profile
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
};

export default EditProfileForm;
