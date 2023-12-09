import React, { useState, useRef } from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import Alert from "react-bootstrap/Alert";
import TimedAlert from "../../components/TimedAlert";
import styles from "../../styles/AddEditComment.module.css";

import { axiosRes } from "../../api/axiosDefaults";

/**
 * AddCommentForm Component
 *
 * This component renders a form for adding comments to a specific job.
 * It handles the state of the comment input and submits the new comment to the server.
 **/
function AddCommentForm(props) {
	const {
		job,
		setJob,
		setComments,
		setCommentsCount,
		profileImage,
		profileName,
	} = props;

	// State for managing the input of the new comment, and success
	// messages and errors.
	const [comment_detail, setComment_detail] = useState("");
	const [successMessage, setSuccessMessage] = useState("");
	const [errors, setErrors] = useState({});

	const successTimeoutRef = useRef();
	const isMountedRef = useRef(true);

	/**
	 * Handles change events on the comment input field.
	 **/
	const handleChange = (event) => {
		setComment_detail(event.target.value);
	};

	/**
	 * Handles the submission of the new comment.
	 * On successful submission, updates the comments list, comments count,
	 * and resets the comment input field. Logs error in case of a failure.
	 **/
	const handleSubmit = async (event) => {
		event.preventDefault();

		let formErrors = {};

		if (!comment_detail || comment_detail === "add a comment...") {
			formErrors.comment_detail = [
				"A comment is required. Please add a comment.",
			];
		}

		if (Object.keys(formErrors).length > 0) {
			setErrors(formErrors);
			return;
		}

		try {
			const { data } = await axiosRes.post("/comments/", {
				comment_detail,
				job,
			});

			if (isMountedRef.current) {
				// Update the comments list with the new comment
				setComments((prevComments) => ({
					...prevComments,
					results: [data, ...prevComments.results],
				}));

				// Increment the comments count
				setCommentsCount((prevCount) => prevCount + 1);

				// Update the job state to trigger a refresh
				setJob((prevJob) => ({
					results: [
						{
							...prevJob.results[0],
						},
					],
				}));

				// Sets the success message with timeout
				setSuccessMessage("Comment has been added successfully");
				successTimeoutRef.current = setTimeout(() => {
					setSuccessMessage("");
				}, 1500);

				// Reset the comment input field
				setComment_detail("");
			}
		} catch (err) {
			console.log(err);
			setErrors({ message: ["There was an error submitting the form."] });
		}
	};

	return (
		<div>
			{/* Display success message */}
			{successMessage && (
				<Alert
					className={styles.SuccessMessage}
					variant='success'>
					{successMessage}
				</Alert>
			)}
			<div className='card'>
				<div className={`card-body ${styles.CardBody}`}>
					<div className={styles.CommentArea}>
						<div className='row'>
							<div className={`col ${styles.ProfileSection}`}>
								<Image
									className={styles.ProfileImage}
									src={profileImage}
									alt='Profile'
									fluid
								/>
								<p className={styles.ProfileName}>{profileName}</p>
							</div>
							<div className='col-12 col-sm-10'>
								<Form onSubmit={handleSubmit}>
									<Form.Group>
										<Form.Control
											placeholder='add a comment...'
											as='textarea'
											value={comment_detail}
											onChange={handleChange}
											rows={2}
											className={styles.FormControl}
										/>
									</Form.Group>
									{errors?.comment_detail?.map((message, index) => (
										<TimedAlert
											key={index}
											message={message}
											variant='warning'
											timeout={3000}
										/>
									))}
									<div className={`text-right ${styles.SubmitButton}`}>
										<Button
											variant='outline-success'
											type='submit'
											size='sm'>
											Add Comment
										</Button>
									</div>
								</Form>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default AddCommentForm;
