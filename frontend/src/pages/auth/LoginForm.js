import React from "react";
import axios from "axios";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import appStyles from "../../App.module.css";
import styles from "../../styles/LoginRegister.module.css"


function LoginForm() {
  return (
    <Container className={styles.LoginRegisterForm}>
        <Col xs={12} sm={12} md={8} lg={6} xl={6} className="mx-auto">
            <h1> Log In</h1>
            <Form>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter your username"
                        name="username"/>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Enter Password"
                        name="password" />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Log In
                </Button>

                <p>Don't have an account?<br/>Click here to register</p>
            </Form>
        </Col>
    </Container>
  )
}

export default LoginForm