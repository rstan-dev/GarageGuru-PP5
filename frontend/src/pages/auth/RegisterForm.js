import React, { useState } from "react";

import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Alert } from "react-bootstrap";

import styles from "../../styles/LoginRegister.module.css"
import axios from "axios";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";


function RegisterForm() {
    const [registerData, setRegisterData]= useState({
        username: '',
        password1: '',
        password2: '',
    })

    const {username, password1, password2} = registerData;

    const [errors, setErrors] = useState({})

    const history = useHistory



    const handleChange = (event) => {
        setRegisterData({
            ...registerData,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.post('dj-rest-auth/registration/', registerData)
            history.push('/login')

        } catch(error) {
            setErrors(error.response?.data)
        }
    }


    return (
        <Container className={styles.LoginRegisterForm}>
            <Col xs={12} sm={12} md={8} lg={6} xl={6} className="mx-auto">
                <h1>Register for an account</h1>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="username">
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter a username"
                            name="username"
                            value={username}
                            onChange={handleChange}
                            />
                    </Form.Group>
                    {errors.username?.map((message, index) => (
                    <Alert variant="warning" key={index}>
                    {message}
                    </Alert>
                    ))}

                    <Form.Group controlId="password1">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Enter a password"
                            name="password1"
                            value={password1}
                            onChange={handleChange}
                             />
                    </Form.Group>
                    {errors.password1?.map((message, index) => (
                    <Alert variant="warning" key={index}>
                    {message}
                    </Alert>
                    ))}

                    <Form.Group controlId="password2">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Re-enter the same password"
                            name="password2"
                            value={password2}
                            onChange={handleChange}
                             />
                    </Form.Group>
                    {errors.password2?.map((message, index) => (
                    <Alert variant="warning" key={index}>
                    {message}
                    </Alert>
                    ))}

                    <Button variant="primary" type="submit">
                        Register
                    </Button>
                    {errors.non_field_errors?.map((message, index) => (
                        <Alert variant="warning" key={index} className="mt-3">
                        {message}
                        </Alert>
                    ))}

                    <p>Already have an account?<br/>Click here to log in</p>
                </Form>
            </Col>
        </Container>
    )
    }

export default RegisterForm