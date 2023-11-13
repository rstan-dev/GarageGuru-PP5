import React, { useState } from "react";

import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import styles from "../../styles/Comment.module.css"

import { axiosRes } from "../../api/axiosDefaults";

function AddCommentForm(props) {
  const { job, setJob, setComments, profileImage, profileName } = props;
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
    <Form className="mt-2" onSubmit={handleSubmit}>
      <Form.Group>
        <InputGroup className={styles.CommentArea}>
            <div className={`row ${styles.ProfileSection}`}>
              <div className="col">
                <Image
                  className={styles.ProfileImage}
                  src={profileImage}
                  alt="Profile"
                  fluid
                />
                <div className="col">
                  <p className={styles.ProfileName}>{profileName}</p>
                </div>
              </div>
            </div>
          <Form.Control
            placeholder="add a comment..."
            as="textarea"
            value={comment_detail}
            onChange={handleChange}
            rows={2}
          />
        </InputGroup>
      </Form.Group>
      <div className="text-right">
        <Button
          variant="success"
          type="submit"
        >
          Submit
        </Button>
      </div>
    </Form>
  );
}

export default AddCommentForm;