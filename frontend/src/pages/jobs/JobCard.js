import React from 'react'

import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import { Link  } from "react-router-dom";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import Card from 'react-bootstrap/Card';

import styles from '../../styles/JobCard.module.css'

function JobCard() {

    return (
    <Container className={styles.JobCard}>
        <Col xs={12} sm={12} md={10} lg={10} xl={10}>
            <div>JobCard</div>
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

        <div>
        </div>

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
                        <td>placeholder number</td>
                      </tr>
                      <tr>
                        <th><i className="fa-solid fa-wrench"></i>Job Type:</th>
                        <td>placeholder job type</td>
                      </tr>
                      <tr>
                        <th><i className="fa-solid fa-circle-info"></i>Details:</th>
                        <td>placeholder details</td>
                      </tr>
                      <tr>
                        <th><i className="fa-solid fa-user"></i>Created By:</th>
                        <td>placeholder owner username</td>
                      </tr>
                      <tr>
                        <th><i className="fa-solid fa-calendar-days"></i>Created on:</th>
                        <td>placeholder created date</td>
                      </tr>
                      <tr>
                        <th><i className="fa-regular fa-calendar-plus"></i> Updated on:</th>
                        <td>placeholder uodated date</td>
                      </tr>
                      <tr>
                        <th><i className="fa-regular fa-calendar-check"></i>Due date:</th>
                        <td>placeholder due date</td>
                      </tr>
                      <tr>
                        <th><i className="fa-regular fa-id-badge"></i>Assigned to:</th>
                        <td>placeholder assigned username</td>
                      </tr>
                      <tr>
                        <th><i className="fa-solid fa-circle-question"></i>Status:</th>
                        <td>placeholder status</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="col-md-4 d-none d-md-block text-center">

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


                <Card>placeholder image</Card>
                <div className={styles.CommentEyes}>
                  <i className="fa-regular fa-comment"></i>
                  <i className="fa-regular fa-eye"></i>
                </div>
              </div>

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

                <Card>placeholder image</Card>
                <div className={styles.CommentEyes}>
                  <i className="fa-regular fa-comment"></i>
                  <i className="fa-regular fa-eye"></i>
                </div>
              </div>

              </div>
            </div>
          </div>
        </div>
        </Col>
    </Container>

  )
}

export default JobCard