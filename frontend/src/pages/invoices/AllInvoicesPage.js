import React, { useEffect, useState } from 'react'
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import { useHistory } from "react-router-dom";
import { axiosReq } from '../../api/axiosDefaults';

import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import styles from '../../styles/AllInvoicesPage.module.css'
import InvoiceCard from './InvoiceCard';
import Asset from '../../components/Asset';
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchMoreData } from '../../utils/utils';

function AllInvoicesPage() {

    const currentUser = useCurrentUser();
    const [invoices, setInvoices] = useState({ results: []});
    const history = useHistory();
    const [jobs, setJobs] = useState([]);

    const [statusCounts, setStatusCounts] = useState({
        Pending: 0,
        Invoiced: 0,
        Paid: 0,
    });

    const [query, setQuery] = useState ("");
    const [orderingField, setOrderingField] = useState('-updated_at');
    const [hasLoaded, setHasLoaded] = useState(false);


    useEffect(() => {
        if (!currentUser) {
            // Redirect to login only if currentUser is explicitly null (not undefined)
            history.push("/login");
            return;
          }

        const fetchInvoices = async () => {
            try {
                const {data} = await axiosReq.get(`/invoices/?search=${query}&ordering=${orderingField}`);
                setInvoices(data);
                setStatusCounts(data.invoice_status_counts);
                setHasLoaded(true);
            } catch (err) {
                console.log(err);
            }
        };
        setHasLoaded(false);
        fetchInvoices();

        const fetchJobs = async () => {
            try {
                const response = await axiosReq.get(`/jobs/`);
                const jobsData = response.data.results;
                console.log("Fetched jobs data:", jobsData);
                setJobs(jobsData);
                setHasLoaded(true);
            } catch (err) {
                console.log(err);
            }
        };
        setHasLoaded(false);
        fetchJobs();

    }, [ currentUser, history, query, orderingField ]);

    const handleOrderBy = (field) => {
        // sets the ordering field state for created date, updated date
        // and due date
        setOrderingField(field);
      };

    console.log(`Jobs Data results:`, jobs)
    console.log(`Invocies Data results:`, invoices.results)


    return (
    <>
    <div>AllInvoicesPage</div>

    <Container className={styles.InvoiceCard}>
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
                            onClick={() => {setQuery("Invoiced")}}>
                            <div className="card">
                                <div className="card-body text-center">
                                    <i className={`fa-solid fa-hourglass-half ${styles['InvoicedIcon']}`}></i>
                                    <h2 className="card-title">Invoiced</h2>
                                    {statusCounts.Invoiced ? (
                                            <p className="card-text">{statusCounts.Invoiced}</p>
                                        ) : (
                                            <p className="card-text">0</p>
                                        )}
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4"
                            onClick={() => {setQuery("Paid")}}>
                            <div className="card">
                                <div className="card-body text-center">
                                <i className={`fa-solid fa-flag-checkered ${styles['PaidIcon']}`}></i>
                                <h2 className="card-title">Paid</h2>
                                    {statusCounts.Paid ? (
                                        <p className="card-text">{statusCounts.Paid}</p>
                                    ) : (
                                        <p className="card-text">0</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {
                    // Order By Filter //
                    }

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
                        placeholder="Search invoices"
                        value={query}
                        onChange={(event) => setQuery(event.target.value)}
                        />
                    </Form>


                    {
                    // Invoice Cards //
                    }

                    {hasLoaded ? (
                    <>
                    { invoices.results?.length ? (
                        <InfiniteScroll
                        children={
                            invoices.results.map((invoice) => {
                                // Find the corresponding job for this invoice
                                const relatedJob = jobs.find(job => job.id === invoice.job_id);

                                return (
                                    <InvoiceCard
                                        key={invoice.id}
                                        {...invoice}
                                        jobId={relatedJob?.id}
                                        jobType={relatedJob?.job_type}
                                        jobStatus={relatedJob?.status}
                                        setInvoices={setInvoices}
                                    />
                                );
                                })
                        }
                        dataLength={invoices.results.length}
                        loader={<Asset spinner />}
                        hasMore={!!invoices.next}
                        next={() => fetchMoreData(jobs, setJobs)}
                        />
                    ) : (
                    <Asset
                    icon={"fa-solid fa-clipboard-question"}
                    message={"No Jobs to display"}
                    />
            )}
                    </>
                    ) : (
                        <Asset spinner message={"loading jobs"} />
                    )}

                </div>
                </Col>
    </Container>
    </>
  )
}

export default AllInvoicesPage