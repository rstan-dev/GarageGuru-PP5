import React, { useState, useEffect } from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";

import { useCurrentUser, useSetCurrentUser } from "../../contexts/CurrentUserContext";
import { axiosRes } from "../../api/axiosDefaults";
import { useHistory } from "react-router-dom";


const ChangeUsernameForm = () => {
    const history = useHistory();
    const currentUser = useCurrentUser();
    const setCurrentUser = useSetCurrentUser();


    const [username, setUsername] = useState("")

    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState('');

    const handleChange = (event) => {
        setUsername(event.target.value)
        };

    useEffect(() => {
    if (!currentUser) {
      // redirect user if they are not the owner of this profile
      history.push("/login");
    }
    }, [currentUser, history]);

    const handleSubmit = async (event) => {
      event.preventDefault();
      try {
        await axiosRes.put("/dj-rest-auth/user/", {username});
        setCurrentUser((prevUser) => ({
          ...prevUser,
          username,
        }));
        setSuccessMessage('Username updated successfully');
        setTimeout(() => {
          setSuccessMessage('');
          history.goBack();
      }, 1500);
      } catch (err) {
        console.log(err);
        setErrors(err.response?.data);

      }
    };

  return (
    <Row>
      <Col className="py-2 mx-auto text-center" md={6}>
        <Container >
          {/* Display success message */}
          {successMessage && <Alert variant="success">{successMessage}</Alert>}

          {/* Display error messages */}
          {errors.response && <Alert variant="danger">{errors.response[0]}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group>
            {errors?.username?.map((message, index) => (
              <Alert key={index} variant="warning">
                {message}
              </Alert>
            ))}
              <Form.Label>Update username</Form.Label>
              <Form.Control
                placeholder="choose a new username"
                type="text"
                value={username}
                onChange={handleChange}
              />
            </Form.Group>

            <Button
                onClick={() => history.goBack()}
            >
              Cancel
            </Button>
            <Button
              type="submit"
            >
              Update Username
            </Button>
          </Form>
        </Container>
      </Col>
    </Row>
  );
};

export default ChangeUsernameForm;