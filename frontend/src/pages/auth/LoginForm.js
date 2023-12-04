import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";

import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";


import styles from "../../styles/LoginRegister.module.css"
import { useSetCurrentUser } from "../../contexts/CurrentUserContext";
import { setTokenTimestamp } from "../../utils/utils";
import { useRedirect } from "../../hooks/useRedirect";


function LoginForm() {
    const setCurrentUser = useSetCurrentUser();
    useRedirect('loggedIn')

    const [logInData, setlogInData] = useState({
        username: '',
        password: '',
    });

    const {username, password} = logInData;

    const [errors, setErrors] = useState({})

    const history = useHistory();

    const handleChange = (event) => {
        setlogInData({
            ...logInData,
            [event.target.name]: event.target.value
        })
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const {data} = await axios.post('/dj-rest-auth/login/', logInData);
            setCurrentUser(data.user)
            setTokenTimestamp(data)
            history.push('/');
        } catch (err) {
            setErrors(err.response?.data);

        }
    };


    return (
        <Container className={styles.LoginRegisterForm}>
            <Col xs={12} sm={12} md={8} lg={6} xl={6} className="mx-auto">
            <div className={styles.CardBlock}>
                    <Card className={styles.FormCard}>
                        <div className={`d-flex flex-column align-items-center ${styles.Intro}`}>
                            <h1>
                                <i className={`fa-solid fa-right-to-bracket ${styles.LoginIcon}`}> </i>
                                Login
                            </h1>
                            <p>Welcome to GarageGuru, the dynamic job card management app.</p>
                            <p>Manage, Monitor, & Assign jobs Effortlessly...</p>
                        </div>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="username">
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter your username"
                            name="username"
                            value={username}
                                    onChange={handleChange}
                                    className={styles.FormControl}/>
                    </Form.Group>
                    {errors.username?.map((message, index) => (
                        <Alert key={index} variant="warning">
                            {message}
                        </Alert>
                    ))}

                    <Form.Group controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Enter Password"
                            name="password"
                            value={password}
                                    onChange={handleChange}
                                    className={styles.FormControl}    />
                    </Form.Group>
                    {errors.password?.map((message, index) => (
                        <Alert key={index} variant="warning">
                            {message}
                        </Alert>
                    ))}

                    <Row className="justify-content-center">

                                <Col md="12" className={styles.BtnContainer}>
                                    <div className={styles.FullWidthLink}>
                                    <Button variant="primary" type="submit" size="lg" block>
                                Log In
                                        </Button>
                                </div>
                            {errors.non_field_errors?.map((message, index) => (
                                <Alert variant="warning" key={index} className="mt-3">
                                {message}
                                </Alert>
                            ))}
                                </Col>
                            </Row>
                            <div className={`d-flex flex-column align-items-center ${styles.RegisterSection}`}>
                    <Link to="/register">
                        <p>Don't have an account?<br/>Click here to register</p>
                                </Link>
                                </div>
                    </Form>
                    </Card>
                    </div>
            </Col>
        </Container>
    )
    }

export default LoginForm