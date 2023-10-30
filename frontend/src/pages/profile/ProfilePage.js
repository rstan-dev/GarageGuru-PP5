import React, { useEffect, useState } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { Link, useHistory } from "react-router-dom";
import { Image } from "react-bootstrap";

import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { axiosReq } from "../../api/axiosDefaults";

const ProfilePage = () => {
    const currentUser = useCurrentUser();
    const currentUserId = currentUser?currentUser.pk : null;
    const history = useHistory();


    const [profileData, setProfileData] = useState({
      id: '',
      name: '',
      bio: '',
      image: '',
      created_at: '',
      is_owner: false,
    })

    const { id, name, bio, image, created_at, is_owner } = profileData;

    useEffect(() => {
      const fetchprofileData = async () => {
        try {
          const { data } = await axiosReq.get(`/profiles/${currentUserId}/`);
          const { id, name, bio, image, created_at, is_owner } = data;
          setProfileData({
            id,
            name,
            bio,
            image,
            created_at,
            is_owner,
          });
        } catch (error) {
          console.log(error);
        }
      };

      // Fetch initial profile data when the component mounts
      fetchprofileData();
    }, [currentUserId]);

    useEffect(() => {
      if (!currentUser) {
        history.push("/login");
      } else {
        const fetchUpdatedProfileData = async () => {
          try {
            const { data } = await axiosReq.get(`/profiles/${currentUserId}/`);
            const { id, name, bio, image, created_at, is_owner } = data;
            setProfileData({
              id,
              name,
              bio,
              image,
              created_at,
              is_owner,
            });
          } catch (error) {
            console.log(error);
          }
        };

        if (!currentUser) {
          history.push("/signin");
        }

        fetchUpdatedProfileData();
      }
    }, [currentUserId, currentUser, history]);

    return (
         <Container>
      <Row>
        <Col md={4}>
          <div className="profile-image">
            <h1>Profile Page </h1>
            <h2>Username: Welcome {currentUser?.username}! </h2>
            <Image
              src={image}
              alt="Profile"
              roundedCircle
              fluid
            />
          </div>
        </Col>
        <Col md={8}>
          <div className="profile-info">
            <p>
              Name: {name}
            </p>
            <p>
              Bio: {bio}
            </p>
            <p>
              Created: {created_at}
            </p>
            <p>User Id: {id}</p>
            <p>
              is_owner: {is_owner ? "true" : "false"}
            </p>
            <Link to="/profile/edit-profile">
              <Button
                variant="warning">
                Edit Profile
              </Button>
            </Link>
            <Link to="/profile/change-username">
                <Button variant="warning">
                  Edit Username
                </Button>
            </Link>
            <Link to="/profile/change-password">
              <Button variant="warning">
                Edit Password
              </Button>
            </Link>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ProfilePage;