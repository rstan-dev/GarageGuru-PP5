import React, { useState, useEffect } from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";

import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { axiosRes } from "../../api/axiosDefaults";
import { useHistory } from "react-router-dom";


const ChangePasswordForm = () => {
    const history = useHistory();
    const currentUser = useCurrentUser();

    const [userData, setUserData] = useState({
      new_password1: "",
      new_password2: "",
    });
    const { new_password1, new_password2 } = userData;

    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState('');

    const handleChange = (event) => {
        setUserData({
          ...userData,
          [event.target.name]: event.target.value,
        });
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
        await axiosRes.post("/dj-rest-auth/password/change/", userData);
        setSuccessMessage('Password updated successfully');
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

          <Form onSubmit={handleSubmit}>
            <Form.Group>
            {errors?.new_password1?.map((message, index) => (
              <Alert key={index} variant="warning">
                {message}
              </Alert>
            ))}
              <Form.Label>Update password</Form.Label>
              <Form.Control
                placeholder="choose a new password"
                type="password"
                name="new_password1"
                value={new_password1}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group>
            {errors?.new_password2?.map((message, index) => (
              <Alert key={index} variant="warning">
                {message}
              </Alert>
            ))}
              <Form.Label>Confirm password</Form.Label>
              <Form.Control
                placeholder="confirm new password"
                type="password"
                name="new_password2"
                value={new_password2}
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
              Update Password
            </Button>
          </Form>
        </Container>
      </Col>
    </Row>
  );
};

export default ChangePasswordForm;