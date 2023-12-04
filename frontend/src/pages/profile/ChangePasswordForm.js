import React, { useState, useEffect } from "react";

import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import styles from "../../styles/ChangeUsernamePassword.module.css"

import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { axiosRes } from "../../api/axiosDefaults";
import { useHistory, useParams } from "react-router-dom";


const ChangePasswordForm = () => {
    const history = useHistory();
    const currentUser = useCurrentUser();
    const currentUserId = currentUser?currentUser.pk : null;
    const {id} = useParams()

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
      if (!currentUser || currentUserId !== parseInt(id)) {
        // redirect user if they are not the owner of this profile
        history.push("/");
    }
    }, [currentUser, history, currentUserId, id]);

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
    <Container className={styles.ProfileForm}>
      <Col xs={12} sm={12} md={8} lg={8} xl={8} className="mx-auto">


          <div className={styles.CardBlock}>
          {/* Display success message */}
          {successMessage && <Alert variant="success">{successMessage}</Alert>}

          <Card className={styles.FormCard}>
                  <div className={`d-flex flex-column align-items-center`}>
                      <p>
                        <i className={`fa-solid fa-pencil ${styles.EditIcon}`}>
                  </i>
                  Change Password
                      </p>
                  </div>

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

            <Row className="justify-content-center">
            <Col md="auto" className={styles.BtnContainer}>
                <Button
                    onClick={() => history.goBack()}
                    variant="warning"
            >
              Cancel
                </Button>
            </Col>
            <Col md="auto" className={styles.BtnContainer}>
                <Button
                    type="submit"
                    variant="success"
            >
              Update Password
                </Button>
            </Col>
                </Row>
            </Form>

            </Card>
        </div>
      </Col>
    </Container>
  );
};

export default ChangePasswordForm;