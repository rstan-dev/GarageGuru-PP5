import React, { useEffect, useState, useRef } from "react";
import { useHistory } from "react-router-dom";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";
import { Image } from "react-bootstrap";
import styles from "../../styles/EditProfile.module.css"

import { useCurrentUser, useSetCurrentUser } from "../../contexts/CurrentUserContext";
import { axiosReq } from "../../api/axiosDefaults";
import { Link } from "react-router-dom";

const EditProfileForm = () => {
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();
  const currentUserId = currentUser?currentUser.pk : null;
  const history = useHistory();
  const imageFile = useRef();



  const [editProfileData, setEditProfileData] = useState({
    name: "",
    bio: "",
    image: "",
    });

  const {name, bio, image} = editProfileData

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const handleMount = async () => {
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
        history.push("/profile")
      }
    };
    handleMount();
  }, [currentUserId, history]);

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

    if (imageFile?.current?.files[0]) {
      formData.append("image", imageFile?.current?.files[0]);
    }
    console.log("FormData:", formData);

    try {
      const { data } = await axiosReq.put(`/profiles/${currentUserId}/`, formData);
      setCurrentUser((currentUser) => ({
        ...currentUser,
        profile_image: data.image,
      }));
      setSuccessMessage('Profile updated successfully');
      console.log("FormData afterupate:", formData)
      setTimeout(() => {
        setSuccessMessage('');
        history.goBack();
      }, 1500);

    } catch (err) {
      setErrors(err.response?.data);
    }
  };


return (
      <Container className={styles.EditProfileForm}>
            <Col xs={12} sm={12} md={8} lg={6} xl={6} className="mx-auto">
                {/* Display success message */}
                {successMessage && <Alert variant="success">{successMessage}</Alert>}

                {/* Display error messages */}
                {errors.name && <Alert variant="danger">{errors.name[0]}</Alert>}
                {errors.bio && <Alert variant="danger">{errors.bio[0]}</Alert>}

                <h1> Edit Profile</h1>

                <Form onSubmit={(handleSubmit)}>
                    <Form.Group>
                    {image && (
                      <figure>
                        <Image
                        src={image}
                        fluid
                        roundedCircle />
                      </figure>
                    )}
                    {errors?.image?.map((message, idx) => (
                      <Alert variant="warning" key={idx}>
                        {message}
                      </Alert>
                    ))}
                    <div>
                      <Form.Label htmlFor="image-upload">
                        <i className="fas fa-upload"></i>
                        Change Profile Image
                      </Form.Label>
                    </div>

                    <Form.File
                      id="image-upload"
                      ref={imageFile}
                      accept="image/*"
                      onChange={(e) => {
                        if (e.target.files.length) {
                          setEditProfileData({
                            ...editProfileData,
                            image: URL.createObjectURL(e.target.files[0]),
                          });
                        }
                      }}
                    />

                    </Form.Group>
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

            </Col>

    </Container>

)

}

export default EditProfileForm;