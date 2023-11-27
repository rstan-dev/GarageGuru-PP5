import React, { useEffect, useState } from 'react'

import { Link  } from "react-router-dom";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Accordion from 'react-bootstrap/Accordion';

import styles from '../../styles/JobCard.module.css'
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import { axiosReq } from '../../api/axiosDefaults';
import { axiosRes } from "../../api/axiosDefaults";

const JobCard = (props) => {

      const {
        id,
        owner,
        owner_id,
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
        invoice_details,
        watch_id,
        setJobs,
        jobs,
        onUnwatch,
      } = props;

      const {
        inv_id,
        customer_firstname,
        customer_lastname,
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
          if (assigned_to) {
            try {
              const response = await axiosReq.get(`/profiles/${assigned_to}/`);
              setAssignedUsername(response.data.owner);
            } catch (error) {
              console.log(error);
            }
          }
        };
        getProfileUsername();
      }, [assigned_to]);

        const handleWatch = async () => {
          try {
            const { data } = await axiosRes.post("/watchers/", { job: id });
            setJobs((prevJobs) => ({
              ...prevJobs,
              results: prevJobs.results.map((job) => {
                return job.id === id
                  ? { ...job, watch_id: data.id }
                  : job;
              }),
            }));
          } catch (err) {
            // console.log(err);
          }
        };

        const handleUnwatch = async () => {
          // Updates the UI by removing the unwatched job before calling axiosRes.delete
          try {
              setJobs(prevJobs => ({
                  ...prevJobs,
                  results: prevJobs.results.filter(job => job.id !== id)
              }));

              await axiosRes.delete(`/watchers/${watch_id}/`);
              onUnwatch();
          } catch (err) {
              console.log(err);
              // reverts the state if there is an error
              setJobs(jobs);
          }
      };

      // Reusable component for EditJobCard
      const EditJobCardLink = () => (
        <div className="text-right">
          <Link to={`/jobs/${id}/edit-job`} data-tooltip="Edit JobCard">
            <span className={styles.PencilIcon}>
              <i className="fa-solid fa-pencil"></i>
            </span>
          </Link>
        </div>
      );

      // Reusable component for JobCard Image
      const JobImage = () => <Card.Img src={image} alt={job_type} />;

      // Reusable component for Comments Icon
      const CommentBubble = () => (
        <>
        {comment_count > 0 ? (
        <div className={styles.CommentBubbleActive}>
          <Link to={`/jobs/${id}`}>
            <i className="fa-regular fa-comment"></i>
            <span>{comment_count} commenting</span>
          </Link>
        </div>
        ) : (
          <div className={styles.CommentBubbleGrey}>
            <Link to={`/jobs/${id}`}>
              <i className="fa-regular fa-comment"></i>
              <span>leave a comment</span>
            </Link>
          </div>

        )}
        </>
      );

      // Reusable component for Displaying View or Edit Invoice Button
      const DisplayEditViewInvoiceButton = () => (
        <>
        {has_invoice ? (
      <div className={styles.InvoiceButtonContainer}>
        <Link to={`/invoices/${inv_id}/`}>
          <Button variant="primary">
            View Full Invoice
          </Button>
        </Link>

        {(is_owner || assigned_to === currentUser.pk) && (
          <Link to={`/invoices/${id}/edit-invoice`}>
            <Button variant="primary">
              Edit Invoice
            </Button>
          </Link>
        )}
      </div>
    ) : (
      null
    )}
        </>
      );

      // Reusable component for Displaying Add Invoice Button
      const DisplayAddInvoiceButton = () => (
        <>
        {(!has_invoice && (is_owner || assigned_to === currentUser.pk)) && (
        <Link to={{
          pathname: "/invoices/addinvoice",
          state: { jobId: id }
        }}>
          <Button variant="primary">
            Add Invoice
          </Button>
        </Link>
      )}
        </>
      );

      // Reusable component for displaying Watching Icon
      const DisplayWatchIcon = () => (
        <>
        { watch_id ? (
          <div
            className={`${styles.EyeWatched }`}
            onClick={handleUnwatch}
          >
            <i className="fa-regular fa-eye"></i>
          </div>
          ) : (
            <div
            className={`${styles.EyeUnwatched}`}
            onClick={handleWatch}
          >
            <i className="fa-regular fa-eye"></i>
          </div>
          )}
        </>
      )

      return (

        <div className={styles.CardBlock}>
          <div className="card">
            <div className="card-body">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <p className={styles.JobCardHeader}>JOBCARD</p>
                {is_owner && <EditJobCardLink />}
              </div>
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
                          <td>
                            <Link to={`/profile/${owner_id}`}>
                            {owner}
                            </Link>
                          </td>
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
                        <td>
                          <Link to={`/profile/${assigned_to}`}>
                          {assignedUsername}
                          </Link>
                        </td>
                      </tr>
                      <tr>
                        <th><i className="fa-solid fa-circle-question"></i>Status:</th>
                        <td>{status}</td>
                      </tr>
                    </tbody>
                  </table>
                  <div className={styles.CommentWatchContainer}>
                  <CommentBubble />
                  <DisplayWatchIcon />
                  </div>

                  <Accordion defaultActiveKey="1">
                    <Card>
                      <Card.Header>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <Accordion.Toggle as={Button} variant="link" eventKey="0">
                            {has_invoice ? "Click To View Invoice Summary" : <span className={styles.NoInvoiceLink}>No Invoice Details To Display</span>}
                          </Accordion.Toggle>
                          <DisplayAddInvoiceButton />
                        </div>
                      </Card.Header>
                        <Accordion.Collapse eventKey="0">
                          <Card.Body>
                          <DisplayEditViewInvoiceButton />
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
                                <th>Amount:</th>
                                <td>£{amount}</td>
                              </tr>
                              <tr>
                                <th>Invoice Status:</th>
                                <td>{invoice_status}</td>
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
                  <JobImage />
                </div>

                {/* Mobile Display */}
                <div className="col-12 d-md-none mt-3 text-center">
                    <JobImage />
                </div>
              </div>
            </div>
          </div>
        </div>

  )
}

export default JobCard