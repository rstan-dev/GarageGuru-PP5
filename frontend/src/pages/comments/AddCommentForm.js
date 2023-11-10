import React, { useState } from "react";

import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";

import { axiosRes } from "../../api/axiosDefaults";

function AddCommentForm(props) {
  const { job, setJob, setComments, profileImage, profileName } = props;
  const [content, setContent] = useState("");

  const handleChange = (event) => {
    setContent(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axiosRes.post("/comments/", {
        content,
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
      setContent("");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Form className="mt-2" onSubmit={handleSubmit}>
      <Form.Group>
        <InputGroup>
            <Image
              src={profileImage}
              alt="Profile"
              roundedCircle
              fluid
            />
            <p>{profileName}</p>
          <Form.Control
            placeholder="add a comment..."
            as="textarea"
            value={content}
            onChange={handleChange}
            rows={2}
          />
        </InputGroup>
      </Form.Group>
      <Button
        variant="success"
        type="submit"
      >
        Submit
      </Button>
    </Form>
  );
}

export default AddCommentForm;