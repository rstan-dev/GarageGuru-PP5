import React, { useEffect, useState } from 'react'
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import { useHistory } from "react-router-dom";
import { axiosReq } from '../../api/axiosDefaults';

import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';

import styles from '../../styles/AllInvoicesPage.module.css'
import InvoiceCard from './InvoiceCard';
import Asset from '../../components/Asset';

function AllInvoicesPage() {

    const currentUser = useCurrentUser();
    const [invoices, setInvoices] = useState({ results: []});
    const history = useHistory();
    const [jobs, setJobs] = useState([]);


    useEffect(() => {
        if (!currentUser) {
            // Redirect to login only if currentUser is explicitly null (not undefined)
            history.push("/login");
            return;
          }

        const fetchInvoices = async () => {
            try {
                const {data} = await axiosReq.get(`/invoices/`);
                setInvoices(data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchInvoices();

        const fetchJobs = async () => {
            try {
                const response = await axiosReq.get(`/jobs/`);
                const jobsData = response.data.results;
                console.log("Fetched jobs data:", jobsData);
                setJobs(jobsData);
            } catch (err) {
                console.log(err);
            }
        };
        fetchJobs();

    }, [ currentUser, history ]);

    console.log(`Jobs Data results:`, jobs)
    console.log(`Invocies Data results:`, invoices.results)


    return (
    <>
    <div>AllInvoicesPage</div>

    <Container className={styles.InvoiceCard}>
            <Col xs={12} sm={12} md={10} lg={10} xl={10}>
                <div className={styles.CardBlock}>
                    { invoices.results?.length ? (
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
                        ) : (
                            <Asset
                            icon={"fa-solid fa-clipboard-question"}
                            message={"No Jobs to display"}
                            />
                    )}

                </div>
                </Col>
    </Container>
    </>
  )
}

export default AllInvoicesPage