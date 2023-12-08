import React, { useState, useRef } from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import Alert from "react-bootstrap/Alert";
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

	// State for managing the input of the new comment, and success message.
	const [comment_detail, setComment_detail] = useState("");
	const [successMessage, setSuccessMessage] = useState("");

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
		}
	};

	return (
		<div>
			{/* Display success message */}
			{successMessage && <Alert
				className={styles.SuccessMessage} variant='success'>{successMessage}</Alert>}
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
							<div className='col-10'>
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
