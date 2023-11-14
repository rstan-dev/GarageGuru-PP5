import React, { useState } from 'react'
import { axiosRes } from '../../api/axiosDefaults';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const EditCommentForm = (props) => {
  const {
    id,
    comment_detail,
    setDisplayEditForm,
    setComments,
  } = props;

  const [formContent, setFormContent] = useState(comment_detail);

  const handleChange = (event) => {
    setFormContent(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axiosRes.put(`/comments/${id}/`, {
        comment_detail: formContent.trim(),
      });
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
      setDisplayEditForm(false);
    } catch (err) {
      console.log(err);
    }
  };


  return (
    <Form onSubmit={handleSubmit}>
        <Form.Group className="pr-1">
          <Form.Control
            as="textarea"
            value={formContent}
            onChange={handleChange}
            rows={2}
          />
        </Form.Group>
        <div className="text-right">
          <Button
            variant="warning"
            onClick={() => setDisplayEditForm(false)}
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
        </div>
      </Form>
  )
}

export default EditCommentForm