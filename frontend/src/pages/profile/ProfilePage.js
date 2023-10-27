import React, { useEffect, useState } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import { Image } from "react-bootstrap";
import axios from 'axios';

import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { axiosReq } from "../../api/axiosDefaults";

const ProfilePage = () => {
    const currentUser = useCurrentUser();
    const currentUserId = currentUser?currentUser.id : null;

    const [profileData, setProfileData] = useState({
      id: '',
      name: '',
      bio: '',
      image: '',
      created_at: '',
      is_owner: '',
    })

    const { id, name, bio, image, created_at, is_owner } = profileData;

    useEffect(() => {
      const fetchprofileData = async () => {
        try {
          const {data} = await axiosReq.get(`/profiles/1/`)
          const {id, name, bio, image, created_at, is_owner} = data;
          setProfileData({
            id,
            name,
            bio,
            image,
            created_at,
            is_owner,
          });
        } catch(error) {
          console.log(error)
        }
      };
      fetchprofileData();
    }, [currentUserId, setProfileData]);


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
              is_owner: {is_owner}
            </p>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ProfilePage;