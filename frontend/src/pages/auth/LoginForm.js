import { React, useState} from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import axios from "axios";

import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";

import styles from "../../styles/LoginRegister.module.css"


function LoginForm() {
    const [logInData, setlogInData] = useState({
        username: '',
        password: '',
    });

    const {username, password} = logInData;

    const [errors, setErrors] = useState()

    const history = useHistory()

    const handleChange = (event) => {
        setlogInData({
            ...logInData,
            [event.target.name]: event.target.value
        })
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.post('/dj-rest-auth/login/',
            logInData);
            history.push('/');
        } catch (err) {
            setErrors(err.response?.data);

        }
    };


    return (
        <Container className={styles.LoginRegisterForm}>
            <Col xs={12} sm={12} md={8} lg={6} xl={6} className="mx-auto">
                <h1> Log In</h1>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter your username"
                            name="username"
                            value={username}
                            onChange={handleChange}/>
                    </Form.Group>
                    {errors.username?.map((message, index) => (
                        <Alert key={index} variant="warning">
                            {message}
                        </Alert>
                    ))}

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Enter Password"
                            name="password"
                            value={password}
                            onChange={handleChange} />
                    </Form.Group>
                    {errors.password?.map((message, index) => (
                        <Alert key={index} variant="warning">
                            {message}
                        </Alert>
                    ))}

                    <Button variant="primary" type="submit">
                        Log In
                    </Button>
                    {errors.non_field_errors?.map((message, idx) => (
                        <Alert variant="warning" key={idx} className="mt-3">
                        {message}
                        </Alert>
                    ))}

                    <p>Don't have an account?<br/>Click here to register</p>
                </Form>
            </Col>
        </Container>
    )
    }

export default LoginForm