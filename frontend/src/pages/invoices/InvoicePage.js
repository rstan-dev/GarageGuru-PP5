import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import InvoiceCard from "./InvoiceCard";

/**
 * InvoicePage Component
 *
 * This component renders a page for displaying detailed information about a specific invoice.
 * It fetches invoice data from the server based on the invoice ID obtained from the URL parameters.
 * Additionally, it fetches the job details associated with the invoice.
 */
function InvoicePage() {
	// Extracting invoice ID from URL parameters.
	const { id } = useParams();

	// State for managing invoice data and job details related to the invoice.
	const [invoice, setInvoice] = useState({ results: [] });
	const [jobDetails, setJobDetails] = useState(null);
	const job_id = invoice.results[0]?.job_id;

	const history = useHistory();

	/**
	 * Fetches invoice data from the server when the component mounts or the ID changes.
	 */
	useEffect(() => {
		const handleMount = async () => {
			try {
				// Fetch invoice details by id from params
				const [{ data: invoice }] = await Promise.all([
					axiosReq.get(`/invoices/${id}`),
				]);
				setInvoice({ results: [invoice] });
			} catch (err) {
				console.log(err);
				history.push('/404-error-page')
			}
		};

		handleMount();
	}, [id, history]);

	/**
	 * Fetches job details associated with the invoice when the job_id is available.
	 */
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
	}, [job_id]);

	return (
		<>
			<InvoiceCard
				{...invoice.results[0]}
				{...jobDetails}
			/>
		</>
	);
}

export default InvoicePage;
