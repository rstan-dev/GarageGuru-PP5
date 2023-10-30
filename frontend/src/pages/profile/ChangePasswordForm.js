import React from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";


const ChangePasswordForm = () => {

  return (
    <Row>
      <Col className="py-2 mx-auto text-center" md={6}>
        <Container >
          <Form >
            <Form.Group>
              <Form.Label>New password</Form.Label>
              <Form.Control
                placeholder="new password"
                type="password"
                name="new_password1"
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Confirm password</Form.Label>
              <Form.Control
                placeholder="confirm new password"
                type="password"
                name="new_password2"
              />
            </Form.Group>

            <Button
            >
              Cancel
            </Button>
            <Button
              type="submit"
            >
              Update Password
            </Button>
          </Form>
        </Container>
      </Col>
    </Row>
  );
};

export default ChangePasswordForm;