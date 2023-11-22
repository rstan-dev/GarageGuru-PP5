import React, { useEffect, useState } from 'react'

import { Link  } from "react-router-dom";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Accordion from 'react-bootstrap/Accordion';

import styles from '../../styles/JobCard.module.css'
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import { axiosReq } from '../../api/axiosDefaults';

const JobCard = (props) => {

      const {
        id,
        owner,
        job_type,
        job_details,
        created_at,
        updated_at,
        due_date,
        assigned_to,
        status,
        image,
        comment_count,
        has_invoice,
        invoice_details
      } = props;

      const {
        inv_id,
        inv_owner,
        job_assigned_to,
        job_id,
        customer_firstname,
        customer_lastname,
        customer_email,
        customer_phone,
        inv_created_at,
        inv_updated_at,
        inv_due_date,
        amount,
        invoice_status,
      } = invoice_details || {};

      const currentUser = useCurrentUser();
      const is_owner = currentUser?.username === owner;
      const [assignedUsername, setAssignedUsername] = useState()


      // gets Profile id and sets corresponding username to display as
      // Assigned To user in JobCard
      useEffect(() => {
        const getProfileUsername = async () => {
          try {
            await axiosReq.get(`/profiles/${assigned_to}/`).then((response) => {
              setAssignedUsername(response.data.owner)
              });
            } catch (error) {
              console.log(error);
            }
          };
          getProfileUsername();
        }, [assigned_to]);


        console.log(`Job No: ${id}`)
        console.log(`Has Invoice: ${has_invoice}`)
        console.log(`Is Owner: ${is_owner}`)
        console.log(`Assigned User: ${assigned_to}`)

      return (

        <div className={styles.CardBlock}>
          <div className="card">
            <div className="card-body">
            <p className={styles.JobCardHeader}>JOBCARD</p>
              <div className="row">
                <div className="col-md-8">
                  <table className="table table-striped">
                    <tbody>
                      <tr>
                        <th><i className="fa-solid fa-hashtag"></i>Job No:</th>
                        <td>{id}</td>
                      </tr>
                      <tr>
                        <th><i className="fa-solid fa-wrench"></i>Job Type:</th>
                        <td>{job_type}</td>
                      </tr>
                      <tr>
                        <th><i className="fa-solid fa-circle-info"></i>Details:</th>
                        <td>{job_details}</td>
                      </tr>
                      <tr>
                        <th><i className="fa-solid fa-user"></i>Created By:</th>
                        <td>{owner}</td>
                      </tr>
                      <tr>
                        <th><i className="fa-solid fa-calendar-days"></i>Created on:</th>
                        <td>{created_at}</td>
                      </tr>
                      <tr>
                        <th><i className="fa-regular fa-calendar-plus"></i> Updated on:</th>
                        <td>{updated_at}</td>
                      </tr>
                      <tr>
                        <th><i className="fa-regular fa-calendar-check"></i>Due date:</th>
                        <td>{due_date}</td>
                      </tr>
                      <tr>
                        <th><i className="fa-regular fa-id-badge"></i>Assigned to:</th>
                        <td>{assignedUsername}</td>
                      </tr>
                      <tr>
                        <th><i className="fa-solid fa-circle-question"></i>Status:</th>
                        <td>{status}</td>
                      </tr>
                    </tbody>
                  </table>

                  <Accordion defaultActiveKey="1">
                    <Card>
                      <Card.Header>
                        <Accordion.Toggle as={Button} variant="link" eventKey="0">
                        {has_invoice  ? (
                          <div>
                        Click To View Invoice Details:
                        </div>
                        ) : (
                          <div>
                          No Invoice Details To Display
                          </div>
                        )}
                        </Accordion.Toggle>
                        </Card.Header>
                        <Accordion.Collapse eventKey="0">
                          <Card.Body>
                          <table className="table table-striped">
                            <tbody>
                              <tr>
                                <th>Invoice Number:</th>
                                <td>{inv_id}</td>
                              </tr>
                              <tr>
                                <th>Customer:</th>
                                <td>{customer_firstname} {" "} {customer_lastname}</td>
                              </tr>
                              <tr>
                                <th>Email:</th>
                                <td>{customer_email}</td>
                              </tr>
                              <tr>
                                <th>Phone:</th>
                                <td>{customer_phone}</td>
                              </tr>
                              <tr>
                                <th>Amount:</th>
                                <td>£{amount}</td>
                              </tr>
                              <tr>
                                <th>Invoice Due:</th>
                                <td>{inv_due_date}</td>
                              </tr>
                              <tr>
                                <th>Invoice Staus:</th>
                                <td>{invoice_status}</td>
                              </tr>
                              <tr>
                                <th>Updated on:</th>
                                <td>{inv_updated_at}</td>
                              </tr>
                              <tr>
                                <th>Created by:</th>
                                <td>{inv_owner}</td>
                              </tr>
                            </tbody>
                          </table>
                          </Card.Body>
                        </Accordion.Collapse>
                      </Card>
                    </Accordion>

                </div>

                {/* Desktop Display */}
                <div className="col-md-4 d-none d-md-block text-center">
                  {is_owner ? (
                    <div className="text-right">
                      <Link to={`/jobs/${id}/edit-job`}>
                        <OverlayTrigger
                          placement="top"
                          overlay={
                            <Tooltip id="tooltip-pencil">
                              Edit JobCard
                            </Tooltip>
                          }>
                          <span className={styles.PencilIcon}>
                          <i className="fa-solid fa-pencil"></i>
                          </span>
                        </OverlayTrigger>
                      </Link>
                    </div>
                    ) : null}

                {/* Job Image Placement */}
                <Card.Img src={image} alt={job_type} />

                <div className={styles.CommentEyes}>
                  <Link to={`/jobs/${id}`}>
                    <i className="fa-regular fa-comment"></i>
                    <p>{comment_count}</p>
                  </Link>

                  {/* Display Add and Edit Invoice Buttons if either invoice
                owner or assigned user are logged in */}
                  {  (!has_invoice && (is_owner || assigned_to === currentUser.pk)) ? (
                  <Link to={{
                    pathname: "/invoices/addinvoice",
                    state: { jobId: id }
                  }}>
                    <Button variant="primary">
                      Add Invoice
                    </Button>
                  </Link>
                ) : has_invoice ? (
                  <Link to={`/invoices/${inv_id}/`}>
                    <Button variant="primary">
                        View Invoice
                    </Button>
                  </Link>
                ) : null
                }

                 {(has_invoice && (is_owner || assigned_to === currentUser.pk)) ? (
                <div>
                  <Link to={`/invoices/${id}/edit-invoice`}>
                      <Button variant="primary">
                        Edit Invoice
                      </Button>
                  </Link>
                </div>
                ) : (
                  null
                )}

                  <div>
                    <i className="fa-regular fa-eye"></i>
                  </div>
                </div>
              </div>

              {/* Mobile Display */}
              <div className="col-12 d-md-none mt-3 text-center">
                    <div className="text-right">
                      <Link to={"/"}>
                        <OverlayTrigger
                          placement="top"
                          overlay={
                            <Tooltip id="tooltip-pencil">
                              Edit JobCard
                            </Tooltip>
                          }>
                          <span className={styles.PencilIcon}>
                          <i className="fa-solid fa-pencil"></i>
                          </span>
                        </OverlayTrigger>
                      </Link>
                    </div>

                {/* Job Image Placement */}
                <Card.Img src={image} alt={job_type} />

                <div className={styles.CommentEyes}>
                <Link to={`/jobs/${id}`}>
                    <i className="fa-regular fa-comment"></i>
                    <p>{comment_count}</p>
                </Link>

                {  (!has_invoice && (is_owner || assigned_to === currentUser.pk)) ? (
                  <Link to={{
                    pathname: "/invoices/addinvoice",
                    state: { jobId: id }
                  }}>
                    <Button variant="primary">
                      Add Invoice
                    </Button>
                  </Link>
                ) : has_invoice ? (
                  <Link to={`/invoices/${inv_id}/`}>
                    <Button variant="primary">
                        View Invoice
                    </Button>
                    </Link>
                ) : null
                }

                 {(has_invoice && (is_owner || assigned_to === currentUser.pk)) ? (
                <div>
                  <Link to={`/invoices/${id}/edit-invoice`}>
                      <Button variant="primary">
                        Edit Invoice
                      </Button>
                  </Link>
                </div>
                ) : (
                  null
                )}

                <div>
                    <i className="fa-regular fa-eye"></i>
                  </div>
                </div>
              </div>

              </div>
            </div>
          </div>
        </div>

  )
}

export default JobCard