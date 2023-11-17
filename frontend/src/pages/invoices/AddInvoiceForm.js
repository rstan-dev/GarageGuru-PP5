import React, { useState, useEffect } from 'react';

import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import styles from '../../styles/AddEditInvoice.module.css'

import { useCurrentUser } from '../../contexts/CurrentUserContext';
import { useHistory } from "react-router-dom";

function AddInvoiceForm() {
    const currentUser = useCurrentUser();
    const [users, setUsers] = useState([]);

    // initialize state of invoice data
    const [invoiceData, setInvoiceData] = useState({
        customer_firstname: '',
        customer_lastname: '',
        customer_email: '',
        customer_phone: '',
        amount: '',
        due_date: '',
        invoice_status: 'Pending'
      });

    const {customer_firstname, customer_lastname, customer_email,
            customer_phone, amount, due_date, invoice_status} = invoiceData

    const history = useHistory();

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
        setInvoiceData(prevState => ({
            ...prevState,
            due_date: currentDate,
        }));
        }, []);

    // handle any changes to main form
    const handleChange = (event) => {
        setInvoiceData({
            ...invoiceData,
            [event.target.name]: event.target.value,
        });
      };

    // Text fields component to be rendered in form
    const textFields = (
        <div className='text-center'>

            <Form.Group controlId="customer_firstname">
                <Form.Label >Customer First Name:</Form.Label>
                <Form.Control
                type="text"
                name="customer_firstname"
                value={customer_firstname}
                onChange={handleChange}
                />
            </Form.Group>

            <Form.Group controlId="customer_lastname">
                <Form.Label >Customer Last Name:</Form.Label>
                <Form.Control
                type="text"
                name="customer_lastname"
                value={customer_lastname}
                onChange={handleChange}
                />
            </Form.Group>

            <Form.Group controlId="customer_email">
                <Form.Label >Email:</Form.Label>
                <Form.Control
                type="email"
                name="customer_email"
                value={customer_email}
                onChange={handleChange}
                />
            </Form.Group>
            <Form.Group controlId="customer_phone">
                <Form.Label >Phone:</Form.Label>
                <Form.Control
                type="tel"
                name="customer_phone"
                value={customer_phone}
                onChange={handleChange}
                pattern="^\d{9,15}$"
                title="Phone number must be between 9 to 15 digits."
                />
            </Form.Group>

            <Form.Group controlId="amount">
                <Form.Label >Amount:</Form.Label>
                <Form.Control
                type="number"
                min="0"
                step="0.01"
                name="amount"
                value={amount}
                onChange={handleChange}

                />
            </Form.Group>

            <Form.Group controlId="due_date">
                <Form.Label >Due Date:</Form.Label>
                <Form.Control
                type="date"
                name="due_date"
                value={due_date}
                onChange={handleChange}
                min={getCurrentDate()}
                />
            </Form.Group>

            <Form.Group controlId="invoice_status">
                <Form.Label >Status:</Form.Label>
                <Form.Control
                as="select"
                name="invoice_status"
                value={invoice_status}
                onChange={handleChange}
                >
                <option>Select status</option>
                <option value="Pending">Pending</option>
                <option value="Invoiced">Invoiced</option>
                <option value="Paid">Paid</option>
                </Form.Control>
            </Form.Group>
        </div>
      )

    return (
        <Container className={styles.AddEditJobForm}>
            <Col xs={12} sm={12} md={10} lg={8} xl={6}>

            <Form>
                <div>AddInvoiceForm</div>

                        <div className="card">
                            {textFields}
                        </div>
                <Button
                variant="warning"
                onClick={() => history.goBack()}
                >
                    Cancel
                </Button>
                <Button
                variant="success"
                type="submit">
                    Add Invoice
                </Button>
            </Form>
        </Col>
        </Container>
  )
}

export default AddInvoiceForm