import React, { useState } from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import styles from "../../styles/AddEditComment.module.css"

import { axiosRes } from "../../api/axiosDefaults";
import { useCurrentUser } from "../../contexts/CurrentUserContext";

function AddReplyCommentForm(props) {
  const { id, setComments, setCommentsCount } = props;
  const [comment_detail, setComment_detail] = useState("");
  const parent = id;
  const currentUser = useCurrentUser();
  const profileImage = currentUser?.profile_image
  const profileName = currentUser?.username

  console.log(`Parent ID: ${parent}` )

  const handleChange = (event) => {
    setComment_detail(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!parent) {
      console.error("No parent comment ID provided for the reply");
      return;
    }

    try {
      const payload = {
        comment_detail,
        parent,
      };


      const { data } = await axiosRes.post("/comments/", payload);

      setComments(prevComments => {
        // Find the parent comment and update its replies array
        const updatedComments = prevComments.map(comment => {
          if (comment.id === parent) {
            return { ...comment, replies: [...comment.replies, data] };
          }
          return comment;
        });

        return { ...prevComments, results: updatedComments };
      });
      setComment_detail("");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={styles.CommentArea}>
        <div className="row">
            <div className={`col ${styles.ProfileSection}`}>
              <Image
                  className={styles.ProfileImage}
                  src={profileImage}
                  alt="Profile"
                  fluid
              />
              <p className={styles.ProfileName}>
                  {profileName}
              </p>
            </div>
            <div className="col-10">
              <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Control
                      placeholder="add a comment..."
                      as="textarea"
                      value={comment_detail}
                      onChange={handleChange}
                      rows={2}
                    />
                </Form.Group>
                <div className={`text-right ${styles.SubmitButton}`}>
                  <Button
                    variant="success"
                    type="submit"
                  >
                    Add Comment
                  </Button>
                </div>
              </Form>
            </div>

        </div>
    </div>
  );
}

export default AddReplyCommentForm;