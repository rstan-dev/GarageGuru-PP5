import React, { useState, useEffect, useRef } from 'react';

import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';

import styles from '../../styles/AddEditInvoice.module.css'

import { useCurrentUser } from '../../contexts/CurrentUserContext';
import { useHistory, useParams } from "react-router-dom";
import axios from 'axios';
import { axiosReq } from '../../api/axiosDefaults';

function EditInvoiceForm() {
    const currentUser = useCurrentUser();
    const [users, setUsers] = useState([]);
    const  {id} = useParams()

    // initialize state of invoice data
    const [invoiceData, setInvoiceData] = useState({
        inv_id: '',
        inv_owner: '',
        job_assigned_to: '',
        job_id: null,
        customer_firstname: '',
        customer_lastname: '',
        customer_email: '',
        customer_phone: '',
        amount: '',
        inv_due_date: '',
        invoice_status: ''
      });

    const {inv_id, inv_owner, job_assigned_to, job_id, customer_firstname, customer_lastname,              customer_email, customer_phone, amount, inv_due_date, invoice_status} = invoiceData

    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState('');
    const successTimeoutRef = useRef();
    const history = useHistory();

    console.log(`ID: ${id}`)

    // Gets original Invoice data to populate form
    useEffect(() => {

        const handleMount = async () => {
          try {
            const { data } = await axiosReq.get(`/invoices/?job_id=${id}`);
            if (data.results && data.results.length > 0) {
                const firstInvoice = data.results[0];
                const {
                    inv_id,
                    inv_owner,
                    job_assigned_to,
                    job_id,
                    customer_firstname,
                    customer_lastname,
                    customer_email,
                    customer_phone,
                    amount,
                    inv_due_date,
                    invoice_status,
                } = firstInvoice;

                setInvoiceData({
                    inv_id,
                    inv_owner,
                    job_assigned_to,
                    job_id,
                    customer_firstname,
                    customer_lastname,
                    customer_email,
                    customer_phone,
                    amount,
                    inv_due_date,
                    invoice_status
                });

                if (currentUser && (currentUser.username !== inv_owner && currentUser.username !== job_assigned_to)) {
                    // Redirect to home page if currentUser is neither invoice owner nor assigned user.
                    history.push("/");
                    return;
                }
            }
          } catch (err) {
            // console.log(err);
          }
        };
        handleMount();
      }, [history, id, currentUser, inv_owner, job_assigned_to]);

    // handle any changes to main form
    const handleChange = (event) => {
        setInvoiceData({
            ...invoiceData,
            [event.target.name]: event.target.value,
        });
      };

    // Get current date to use as min in inv_due_date
    const getCurrentDate = () => {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
        }

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

        formData.append('job_id', job_id)
        formData.append('customer_firstname', customer_firstname)
        formData.append('customer_lastname', customer_lastname)
        formData.append('customer_email', customer_email)
        formData.append('customer_phone', customer_phone)
        formData.append('amount', amount)
        formData.append('inv_due_date', inv_due_date)
        formData.append('invoice_status', invoice_status)

        try {
            await axiosReq.put(`/invoices/${inv_id}/`, formData)
            setSuccessMessage('Invoice has been updated successfully');
            successTimeoutRef.current = setTimeout(() => {
                setSuccessMessage('');
                history.push('/')
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

            <Form.Group controlId="inv_due_date">
                <Form.Label >Due Date:</Form.Label>
                <Form.Control
                type="date"
                name="inv_due_date"
                value={inv_due_date}
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
                <div>EditInvoiceForm</div>

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
                    Update Invoice
                </Button>
            </Form>
        </Col>
        </Container>
  )
}

export default EditInvoiceForm