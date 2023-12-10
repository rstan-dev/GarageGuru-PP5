import React, { useState, useRef } from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import Alert from "react-bootstrap/Alert";
import TimedAlert from "../../components/TimedAlert";
import styles from "../../styles/AddEditComment.module.css";

import { axiosRes } from "../../api/axiosDefaults";
import { useCurrentUser } from "../../contexts/CurrentUserContext";

/**
 * AddReplyCommentForm Component
 *
 * This component renders a form for adding reply comments to a specific parent comment.
 * It handles the state of the reply input and submits the new reply to the server.
 **/
function AddReplyCommentForm(props) {
	const { jobId, id, setComments, setCommentsCount } = props;

	// State for managing the input of the new reply comment, and success
	// messages, errors, and error key to trigger update.
	const [comment_detail, setComment_detail] = useState("");
	const [successMessage, setSuccessMessage] = useState("");
	const [errors, setErrors] = useState({});
	const [errorKey, setErrorKey] = useState(0);

	const successTimeoutRef = useRef();
	const isMountedRef = useRef(true);

	// Parent comment ID and job ID for the reply.
	const parent = id;
	const job = jobId;

	// Fetches current user details for the reply comment.
	const currentUser = useCurrentUser();
	const profileImage = currentUser?.profile_image;
	const profileName = currentUser?.username;

	/**
	 * Handles change events on the reply input field.
	 **/
	const handleChange = (event) => {
		setComment_detail(event.target.value);
	};

	/**
	 * Handles the submission of the new reply comment.
	 * Validates the presence of a parent comment ID before submission.
	 * On successful submission, updates the comments list and count, and resets the input field.
	 * Logs errors in case of a failure.
	 **/
	const handleSubmit = async (event) => {
		event.preventDefault();

		// Validates if there is a parent id.
		if (!parent) {
			console.error("No parent comment ID provided for the reply");
			return;
		}

		let formErrors = {};

		if (
			!comment_detail ||
			comment_detail === "add a reply to this comment..."
		) {
			formErrors.comment_detail = [
				"A comment is required. Please add a comment.",
			];
		}

		if (Object.keys(formErrors).length > 0) {
			setErrorKey((prevKey) => prevKey + 1);
			setErrors(formErrors);
			return;
		}

		try {
			const payload = {
				comment_detail,
				job,
				parent,
			};

			// Submits post request to server.
			const { data } = await axiosRes.post("/comments/", payload);

			const formattedReply = {
				// Format the data as required in renderReplies.
				...data,
				reply_id: data.id,
				reply_owner: data.owner,
				reply_comment_detail: data.comment_detail,
				reply_created_at: data.created_at,
				reply_updated_at: data.updated_at,
				parent: data.parent,
			};

			if (isMountedRef.current) {
				setComments((prevComments) => {
					// Map through the existing comments, add the replies to comment id
					// that matches the parent id.
					const updatedComments = prevComments.results.map((comment) => {
						if (comment.id === parent) {
							const updatedReplies = [formattedReply, ...comment.replies];
							return {
								...comment,
								replies: updatedReplies,
							};
						}
						return comment;
					});

					// Return the updated state.
					return {
						...prevComments,
						results: updatedComments,
					};
				});

				// Increments the comments count and resets the input field.
				setCommentsCount((prevCount) => prevCount + 1);

				// Sets the success message with timeout
				setSuccessMessage("Comment has been added successfully");
				successTimeoutRef.current = setTimeout(() => {
					setSuccessMessage("");
				}, 2500);

				// Reset the comment input field
				setComment_detail("");
			}
		} catch (err) {
			console.log(err);
			setErrors({ message: ["There was an error submitting the form."] });
		}
	};

	return (
		<div className={styles.ReplyCommentArea}>
			{/* Display success message */}
			{successMessage && (
				<Alert
					className={styles.SuccessMessage}
					variant='success'>
					{successMessage}
				</Alert>
			)}
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
				<div className='col-8'>
					<Form onSubmit={handleSubmit}>
						<Form.Group>
							<Form.Control
								placeholder='add a reply to this comment...'
								as='textarea'
								value={comment_detail}
								onChange={handleChange}
								rows={2}
								className={styles.FormControl}
							/>
						</Form.Group>
						<div key={errorKey}>
							{errors?.comment_detail?.map((message, index) => (
								<TimedAlert
									key={index}
									message={message}
									variant='warning'
									timeout={3000}
								/>
							))}
						</div>
						<div className={`text-right ${styles.SubmitButton}`}>
							<Button
								variant='outline-success'
								type='submit'
								size='sm'>
								Reply To Comment
							</Button>
						</div>
					</Form>
				</div>
			</div>
		</div>
	);
}

export default AddReplyCommentForm;
