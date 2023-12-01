import React, { useState, useEffect, useRef } from 'react'
import { axiosRes } from '../../api/axiosDefaults';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from 'react-bootstrap/Alert';
import ConfirmationModal from '../../components/ConfirmationModal';

const EditCommentForm = (props) => {

  // destructure props
  const {
    id,
    comment_detail,
    setDisplayEditForm,
    setComments,
    setCommentsCount,
    isReply,
    parentCommentId,

  } = props;

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const successTimeoutRef = useRef();

  // set state of form
  const [formContent, setFormContent] = useState(comment_detail);

  // set state of confrimation modal components
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [confirmationModalContent, setConfirmationModalContent] = useState({
      title: '',
      body: '',
      confirmAction: () => {},
    });

  // handles changes to form
  const handleChange = (event) => {
    setFormContent(event.target.value);
  };

  // Clears the success message timeout function
  useEffect(() => {
    return () => {
        if (successTimeoutRef.current) {
            clearTimeout(successTimeoutRef.current);
        }
    };
}, []);

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

      if (isReply && parentCommentId) {
        setComments((prevComments) => {
          // update comment replies
          const updatedComments = prevComments.results.map((comment) => {
            if (comment.id === parentCommentId) {
              const updatedReplies = comment.replies.map((reply) => {
                if (reply.reply_id === id) {
                  return { ...reply, reply_comment_detail: formContent.trim(), updated_at: "now" };
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
        setComments((prevComments) => ({
          // update parent comments
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
      };

      setDisplayEditForm();
    } catch (err) {
      console.log(err);
    }
  };

  // Handles the delete button
  const handleDelete = async () => {
    setConfirmationModalContent({
      title: 'Confirm Comment Deletion',
      body: 'Are you sure you want to delete this comment? This action cannot be undone.',
      confirmAction: handleDeleteConfirm, // Reference to the function that performs the delete
      });
  setShowConfirmationModal(true);
  };

  // Submits the delete request after modal confirmation
  const handleDeleteConfirm = async () => {
    try {
    await axiosRes.delete(`/comments/${id}/`);
        setComments((prevComments) => ({
          ...prevComments,
          results: prevComments.results.filter((comment) => comment.id !== id),
        }));
        setCommentsCount(prevCount => prevCount - 1);
        setSuccessMessage('Comment has been deleted successfully');
        successTimeoutRef.current = setTimeout(() => {
            setSuccessMessage('');
        }, 1500);
    } catch (err) {
        console.log(err);
        setErrors({ message: ["There was an error deleting the comment."] });
    };
    setShowConfirmationModal(false);
    setDisplayEditForm();
  };

  // Handles modal's confirmation
  const handleModalConfirm = () => {
    confirmationModalContent.confirmAction();
  };

  // This function will be used to close the modal without taking action
  const handleModalClose = () => {
    setShowConfirmationModal(false);
  };


  return (
    <>
    {/* Display success message */}
    {successMessage && <Alert variant="success">{successMessage}</Alert>}
    <Form onSubmit={handleSubmit}>
        <Form.Group >
          <Form.Control
            as="textarea"
            value={formContent}
            onChange={handleChange}
            rows={2}
            name="comments"
          />
        </Form.Group>
        {errors?.comments?.map((message, index) => (
                <Alert variant="danger" key={index}>
                    {message}
                </Alert>
            ))}
        <div className="text-right">
          <Button
            variant="warning"
            onClick={() => setDisplayEditForm()}
            type="button"
          >
            Cancel
          </Button>
          <Button
            variant="success"
            disabled={!comment_detail.trim()}
            type="submit"
          >
            Save
          </Button>
          <Button
            variant="danger"
            onClick={handleDelete}
            >
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
  )
}

export default EditCommentForm