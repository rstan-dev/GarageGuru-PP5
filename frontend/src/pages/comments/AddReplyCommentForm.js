import React, { useState } from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
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

	// State for managing the input of the new reply comment.
	const [comment_detail, setComment_detail] = useState("");

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
