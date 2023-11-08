import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

import styles from '../../styles/AllJobsPage.module.css'
import { axiosReq } from '../../api/axiosDefaults';
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import JobCard from './JobCard';
import Asset from '../../components/Asset';
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchMoreData } from '../../utils/utils';

function AllJobsPage({ message }) {
    const [jobs, setJobs] = useState({ results: []});
    const [hasLoaded, setHasLoaded] = useState(false);
    const { pathname } = useLocation();
    const currentUser = useCurrentUser();

    const [statusCounts, setStatusCounts] = useState({
        Pending: 0,
        Underway: 0,
        Completed: 0,
    });

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const {data} = await axiosReq.get(`/jobs/?`);
                console.log(data)
                setJobs(data);
                setStatusCounts(data.status_counts);
                setHasLoaded(true);
            } catch (err) {
                console.log(err);
            }
        };
        setHasLoaded(false);
        fetchJobs();

    }, [pathname, currentUser]);


    return (
        <Container className={styles.JobCard}>
            <Col xs={12} sm={12} md={10} lg={10} xl={10}>
                <div className={styles.CardBlock}>
                    {
                    // Status Block //
                    }
                    <div className={`row ${styles['StatusBlock']}`}>
                        <div className="col-md-4">
                            <div className="card">
                                <div className="card-body text-center">
                                <i className={`fa-solid fa-bell-concierge ${styles['PendingIcon']}`}></i>
                                <h2 className="card-title">Pending</h2>
                                <p className="card-text">{statusCounts.Pending}</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="card">
                                <div className="card-body text-center">
                                <i className={`fa-solid fa-hourglass-half ${styles['UnderwayIcon']}`}></i>
                                <h2 className="card-title">Underway</h2>
                                <p className="card-text">{statusCounts.Underway}</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="card">
                                <div className="card-body text-center">
                                <i className={`fa-solid fa-flag-checkered ${styles['CompletedIcon']}`}></i>
                                <h2 className="card-title">Completed</h2>
                                <p className="card-text">{statusCounts.Completed}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    {
                    // Search bar //
                    }
                    <i className={`fas fa-search ${styles.SearchIcon}`} />
                    <Form className={styles.SearchBar}
                    onSubmit={(event) => event.preventDefault()}
                    >
                        <Form.Control
                        type="text"
                        className="mr-sm-2"
                        placeholder="Search jobs"
                        />
                    </Form>
                    </div>

                        {hasLoaded ? (
                        <>
                        { jobs?.results?.length ? (
                            <InfiniteScroll
                              children={
                                jobs.results.map((job) => (
                                    <JobCard key={job.id} {...job} setJobs={setJobs}/>
                                ))
                              }
                              dataLength={jobs.results.length}
                              loader={<Asset spinner />}
                              hasMore={!!jobs.next}
                              next={() => fetchMoreData(jobs, setJobs)}
                            />
                        ) : (
                            <Asset icon={"fa-solid fa-clipboard-question"} message={"No Jobs to display"} />
                        )}
                        </>
                        ) : (
                            <Asset spinner message={"loading jobs"} />
                        )}
            </Col>
        </Container>
  )
}

export default AllJobsPage