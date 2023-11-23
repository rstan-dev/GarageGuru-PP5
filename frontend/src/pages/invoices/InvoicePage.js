import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { axiosReq } from "../../api/axiosDefaults";
import InvoiceCard from './InvoiceCard';

function InvoicePage() {
    const { id } = useParams();
    const [invoice, setInvoice] = useState({ results: []});
    const [jobDetails, setJobDetails] = useState(null);
    const job_id = invoice.results[0]?.job_id

    useEffect(() => {
        const handleMount = async () => {
          try {
            // Fetch invoice details by id from params
            const [{ data: invoice }] = await Promise.all([axiosReq.get(`/invoices/${id}`),]);
              console.log("Fetched Invoice Data:", invoice);
            setInvoice({ results: [invoice] });
          } catch (err) {
            console.log(err);
          }
        };

        handleMount();
      }, [id]);

      useEffect(() => {
        const fetchJobData = async () => {
          try {
           // Fetch job details by job_id from the invoice
             if (job_id) {
              const jobData = await axiosReq.get(`/jobs/${job_id}`);
              setJobDetails(jobData.data);
          }
        } catch (err) {
          console.log(err);
        }
      };
      fetchJobData();
      }, [job_id] );

    return (
    <>
    <div>Invoice Page</div>
    < InvoiceCard
    {...invoice.results[0]}
    {...jobDetails}
    />
    {/* <div>
      No Invoice to display
    </div> */}
    </>
  )
}

export default InvoicePage