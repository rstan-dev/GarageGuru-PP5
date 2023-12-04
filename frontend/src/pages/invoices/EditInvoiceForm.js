import React, { useState, useEffect, useRef } from 'react';

import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';

import styles from '../../styles/AddEditInvoice.module.css'

import { useCurrentUser } from '../../contexts/CurrentUserContext';
import { useHistory, useParams } from "react-router-dom";
import axios from 'axios';
import { axiosReq, axiosRes } from '../../api/axiosDefaults';
import ConfirmationModal from '../../components/ConfirmationModal';

function EditInvoiceForm() {
    const currentUser = useCurrentUser();
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

    const [showConfirmationModal, setShowConfirmationModal] = useState(false);
    const [confirmationModalContent, setConfirmationModalContent] = useState({
        title: '',
        body: '',
        confirmAction: () => {},
      });

    // Gets original Invoice data to populate form
    useEffect(() => {

        const handleMount = async () => {
          try {
            const { data } = await axiosReq.get(`/invoices/${id}/`);
            setInvoiceData({
                inv_id: data.inv_id,
                inv_owner: data.inv_owner,
                job_assigned_to: data.job_assigned_to,
                job_id: data.job_id,
                customer_firstname: data.customer_firstname,
                customer_lastname: data.customer_lastname,
                customer_email: data.customer_email,
                customer_phone: data.customer_phone,
                amount: data.amount,
                inv_due_date: data.inv_due_date,
                invoice_status: data.invoice_status
              });

            if (currentUser && (currentUser.username !== data.inv_owner && data.currentUser.username !== job_assigned_to)) {
                // Redirect to home page if currentUser is neither invoice owner nor assigned user.
                history.push("/");
                return;
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

    // Handles update submission using confrimationModal to verify user actions
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

        setConfirmationModalContent({
            title: 'Confirm Invoice Update',
            body: 'Are you sure you want to update this invoice?',
            confirmAction: handleUpdateConfirm, // References the function that performs the update
          });
        setShowConfirmationModal(true);
    };


    // Updates api and closes Confirmation Modal when update confirmed
    const handleUpdateConfirm = async () => {
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
                console.log(err);
                if (err.response.status !== 401) {
                    setErrors(err.response.data);
                }
                } else {
                console.error(err);
                setErrors({ message: ["There was an error submitting the form."] });
                }
            };

        setShowConfirmationModal(false);
    };

     // Handles the delete button
     const handleDelete = () => {

        setConfirmationModalContent({
            title: 'Confirm Invoice Deletion',
            body: 'Are you sure you want to delete this invoice? This action cannot be undone.',
            confirmAction: handleDeleteConfirm, // Reference to the function that performs the delete
            });
        setShowConfirmationModal(true);
    }

    // Submits the delete request after modal confirmation
    const handleDeleteConfirm = async () => {
        try {
        await axiosRes.delete(`/invoices/${inv_id}/`);
            setSuccessMessage('Invoice has been deleted successfully');
            successTimeoutRef.current = setTimeout(() => {
                setSuccessMessage('');
                history.goBack();
            }, 1500);
        } catch (err) {
            console.log(err);
        };
        setShowConfirmationModal(false);
    };

    // Handles modal's confirmation
    const handleModalConfirm = () => {
        confirmationModalContent.confirmAction();
    };

    // This function will be used to close the modal without taking action
    const handleModalClose = () => {
        setShowConfirmationModal(false);
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
                    className={styles.FormControl}
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
                    className={styles.FormControl}
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
                    className={styles.FormControl}
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
                    className={styles.FormControl}
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
                    className={styles.FormControl}

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
                    className={styles.FormControl}
                />
            </Form.Group>

            <Form.Group controlId="invoice_status">
                <Form.Label >Status:</Form.Label>
                <Form.Control
                as="select"
                name="invoice_status"
                value={invoice_status}
                    onChange={handleChange}
                    className={styles.FormControl}
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
        <Container className={styles.AddEditInvoiceForm}>
            <Col xs={12} sm={12} md={10} lg={8} xl={6} className="mx-auto">
             {/* Display success message */}
             {successMessage && <Alert variant="success">{successMessage}</Alert>}

             <div className={styles.CardBlock}>
                    <Card className={styles.FormCard}>
                    <p>
                            <i className={`fa-solid fa-pencil ${styles.AddEditInvoiceIcon}`}> </i>
                             Edit Invoice Form
                        </p>

                <Form onSubmit={(e) => e.preventDefault()}>

                        <div>
                            {textFields}
                        </div>

                        <Row className="justify-content-center">

<Col md="auto" className={styles.BtnContainer}>
                            <Button
                variant="warning"
                onClick={() => history.goBack()}
                >
                    Cancel
                                    </Button>
                                </Col>
                                <Col md="auto" className={styles.BtnContainer}>

                <Button
                variant="success"
                onClick={handleSubmit}>
                    Update Invoice
                                    </Button>
                                </Col>
                                <Col md="auto" className={styles.BtnContainer}>
                <Button
                variant="danger"
                onClick={handleDelete}>
                    Delete Invoice
                                    </Button>
                                </Col>
                                </Row>
            </Form>
            {/* Confirmation Modal */}
            <ConfirmationModal
            showModal={showConfirmationModal}
            handleClose={handleModalClose}
            handleConfirm={handleModalConfirm}
            title={confirmationModalContent.title}
            body={confirmationModalContent.body}
            />
        </Card>
                </div>
                    </Col>
        </Container>
  )
}

export default EditInvoiceForm