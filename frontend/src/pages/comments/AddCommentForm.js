import React, { useState } from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
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

	// State for managing the input of the new comment.
	const [comment_detail, setComment_detail] = useState("");

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

			// Reset the comment input field
			setComment_detail("");
		} catch (err) {
			console.log(err);
		}
	};

	return (
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
							/>
						</Form.Group>
						<div className={`text-right ${styles.SubmitButton}`}>
							<Button
								variant='success'
								type='submit'>
								Add Comment
							</Button>
						</div>
					</Form>
				</div>
			</div>
		</div>
	);
}

export default AddCommentForm;
