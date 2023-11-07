import React, { useState } from 'react'

import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';

import styles from '../../styles/JobCard.module.css'

function AllJobsPage() {


    return (
        <Container className={styles.JobCard}>
            <Col xs={12} sm={12} md={10} lg={10} xl={10}>
                    <div className={styles.CardBlock}>
                    <div className="row">
                        <div className="col-md-4">
                            <div className="card">
                                <div className="card-body text-center">
                                <i className={`fa-solid fa-bell-concierge ${styles['PendingIcon']}`}></i>
                                <h2 className="card-title">Pending</h2>
                                <p className="card-text">0</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="card">
                                <div className="card-body text-center">
                                <i className={`fa-solid fa-hourglass-half ${styles['UnderwayIcon']}`}></i>
                                <h2 className="card-title">Underway</h2>
                                <p className="card-text">0</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="card">
                                <div className="card-body text-center">
                                <i className={`fa-solid fa-flag-checkered ${styles['CompletedIcon']}`}></i>
                                <h2 className="card-title">Completed</h2>
                                <p className="card-text">0</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Col>
        </Container>
  )
}

export default AllJobsPage