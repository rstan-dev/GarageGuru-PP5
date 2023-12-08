import React, { useEffect, useState } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Link, useHistory, useParams } from "react-router-dom";
import { Image } from "react-bootstrap";
import styles from "../../styles/ProfilePage.module.css";

import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { axiosReq } from "../../api/axiosDefaults";

/**
 * ProfilePage Component
 *
 * This component renders a page displaying detailed information
 * about a specific user's profile.
 * It fetches the profile data from the server based on the profile
 * ID obtained from the URL parameters * and manages the display of
 * this information.
 */
const ProfilePage = () => {
	// Fetches current user details for authentication checks.
	const currentUser = useCurrentUser();
	const currentUserId = currentUser ? currentUser.pk : null;

	// Gets the profile by id using the useParams hook.
	const { id } = useParams();

	// Initializes state for managing the profile data.
	const [profileData, setProfileData] = useState({
		owner: "",
		name: "",
		bio: "",
		image: "",
		display_created_at: "",
		display_updated_at: "",
		is_owner: false,
	});

	const {
		owner,
		name,
		bio,
		image,
		display_created_at,
		display_updated_at,
		is_owner,
	} = profileData;

	const history = useHistory();

	/**
	 * Fetches profile data from the server when the component mounts or
	 * when dependencies change.
	 * Applies the fetched data to the component's state. Also, handles
	 * redirection based on user authentication.
	 */
	useEffect(() => {
		let isMounted = true; // Flag to track if the component is mounted.

		const fetchProfileData = async () => {
			try {
				const { data } = await axiosReq.get(`/profiles/${id}/`);
				if (isMounted) {
					setProfileData(data);
				}
			} catch (err) {
				console.log(err);
			}
		};

		fetchProfileData();
		return () => {
			isMounted = false; // Set the flag to false when the component unmounts.
		};
	}, [currentUserId, currentUser, history, id]);

	return (
		<Container className={styles.ProfileForm}>
			<Col
				xs={12}
				sm={12}
				md={8}
				lg={8}
				xl={8}
				className='mx-auto'>
				<div className={styles.CardBlock}>
					<Card className={styles.FormCard}>
						<div className={`d-flex flex-column align-items-center`}>
							<p>
								<i
									className={`fa-solid fa-circle-user ${styles.ProfileIcon}`}
									aria-hidden='true'></i>
								Profile Page for {owner}
							</p>
						</div>
						<Card className={styles.ImageContainer}>
							<Image
								src={image}
								alt='Profile'
								fluid
							/>
						</Card>
						<table className='table table-striped'>
							<tbody>
								<tr>
									<th>
										<i
											className='fa-solid fa-id-card-clip'
											aria-hidden='true'></i>
										Name:
									</th>
									<td>{name}</td>
								</tr>
								<tr>
									<th>
										<i
											className='fa-solid fa-circle-info'
											aria-hidden='true'></i>
										Bio:
									</th>
									<td>{bio}</td>
								</tr>
								<tr>
									<th>
										<i
											className='fa-solid fa-calendar-days'
											aria-hidden='true'></i>
										Staff member since:
									</th>
									<td>{display_created_at}</td>
								</tr>
								<tr>
									<th>
										<i
											className='fa-solid fa-calendar-plus'
											aria-hidden='true'></i>
										Profile last updated:
									</th>
									<td>{display_updated_at}</td>
								</tr>
								<tr>
									<th>
										<i
											className='fa-solid fa-hashtag'
											aria-hidden='true'></i>
										User ID:
									</th>
									<td>{id}</td>
								</tr>
							</tbody>
						</table>

						{is_owner ? (
							<>
								<Row className='justify-content-center'>
									<Col
										md='auto'
										className={styles.BtnContainer}>
										<Link to={`/profile/${id}/edit-profile`}>
											<Button variant='primary'>Edit Profile</Button>
										</Link>
									</Col>
									<Col
										md='auto'
										className={styles.BtnContainer}>
										<Link to={`/profile/${id}/change-username`}>
											<Button variant='warning'>Edit Username</Button>
										</Link>
									</Col>
									<Col
										md='auto'
										className={styles.BtnContainer}>
										<Link to={`/profile/${id}/change-password`}>
											<Button variant='danger'>Edit Password</Button>
										</Link>
									</Col>
								</Row>
							</>
						) : null}
					</Card>
				</div>
			</Col>
		</Container>
	);
};

export default ProfilePage;
