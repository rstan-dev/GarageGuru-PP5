import React from 'react'
import { Link  } from "react-router-dom";

import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip'

import styles from '../../styles/InvoiceCard.module.css'

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
  } = props


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
                    </tbody>
                  </table>
                </div>

                {/* Desktop Display */}
                <div className="col-md-4 d-none d-md-block text-center">
                    <div className="text-right">
                      <Link to={`/`}>
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
                  </div>
           </div>
          </div>
        </div>
      </div>
  )
}

export default InvoiceCard