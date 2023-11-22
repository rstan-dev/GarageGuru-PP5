import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import styles from '../../styles/AllJobsPage.module.css'
import { axiosReq } from '../../api/axiosDefaults';
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import JobCard from './JobCard';
import Asset from '../../components/Asset';
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchMoreData } from '../../utils/utils';
import { useHistory } from "react-router-dom";

function AllJobsPage({ message, filter = "" }) {

    const [jobs, setJobs] = useState({ results: []});
    const [hasLoaded, setHasLoaded] = useState(false);
    const { pathname } = useLocation();
    const currentUser = useCurrentUser();
    const history = useHistory();

    const [statusCounts, setStatusCounts] = useState({
        Pending: 0,
        Underway: 0,
        Completed: 0,
    });

    const [query, setQuery] = useState ("");
    const [orderingField, setOrderingField] = useState('-created_at');

    console.log(`Request URL: /jobs/?${filter}search=${query}&ordering=${orderingField}`);

    useEffect(() => {
        if (!currentUser) {
            // Redirect to login only if currentUser is explicitly null (not undefined)
            history.push("/login");
            return;
          }

        const fetchJobs = async () => {
            try {
                const {data} = await axiosReq.get(`/jobs/?${filter}search=${query}&ordering=${orderingField}`);
                setJobs(data);
                setStatusCounts(data.status_counts);
                setHasLoaded(true);
            } catch (err) {
                console.log(err);
            }
        };
        setHasLoaded(false);
        fetchJobs();

    }, [pathname, currentUser, filter, query, orderingField, history]);


    const handleOrderBy = (field) => {
        // sets the ordering field state for created date, updated date
        // and due date
        setOrderingField(field);
      };

      console.log(`Jobs Data`, jobs)


    return (
        <Container className={styles.JobCard}>
            <Col xs={12} sm={12} md={10} lg={10} xl={10}>
                <div className={styles.CardBlock}>
                    {
                    // Status Block //
                    }

                    <p>Filter by:</p>
                    <div className={`row ${styles['StatusBlock']}`}>
                        <div className="col-md-4"
                            onClick={() => {setQuery("Pending")}}>
                            <div className="card">
                                <div className="card-body text-center">
                                    <i className={`fa-solid fa-bell-concierge ${styles['PendingIcon']}`}></i>
                                    <h2 className="card-title">Pending</h2>
                                    {statusCounts.Pending ? (
                                            <p className="card-text">{statusCounts.Pending}</p>
                                        ) : (
                                            <p className="card-text">0</p>
                                        )}
                                </div>
                            </div>

                        </div>
                        <div className="col-md-4"
                            onClick={() => {setQuery("Underway")}}>
                            <div className="card">
                                <div className="card-body text-center">
                                    <i className={`fa-solid fa-hourglass-half ${styles['UnderwayIcon']}`}></i>
                                    <h2 className="card-title">Underway</h2>
                                    {statusCounts.Underway ? (
                                            <p className="card-text">{statusCounts.Underway}</p>
                                        ) : (
                                            <p className="card-text">0</p>
                                        )}
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4"
                            onClick={() => {setQuery("Completed")}}>
                            <div className="card">
                                <div className="card-body text-center">
                                <i className={`fa-solid fa-flag-checkered ${styles['CompletedIcon']}`}></i>
                                <h2 className="card-title">Completed</h2>
                                    {statusCounts.Completed ? (
                                        <p className="card-text">{statusCounts.Completed}</p>
                                    ) : (
                                        <p className="card-text">0</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                    <p className="text-md-end">Order by:</p>
                    <div className={`row ${styles.OrderBySection}`}>

                        <div className="col-md-4">
                            <Button onClick={() => handleOrderBy('-created_at')} variant="secondary">Recently Created</Button>
                        </div>
                        <div className="col-md-4">
                            <Button onClick={() => handleOrderBy('-updated_at')} variant="secondary">Recently Updated</Button>
                        </div>
                        <div className="col-md-4">
                            <Button onClick={() => handleOrderBy('due_date')} variant="secondary">Due Date</Button>
                        </div>

                    </div>
                    {
                    // Search bar //
                    }
                    <i className={`fas fa-search ${styles.SearchIcon}`} />
                    <Form
                    className={styles.SearchBar}
                    onSubmit={(event) => event.preventDefault()}
                    >
                        <Form.Control
                        type="text"
                        className="mr-sm-2"
                        placeholder="Search jobs"
                        value={query}
                        onChange={(event) => setQuery(event.target.value)}
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