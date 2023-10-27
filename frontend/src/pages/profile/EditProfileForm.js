import React, { useEffect, useState } from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import styles from "../../styles/EditProfile.module.css"

import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { axiosReq } from "../../api/axiosDefaults";

const EditProfileForm = () => {
  const currentUser = useCurrentUser();
  const currentUserId = currentUser?currentUser.pk : null;


  const [editProfileData, setEditProfileData] = useState({
    name: "",
    bio: "",
    image: "",
    });


  const {name, bio, image} = editProfileData

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


return (
      <Container className={styles.EditProfileForm}>
            <Col xs={12} sm={12} md={8} lg={6} xl={6} className="mx-auto">
                <h1> Edit Profile</h1>
                <h2>Profile Image (placeholder)</h2>

                <Form >
                    <Form.Group controlId="name">
                        <Form.Label>Update Name</Form.Label>
                        <Form.Control
                            as="input"
                            type="text"
                            name="name"
                            value={name}
                            />
                    </Form.Group>
                    <Form.Group controlId="bio">
                        <Form.Label>Update Bio</Form.Label>
                        <Form.Control
                            as="textarea"
                            name="bio"
                            value={bio}
                            rows={7}
                            />
                    </Form.Group>
                    <Button
                      variant="success"
                      type="submit">
                      Update
                    </Button>
                    <Button variant="warning">
                      Cancel
                    </Button>
                </Form>
            </Col>

    </Container>

)

}

export default EditProfileForm;