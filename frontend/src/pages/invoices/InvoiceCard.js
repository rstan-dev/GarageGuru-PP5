import React from 'react'
import { Link  } from "react-router-dom";

import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip'
import Button from 'react-bootstrap/Button';

import styles from '../../styles/InvoiceCard.module.css'
import { useCurrentUser } from '../../contexts/CurrentUserContext';

const InvoiceCard = (props) => {

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
    id,
    job_type,
    status,
  } = props

  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === inv_owner;


  return (
    <div className={styles.CardBlock}>
      <div className="card">
        <div className="card-body">
          <p className={styles.InvoiceCardHeader}>INVOICE CARD</p>
            <div className="row">
              <div className="col-md-8">
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
                      <tr>
                        <th>
                          Job Details:
                          <Link to={`/jobs/${id}`}>
                          <Button variant="primary">View Job</Button>
                          </Link>
                        </th>
                      </tr>
                      <tr>
                        <th>
                          <div>
                            Job No:
                          </div>
                          <div>
                            Job Type:
                          </div>
                          <div>
                            Job Status:
                          </div>
                        </th>
                        <td>
                        <div>{id}</div>
                        <div>{job_type}</div>
                        <div>{status}</div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* Desktop Display */}
                <div className="col-md-4 d-none d-md-block text-center">
                    { (is_owner || job_assigned_to === currentUser) ? (
                      <div className="text-right">
                        <Link to={`/invoices/${inv_id}/edit-invoice`}>
                          <OverlayTrigger
                            placement="top"
                            overlay={
                              <Tooltip id="tooltip-pencil">
                                Edit Invoice
                              </Tooltip>
                            }>
                            <span className={styles.PencilIcon}>
                            <i className="fa-solid fa-pencil"></i>
                            </span>
                          </OverlayTrigger>
                        </Link>
                      </div>
                    ) : null
                    }
                  </div>
           </div>
          </div>
        </div>
      </div>
  )
}

export default InvoiceCard