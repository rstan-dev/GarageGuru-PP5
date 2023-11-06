import React, { useState, useRef, useEffect } from 'react';

import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Form from 'react-bootstrap/Form';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';

import styles from '../../styles/AddEditJob.module.css'

import { useCurrentUser } from '../../contexts/CurrentUserContext';
import axios from 'axios';


function AddJobForm() {

    const currentUser = useCurrentUser();
    const [users, setUsers] = useState([]);

    // initialize state of job data
    const [jobData, setJobData] = useState({
        job_type: '',
        job_details: '',
        image: '',
        due_date: '',
        assigned_to: '',
        status: 'Pending'
      });

    const {job_type, job_details, image, due_date, assigned_to, status } = jobData;

    const imageInput = useRef()

    // Set default assigned_to to current username
    useEffect(() => {
        if (currentUser && currentUser.pk) {
            setJobData(prevState => ({
              ...prevState,
              assigned_to: currentUser.pk
            }));
          }
        }, [currentUser]);

    // Get list of profiles to populate assigned_to dropdown
    useEffect(() => {
        axios.get("/profiles/").then((response) => {
            console.log(response.data)
            setUsers(response.data)
        })
          .catch((error) => console.log(error));
      }, [currentUser]);


    // Get current date to use as default in due_date
        const getCurrentDate = () => {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
        }

      // handle any changes to main form
      const handleChange = (event) => {
        setJobData({
            ...jobData,
            [event.target.name]: event.target.value,
        });
      };

      // handle any changes to image
      const handleUploadImage = (event) => {
        if (event.target.files.length){
            URL.revokeObjectURL(image);
            setJobData({
                ...jobData,
                image: URL.createObjectURL(event.target.files[0])
            });
        }
      };




      const textFields = (
        <div className='text-center'>
            <Form.Group controlId="job_type">
                <Form.Label >Job Type:</Form.Label>
                <Form.Control
                as="select"
                name="job_type"
                value={job_type}
                onChange={handleChange}
                isrequired="true"
                >
                <option>Choose Job Type</option>
                <option value="Major Service">Major Service</option>
                <option value="Minor Service">Minor Service</option>
                <option value="MOT">MOT</option>
                <option value="Tyre Change">Tyre Change</option>
                </Form.Control>
            </Form.Group>


            <Form.Group controlId="job_details">
                <Form.Label >Job Details:</Form.Label>
                <Form.Control
                as="textarea"
                name="job_details"
                rows={2}
                value={job_details}
                onChange={handleChange}
                />
            </Form.Group>

            <Form.Group controlId="assigned_to">
                <Form.Label >Assigned to:</Form.Label>
                <Form.Control
                as="select"
                name="assigned_to"
                value={assigned_to}
                onChange={handleChange}
                isrequired="true"
                >
                <option>Choose a user</option>
                {users.map((user) => (
                    <option key={user.id} value={user.id}>
                    {user.owner}
                    </option>
                ))}
                </Form.Control>
            </Form.Group>

            <Form.Group controlId="due_date">
                <Form.Label >Due Date:</Form.Label>
                <Form.Control
                type="date"
                name="due_date"
                value={getCurrentDate()}
                onChange={handleChange}
                min={getCurrentDate()}
                />
            </Form.Group>

            <Form.Group controlId="status">
                <Form.Label >Status:</Form.Label>
                <Form.Control
                as="select"
                name="status"
                value={status}
                onChange={handleChange}
                >
                <option>Select status</option>
                <option value="Pending">Pending</option>
                <option value="Underway">Underway</option>
                <option value="Completed">Completed</option>
                <option value="Overdue">Overdue</option>
                </Form.Control>
            </Form.Group>

        </div>
      )


    return (
        <Container className={styles.AddEditJobForm}>
            <Col xs={12} sm={12} md={10} lg={8} xl={6}>

            <Form >
                <div>AddJobForm</div>

                        <div className="card">
                        {textFields}

                        <Form.Group className="text-center">
                        {image ? (
                            <>
                            <figure>
                                <Image className={styles.Image} src={image} rounded/>
                            </figure>

                            <div>
                            <Form.Label
                                className="d-flex justify-content-center"
                                htmlFor="image-upload">
                                <p>Change image</p>
                                </Form.Label>

                            </div>
                            </>
                        ) : (
                            <Form.Label
                                className="d-flex justify-content-center"
                                htmlFor="image-upload">
                                <i className="fa-solid fa-arrow-up-from-bracket"></i>
                                <p>Upload an image</p>
                                </Form.Label>
                        )}
                                <Form.File
                                id="image-upload"
                                accept="image/*"
                                ref={imageInput}
                                onChange={handleUploadImage}
                                />
                            </Form.Group>
                        </div>
                <Button
                variant="warning"
                >
                    Cancel
                </Button>
                <Button
                variant="success"
                type="submit">
                    Add Job
                </Button>
            </Form>
        </Col>
        </Container>
    )
}

export default AddJobForm