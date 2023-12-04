import React, { useState, useRef, useEffect } from 'react';

import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Form from 'react-bootstrap/Form';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';

import styles from '../../styles/AddEditJob.module.css'

import { useCurrentUser } from '../../contexts/CurrentUserContext';
import { useHistory } from "react-router-dom";
import axios from 'axios';
import { axiosReq } from '../../api/axiosDefaults';

function AddJobForm() {
    const currentUser = useCurrentUser();
    const [users, setUsers] = useState([]);
    const isMounted = useRef(true);

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
    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState('');
    const successTimeoutRef = useRef();
    const history = useHistory();


    useEffect(() => {
        if (!currentUser) {
            // Redirect to login only if currentUser is explicitly null (not undefined)
            history.push("/login");
            return;
          }

        if (currentUser && currentUser.pk) {
            // Set default assigned_to to current username
            setJobData(prevState => ({
              ...prevState,
              assigned_to: currentUser.pk
            }));
          };

        return () => {
            // Set isMounted to false on component unmount
            isMounted.current = false;
        }

        }, [currentUser, history]);

    // Get list of profiles to populate assigned_to dropdown
    useEffect(() => {
        const fetchProfiles = async () => {
            try {
                const { data } = await axiosReq.get(`/profiles/`)
                if (isMounted.current) {
                setUsers(data.results);
                }
            } catch(err) {
                console.log(err)
            }
        };
        fetchProfiles();
        return () => {
            // Set isMounted to false on component unmount
            isMounted.current = false;
        };
    }, []);

    console.log(`Users:`, users)
    // Get current date to use as default in due_date
        const getCurrentDate = () => {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
        }

    // Sets the due_date field to curent date when form initially loads
    useEffect(() => {
        const currentDate = getCurrentDate();
        setJobData(prevState => ({
            ...prevState,
            due_date: currentDate,
        }));
        }, []);

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

    // Clears the success message timeout function
    useEffect(() => {
        return () => {
            if (successTimeoutRef.current) {
                clearTimeout(successTimeoutRef.current);
            }
        };
    }, []);

    const handleSubmit = async (event) => {
    event.preventDefault()

    let formErrors = {};

    if (!job_type || job_type === 'Choose Job Type') {
        formErrors.job_type = ['Job Type is Required. Please select a job type.'];
    }

    if (!due_date) {
        formErrors.due_date = ['Due Date is required. Please select a due date.'];
    }

    if (Object.keys(formErrors).length > 0) {
        setErrors(formErrors);
        return;
    }

    const formData = new FormData();

    formData.append('job_type', job_type)
    formData.append('job_details', job_details)
    formData.append('due_date', due_date)
    formData.append('assigned_to', assigned_to)
    formData.append('status', status)
    if (imageInput.current && imageInput.current.files[0]) {
        formData.append('image', imageInput.current.files[0]);
        }

    try {
        const {data} = await axiosReq.post('/jobs/', formData)
        if (isMounted.current) {
        setSuccessMessage('Job has been added successfully');
        successTimeoutRef.current = setTimeout(() => {
            if (isMounted.current) {
                setSuccessMessage('');
                history.push(`/jobs/${data.id}`)
            }
            }, 1500);
        }
    } catch (err) {
        if (axios.isAxiosError(err) && err.response) {
            console.log(err);
            if (err.response.status !== 401) {
                setErrors(err.response.data);
            }
            } else {
            console.error(err);
            setErrors({ message: ["There was an error submitting the form."] });
            }
        };
    };

      // Text fields component to be rendered in form
      const textFields = (
        <div className='text-center'>
            <Form.Group controlId="job_type">
                <Form.Label >Job Type: (required)</Form.Label>
                <Form.Control
                as="select"
                name="job_type"
                value={job_type}
                onChange={handleChange}
                isrequired="true"
                className={styles.FormControl}
                >
                <option>Choose Job Type</option>
                <option value="Major Service">Major Service</option>
                <option value="Minor Service">Minor Service</option>
                <option value="MOT">MOT</option>
                <option value="Tyre Change">Tyre Change</option>
                </Form.Control>
            </Form.Group>
            {errors?.job_type?.map((message, index) => (
                <Alert variant="danger" key={index}>
                    {message}
                </Alert>
            ))}

            <Form.Group controlId="job_details">
                <Form.Label >Job Details:</Form.Label>
                <Form.Control
                as="textarea"
                name="job_details"
                placeholder="Enter some details about the job or vehicle here..."
                rows={2}
                value={job_details}
                onChange={handleChange}
                className={styles.FormControl}
                />
            </Form.Group>
            {errors?.job_details?.map((message, index) => (
                <Alert variant="danger" key={index}>
                    {message}
                </Alert>
            ))}

            <Form.Group controlId="assigned_to">
                <Form.Label >Assigned to:</Form.Label>
                <Form.Control
                as="select"
                name="assigned_to"
                value={assigned_to}
                onChange={handleChange}
                isrequired="true"
                className={styles.FormControl}
                >
                <option>Choose a user</option>
                {users.map((user) => (
                    <option key={user.id} value={user.id}>
                    {user.owner}
                    </option>
                ))}
                </Form.Control>
            </Form.Group>
            {errors?.assigned_to?.map((message, index) => (
                <Alert variant="danger" key={index}>
                    {message}
                </Alert>
            ))}

            <Form.Group controlId="due_date">
                <Form.Label >Due Date:</Form.Label>
                <Form.Control
                type="date"
                name="due_date"
                value={due_date}
                onChange={handleChange}
                min={getCurrentDate()}
                className={styles.FormControl}
                />
            </Form.Group>
            {errors?.due_date?.map((message, index) => (
                <Alert variant="danger" key={index}>
                    {message}
                </Alert>
            ))}

            <Form.Group controlId="status">
                <Form.Label >Status:</Form.Label>
                <Form.Control
                as="select"
                name="status"
                value={status}
                onChange={handleChange}
                className={styles.FormControl}
                >
                <option>Select status</option>
                <option value="Pending">Pending</option>
                <option value="Underway">Underway</option>
                <option value="Completed">Completed</option>
                <option value="Overdue">Overdue</option>
                </Form.Control>
            </Form.Group>
            {errors?.status?.map((message, index) => (
                <Alert variant="danger" key={index}>
                    {message}
                </Alert>
            ))}
        </div>
      )

    return (
        <Container className={styles.AddEditJobForm}>
            <Col xs={12} sm={12} md={10} lg={8} xl={6} className="mx-auto">
            {/* Display success message */}
                {successMessage && <Alert variant="success">{successMessage}</Alert>}

            <div className={styles.CardBlock}>

                    <Card className={styles.FormCard}>
                        <p>
                            <i className={`fa-solid fa-circle-plus ${styles.AddJobIcon}`}> </i>
                             Add Job Form
                        </p>

                        <Form onSubmit={handleSubmit}>

                        <div>
                        {textFields}

                        <Card>
                        <Form.Group className="text-center">
                                        {image ? (
                                            <>
                                                <figure>
                                                    <Image className={styles.Image} src={image} rounded />
                                                </figure>
                                                {errors?.image?.map((message, index) => (
                                                    <Alert variant="warning" key={index}>
                                                        {message}
                                                    </Alert>
                                                ))}

                                                <div>
                                                    <Form.Label
                                                        className="d-flex justify-content-center"
                                                        htmlFor="image-upload">
                                                        <p>Change image</p>
                                                    </Form.Label>
                                                </div>
                                            </>
                                        ) : (
                                                <div className="d-flex justify-content-center">
                                                <Form.Label
                                                className={`d-flex align-items-center${styles.ImageUploadContainer}`}
                                                htmlFor="image-upload">
                                                        <div className={styles.UploadIcon}>
                                                        <i className="fa-solid fa-arrow-up-from-bracket" ></i>
                                                            <p>Upload an image</p>
                                                        </div>

                                                    </Form.Label>
                                                </div>

                                            )}
                                        <div className="d-flex justify-content-center">
                                        <Form.File
                                            id="image-upload"
                                            accept="image/*"
                                            ref={imageInput}
                                            onChange={handleUploadImage}
                                            className={styles.ImageUpload}
                                            />
                                        </div>
                        </Form.Group>
                        </Card>
                        </div>
                        <Row className="justify-content-center">

    <Col md="auto" className={styles.BtnContainer}>
        <Button
            variant="warning"
            onClick={() => history.goBack()}>
            Cancel
        </Button>
    </Col>
    <Col md="auto" className={styles.BtnContainer}>
        <Button
            variant="success"
            type="submit">
            Add Job
        </Button>
    </Col>
</Row>
                </Form>
        </Card>
        </div>
        </Col>
        </Container>
    )
}

export default AddJobForm