import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";
import styles from "../../styles/EditProfile.module.css"

import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { axiosReq } from "../../api/axiosDefaults";
import { Link } from "react-router-dom";

const EditProfileForm = () => {
  const currentUser = useCurrentUser();
  const currentUserId = currentUser?currentUser.pk : null;
  const history = useHistory();


  const [editProfileData, setEditProfileData] = useState({
    name: "",
    bio: "",
    image: "",
    });

  const {name, bio, image} = editProfileData

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const fetchprofileData = async () => {
      try {
        const {data} = await axiosReq.get(`/profiles/${currentUserId}/`)
        const { name, bio, image } = data;
        setEditProfileData({
          name,
          bio,
          image,
          });
      } catch(error) {
        console.log(error)
      }
    };
    fetchprofileData();
  }, [currentUserId]);

  const handleChange = (event) => {
    setEditProfileData({
      ...editProfileData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("bio", bio);

    try {
      await axiosReq.put(`/profiles/${currentUserId}/`, formData);
      setSuccessMessage('Profile updated successfully');
      setTimeout(() => {
        setSuccessMessage('');
        history.push('/profile');
      }, 1500);

    } catch (err) {
      setErrors(err.response?.data);
    }
  };


return (
      <Container className={styles.EditProfileForm}>
            <Col xs={12} sm={12} md={8} lg={6} xl={6} className="mx-auto">
                <h1> Edit Profile</h1>
                <h2>Profile Image (placeholder)</h2>

                <Form onSubmit={(handleSubmit)}>
                    <Form.Group controlId="name">
                        <Form.Label>Update Name</Form.Label>
                        <Form.Control
                            as="input"
                            type="text"
                            name="name"
                            value={name}
                            onChange={handleChange}
                            />
                    </Form.Group>
                    <Form.Group controlId="bio">
                        <Form.Label>Update Bio</Form.Label>
                        <Form.Control
                            as="textarea"
                            name="bio"
                            value={bio}
                            rows={7}
                            onChange={handleChange}
                            />
                    </Form.Group>
                    <Button
                      variant="success"
                      type="submit">
                      Update
                    </Button>
                    <Link to="/profile">
                      <Button variant="warning">
                        Cancel
                      </Button>
                    </Link>
                </Form>
                {/* Display success message */}
                {successMessage && <Alert variant="success">{successMessage}</Alert>}

                {/* Display error messages */}
                {errors.name && <Alert variant="danger">{errors.name[0]}</Alert>}
                {errors.bio && <Alert variant="danger">{errors.bio[0]}</Alert>}
            </Col>

    </Container>

)

}

export default EditProfileForm;