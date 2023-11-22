import React, { useState, useEffect, useRef } from 'react';

import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';

import styles from '../../styles/AddEditInvoice.module.css'

import { useCurrentUser } from '../../contexts/CurrentUserContext';
import { useHistory, useLocation } from "react-router-dom";
import axios from 'axios';
import { axiosReq } from '../../api/axiosDefaults';

function AddInvoiceForm() {
    const currentUser = useCurrentUser();
    const [users, setUsers] = useState([]);
    const location = useLocation();
    const jobId = parseInt(location.state?.jobId, 10);
    const [errors, setErrors] = useState({});

    console.log(`Job Id: ${jobId}`)

    // initialize state of invoice data
    const [invoiceData, setInvoiceData] = useState({
        job: null,
        customer_firstname: '',
        customer_lastname: '',
        customer_email: '',
        customer_phone: '',
        amount: '',
        due_date: '',
        invoice_status: 'Pending'
      });

    const {job, customer_firstname, customer_lastname, customer_email,
            customer_phone, amount, due_date, invoice_status} = invoiceData
    const [successMessage, setSuccessMessage] = useState('');
    const successTimeoutRef = useRef();
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

        if (!customer_firstname ) {
            formErrors.customer_firstname = ["First name is required. Please enter the customer's name."];
        }

        if (!customer_lastname ) {
            formErrors.customer_lastname = ["Last name is required. Please enter the customer's second name."];
        }

        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            return;
        }

        const formData = new FormData();

        formData.append('job_id', jobId)
        formData.append('customer_firstname', customer_firstname)
        formData.append('customer_lastname', customer_lastname)
        formData.append('customer_email', customer_email)
        formData.append('customer_phone', customer_phone)
        formData.append('amount', amount)
        formData.append('inv_due_date', due_date)
        formData.append('invoice_status', invoice_status)

        try {
            await axiosReq.post('/invoices/', formData)
            setSuccessMessage('Invoice has been added successfully');
            successTimeoutRef.current = setTimeout(() => {
                setSuccessMessage('');
                history.push(`/jobs/${jobId}`)
                }, 1500);
        } catch (err) {
            if (axios.isAxiosError(err) && err.response) {
                console.log(err.response.data);
                console.log(err.response.status);
                console.log(err.response.headers);
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

            <Form.Group controlId="customer_firstname">
                <Form.Label >Customer First Name:</Form.Label>
                <Form.Control
                type="text"
                name="customer_firstname"
                value={customer_firstname}
                onChange={handleChange}
                />
            </Form.Group>
            {errors?.customer_firstname?.map((message, index) => (
                <Alert variant="danger" key={index}>
                    {message}
                </Alert>
            ))}

            <Form.Group controlId="customer_lastname">
                <Form.Label >Customer Last Name:</Form.Label>
                <Form.Control
                type="text"
                name="customer_lastname"
                value={customer_lastname}
                onChange={handleChange}
                />
            </Form.Group>
            {errors?.customer_lastname?.map((message, index) => (
                <Alert variant="danger" key={index}>
                    {message}
                </Alert>
            ))}

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
             {/* Display success message */}
             {successMessage && <Alert variant="success">{successMessage}</Alert>}

            <Form onSubmit={handleSubmit}>
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