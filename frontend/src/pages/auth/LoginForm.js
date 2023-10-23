import React from "react";
import axios from "axios";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import appStyles from "../../App.module.css";


function LoginForm() {
  return (
    <Row>
        <Col>
            <Container>
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
                </Form>
            </Container>
            <Container>
                <h2>Don't have an account?  Click here to register</h2>
            </Container>
        </Col>
    </Row>
  )
}

export default LoginForm