import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import ProfilePage from "./ProfilePage";

const EditProfileForm = ( {profilePageData} ) => {
    const [profileData, setProfileData] = useState({
        name: profilePageData.name,
        bio: profilePageData.bio,
        image: profilePageData.image
      });

    const { name, bio } = profileData;

    const history = useHistory();

    const handleChange = (event) => {
        setProfileData({
          ...profileData,
          [event.target.name]: event.target.value,
        });
      };

      const textFields = (
        <>
          <Form.Group>
            <Form.Label>Change Name:</Form.Label>
            <Form.Control
              as="text"
              value={name}
              onChange={handleChange}
              name="content"
              rows={7}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Change Bio:</Form.Label>
            <Form.Control
              as="textarea"
              value={bio}
              onChange={handleChange}
              name="content"
              rows={7}
            />
          </Form.Group>

          <Button
            variation="danger"
            onClick={() => history.goBack()}
          >
            Cancel
          </Button>
          <Button
            variation="sucess"
            type="submit">
            Update
          </Button>
        </>
      );

return (
    <Form>
        <Row>
            <Col className="py-2 p-0 p-md-2 text-center" md={7} lg={6}>
                <Container >
                        <div className="d-md-none">
                            {textFields}
                        </div>
                </Container>
            </Col>
          </Row>

    </Form>
)

}

export default EditProfileForm;