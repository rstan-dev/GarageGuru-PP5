import React, { useState, useEffect, useRef } from "react";
import { axiosRes } from "../../api/axiosDefaults";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import ConfirmationModal from "../../components/ConfirmationModal";

/**
 * EditCommentForm Component
 *
 * This component renders a form for editing or deleting comments and replies.
 * It manages form submission, delete confirmation, and displays success or error messages.
 **/
const EditCommentForm = (props) => {
	// Destructure props
	const {
		id,
		comment_detail,
		setDisplayEditForm,
		setComments,
		setCommentsCount,
		isReply,
		parentCommentId,
	} = props;

	// State for managing form errors, success messages, form content,
	// displaying the confirmation modal and managing its content.
	const [errors, setErrors] = useState({});
	const [successMessage, setSuccessMessage] = useState("");
	const [formContent, setFormContent] = useState(comment_detail);
	const [showConfirmationModal, setShowConfirmationModal] = useState(false);
	const [confirmationModalContent, setConfirmationModalContent] = useState({
		title: "",
		body: "",
		confirmAction: () => {},
	});

	const successTimeoutRef = useRef();
	const isMountedRef = useRef(true);

	// useEffect for handling component mount and unmount
	useEffect(() => {
		return () => {
			isMountedRef.current = false;
			if (successTimeoutRef.current) {
				clearTimeout(successTimeoutRef.current);
			}
		};
	}, []);

	/**
	 * Handles changes to form.
	 **/
	const handleChange = (event) => {
		setFormContent(event.target.value);
	};

	// puts changes to comment api endpoint and resets the
	// updated_time.
	// First checks for isReply to update comment replies, else
	// it updates parent comments.
	const handleSubmit = async (event) => {
		event.preventDefault();
		try {
			await axiosRes.put(`/comments/${id}/`, {
				comment_detail: formContent.trim(),
			});

			if (isMountedRef.current) {

			if (isReply && parentCommentId) {
				setComments((prevComments) => {
					// update comment replies
					const updatedComments = prevComments.results.map((comment) => {
						if (comment.id === parentCommentId) {
							const updatedReplies = comment.replies.map((reply) => {
								if (reply.reply_id === id) {
									return {
										...reply,
										reply_comment_detail: formContent.trim(),
										updated_at: "now",
									};
								}
								return reply;
							});
							return { ...comment, replies: updatedReplies };
						}
						return comment;
					});
					return { ...prevComments, results: updatedComments };
				});
			} else {
				// update parent comments
				setComments((prevComments) => ({
					...prevComments,
					results: prevComments.results.map((comment) => {
						return comment.id === id
							? {
									...comment,
									comment_detail: formContent.trim(),
									updated_at: "now",
							  }
							: comment;
					}),
				}));
			}

				setDisplayEditForm();
			}
		} catch (err) {
			if (isMountedRef.current) {
				console.log(err);
				setErrors({ message: ["There was an error updating this comment."] });
			}
		}
	};

	/**
	 * Handles the delete button
	 **/
	const handleDelete = async () => {
		if (isMountedRef.current) {
			setConfirmationModalContent({
				title: "Confirm Comment Deletion",
				body: "Are you sure you want to delete this comment? This action cannot be undone.",
				confirmAction: handleDeleteConfirm, // Reference to the function that performs the delete
			});
			setShowConfirmationModal(true);
		}
	};

	/**
	 * Submits the delete request after modal confirmation
	 **/
	const handleDeleteConfirm = async () => {
		try {
			await axiosRes.delete(`/comments/${id}/`);

			if (isMountedRef.current) {
				setComments((prevComments) => {
					// If it's a reply, filter out the reply from the corresponding parent comment
					if (isReply && parentCommentId) {
					  return {
						...prevComments,
						results: prevComments.results.map((comment) => {
						  if (comment.id === parentCommentId) {
							return {
							  ...comment,
							  replies: comment.replies.filter((reply) => reply.id !== id),
							};
						  }
						  return comment;
						}),
					  };
					} else {
					  // If it's a parent comment, filter it out directly from the results
					  return {
						...prevComments,
						results: prevComments.results.filter((comment) => comment.id !== id),
					  };
					}
				});

				// Decrement the comments count
				setCommentsCount((prevCount) => prevCount - 1);

				// Sets the success message with timeout
				setSuccessMessage("Comment has been deleted successfully");
				successTimeoutRef.current = setTimeout(() => {
					setSuccessMessage("");
				}, 1500);
				setShowConfirmationModal(false);
				setDisplayEditForm();
			}
		} catch (err) {
			if (isMountedRef.current) {
				console.log(err);
				setErrors({ message: ["There was an error deleting the comment."] });
			}
		}
		setShowConfirmationModal(false);
		setDisplayEditForm();
	};

	/**
	 * Handles modal's confirmation
	 **/
	const handleModalConfirm = () => {
		if (isMountedRef.current) {
			confirmationModalContent.confirmAction();
		}
	};

	/**
	 * Close the modal without taking action
	 **/
	const handleModalClose = () => {
		if (isMountedRef.current) {
			setShowConfirmationModal(false);
		}
	};

	return (
		<>
			{/* Display success message */}
			{successMessage && <Alert variant='success'>{successMessage}</Alert>}
			<Form onSubmit={handleSubmit}>
				<Form.Group>
					<Form.Control
						as='textarea'
						value={formContent}
						onChange={handleChange}
						rows={2}
						name='comments'
					/>
				</Form.Group>
				{/* Display errors */}
				{errors?.comments?.map((message, index) => (
					<Alert
						variant='danger'
						key={index}>
						{message}
					</Alert>
				))}
				<div className='text-right'>
					<Button
						variant='warning'
						onClick={() => setDisplayEditForm()}
						type='button'>
						Cancel
					</Button>
					<Button
						variant='success'
						disabled={!comment_detail.trim()}
						type='submit'>
						Save
					</Button>
					<Button
						variant='danger'
						onClick={handleDelete}>
						Delete
					</Button>
				</div>
			</Form>
			{/* Confirmation Modal */}
			<ConfirmationModal
				showModal={showConfirmationModal}
				handleClose={handleModalClose}
				handleConfirm={handleModalConfirm}
				title={confirmationModalContent.title}
				body={confirmationModalContent.body}
			/>
		</>
	);
};

export default EditCommentForm;
