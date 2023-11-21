import React from 'react'
import { Link  } from "react-router-dom";

import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip'

import styles from '../../styles/InvoiceCard.module.css'

const InvoiceCard = () => {


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
                        <td>Placeholder Inv No</td>
                      </tr>
                      <tr>
                        <th>Customer:</th>
                        <td>Placeholder Customer Name</td>
                      </tr>
                      <tr>
                        <th>Email:</th>
                        <td>Placeholder Email</td>
                      </tr>
                      <tr>
                        <th>Phone:</th>
                        <td>Placeholder Phone</td>
                      </tr>
                      <tr>
                        <th>Amount:</th>
                        <td>£Placeholder Amount</td>
                      </tr>
                      <tr>
                        <th>Invoice Due:</th>
                        <td>Placeholder Due date</td>
                      </tr>
                      <tr>
                        <th>Invoice Staus:</th>
                        <td>Placeholder Inv Status</td>
                      </tr>
                      <tr>
                        <th>Updated on:</th>
                        <td>Placeholder Updated date</td>
                      </tr>
                      <tr>
                        <th>Created by:</th>
                        <td>Placeholder owner username</td>
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