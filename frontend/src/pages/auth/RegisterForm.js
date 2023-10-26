import React from "react";

import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import styles from "../../styles/LoginRegister.module.css"


function RegisterForm() {


    return (
        <Container className={styles.LoginRegisterForm}>
            <Col xs={12} sm={12} md={8} lg={6} xl={6} className="mx-auto">
                <h1>Register for an account</h1>
                <Form >
                    <Form.Group controlId="username">
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter a username"
                            name="username"
                            />
                    </Form.Group>

                    <Form.Group controlId="password1">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Enter a password"
                            name="password2"
                             />
                    </Form.Group>

                    <Form.Group controlId="password2">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Re-enter the same password"
                            name="password2"
                             />
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Register
                    </Button>

                    <p>Already have an account?<br/>Click here to log in</p>

                </Form>
            </Col>
        </Container>
    )
    }

export default RegisterForm