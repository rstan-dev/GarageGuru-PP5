import React from "react";
import { Link } from "react-router-dom";

import Button from "react-bootstrap/Button";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";

import styles from "../../styles/InvoiceCard.module.css";
import { useCurrentUser } from "../../contexts/CurrentUserContext";

/**
 * InvoiceCard Component
 *
 * This component renders an individual invoice card with details of the invoice.
 * It includes functionality to display an edit button based on user permissions
 * and a view job button.
 **/
const InvoiceCard = (props) => {
	const {
		inv_id,
		inv_owner,
		inv_owner_id,
		job_assigned_to,
		job_assigned_to_id,
		customer_firstname,
		customer_lastname,
		customer_email,
		customer_phone,
		inv_updated_at,
		inv_due_date,
		amount,
		invoice_status,
		id,
		job_type,
		status,
		jobId,
		jobType,
		jobStatus,
	} = props;

	// Fetching current user details for permission checks.
	const currentUser = useCurrentUser();

	/**
	 * EditInvoiceCardLink Component
	 *
	 * Renders a link to the edit invoice page if the current user is authorized.
	 * Shows a disabled button otherwise, indicating that editing is unavailable.
	 */
	const EditInvoiceCardLink = () => (
		<div className='text-right'>
			{inv_owner === currentUser?.username ||
			job_assigned_to === currentUser?.username ? (
				<Link to={`/invoices/${inv_id}/edit-invoice`}>
					<Button variant='primary'>Edit Invoice</Button>
				</Link>
			) : (
				<Button
					variant='outline-secondary'
					disabled>
					<div className={styles.DisabledButton}>Editing unavailable.</div>
					<div
						className={
							styles.DisabledButton
						}>{`Only ${inv_owner} or ${job_assigned_to} can edit this job`}</div>
				</Button>
			)}
		</div>
	);

	/**
	 * DisplayViewJobButton Component
	 *
	 * Renders a button to navigate to the job's detailed view page.
	 */
	const DisplayViewJobButton = () => (
		<div className={styles.JobButtonContainer}>
			<Link to={`/jobs/${id || jobId}`}>
				<Button variant='primary'>View Job</Button>
			</Link>
		</div>
	);

	return (
		<div className={styles.CardBlock}>
			<div className='card'>
				<div className='card-body'>
					<div className={styles.InvoiceCardHeaderContainer}>
						<p className={styles.InvoiceCardHeader}>INVOICE CARD</p>
						<EditInvoiceCardLink />
					</div>
					<div className='row'>
						<div className='col-md-8'>
							<table className='table table-striped'>
								<tbody>
									<tr>
										<th>Invoice Number:</th>
										<td>{inv_id}</td>
									</tr>
									<tr>
										<th>Customer:</th>
										<td>
											{customer_firstname} {customer_lastname}
										</td>
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
										<td>
											<Link to={`/profile/${inv_owner_id}`}>{inv_owner}</Link>
										</td>
									</tr>
									<tr>
										<th>Job Assigned To:</th>
										<td>
											<Link to={`/profile/${job_assigned_to_id}`}>
												{job_assigned_to}
											</Link>
										</td>
									</tr>
								</tbody>
							</table>

							<Accordion defaultActiveKey='1'>
								<Card>
									<Card.Header>
										<div className={styles.CenteredToggle}>
											<Accordion.Toggle
												as={Button}
												variant='link'
												eventKey='0'>
												<span className={styles.ViewJobSummaryLink}>
													Click To View Job Summary
												</span>
											</Accordion.Toggle>
										</div>
									</Card.Header>
									<Accordion.Collapse eventKey='0'>
										<Card.Body>
											<DisplayViewJobButton />
											<table className='table table-striped'>
												<tbody>
													<tr>
														<th>Job No:</th>
														<td>{id || jobId}</td>
													</tr>
													<tr>
														<th>Job Type:</th>
														<td>{job_type || jobType}</td>
													</tr>
													<tr>
														<th>Job Status:</th>
														<td>{status || jobStatus}</td>
													</tr>
												</tbody>
											</table>
										</Card.Body>
									</Accordion.Collapse>
								</Card>
							</Accordion>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default InvoiceCard;
