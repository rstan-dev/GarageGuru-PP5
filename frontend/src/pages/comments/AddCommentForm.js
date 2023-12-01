import React, { useState } from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import styles from "../../styles/AddEditComment.module.css"

import { axiosRes } from "../../api/axiosDefaults";

function AddCommentForm(props) {
  const { job, setJob, setComments, setCommentsCount, profileImage, profileName } = props;
  const [comment_detail, setComment_detail] = useState("");

  const handleChange = (event) => {
    setComment_detail(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axiosRes.post("/comments/", {
        comment_detail,
        job,
      });
      setComments((prevComments) => ({
        ...prevComments,
        results: [data, ...prevComments.results],
      }));
      setCommentsCount(prevCount => prevCount + 1);
      setJob((prevJob) => ({
        results: [
          {
            ...prevJob.results[0],
          },
        ],
      }));
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

export default AddCommentForm;