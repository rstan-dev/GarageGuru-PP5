import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Accordion from "react-bootstrap/Accordion";

import styles from "../../styles/JobCard.module.css";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { axiosReq } from "../../api/axiosDefaults";
import { axiosRes } from "../../api/axiosDefaults";

/**
 * JobCard Component
 *
 * This component renders an individual job card with details of the job.
 * It includes functionality to display editing, watching, and commenting features based on user permissions
 * and job status. It also manages invoice-related actions.
 **/
const JobCard = (props) => {
	const {
		id,
		owner,
		owner_id,
		job_type,
		job_details,
		created_at,
		updated_at,
		due_date,
		assigned_to,
		status,
		image,
		has_invoice,
		comment_count,
		invoice_details,
		watch_id,
		setJobs,
		jobs,
		onUnwatch,
		commentsCount,
	} = props;

	const {
		inv_id,
		customer_firstname,
		customer_lastname,
		amount,
		invoice_status,
	} = invoice_details || {};

	// Fetches current user details for permission checks.
	const currentUser = useCurrentUser();
	const is_owner = currentUser?.username === owner;

	// State for managing assigned users username.
	const [assignedUsername, setAssignedUsername] = useState();

	/**
	 * Fetches username for the user assigned to the job.
	 * Updates the assignedUsername state based on the fetched data.
	 */
	useEffect(() => {
		let isMounted = true; // Flag to track if the component is mounted.
		const getProfileUsername = async () => {
			if (assigned_to) {
				try {
					const response = await axiosReq.get(`/profiles/${assigned_to}/`);
					if (isMounted) {
						setAssignedUsername(response.data.owner);
					}
				} catch (err) {
					console.log(err);
				}
			}
		};
		getProfileUsername();
		return () => {
			isMounted = false; // Set the flag to false when the component unmounts.
		};
	}, [assigned_to]);

	// Handles logic for watching a job.
	const handleWatch = async () => {
		try {
			const { data } = await axiosRes.post("/watchers/", { job: id });
			setJobs((prevJobs) => ({
				...prevJobs,
				results: prevJobs.results.map((job) => {
					return job.id === id ? { ...job, watch_id: data.id } : job;
				}),
			}));
		} catch (err) {
			console.log(err);
		}
	};

	// Handles logic for unwatching a job.
	const handleUnwatch = async () => {
		// Updates the UI by removing the unwatched job before calling axiosRes.delete.
		try {
			setJobs((prevJobs) => ({
				...prevJobs,
				results: prevJobs.results.filter((job) => job.id !== id),
			}));

			await axiosRes.delete(`/watchers/${watch_id}/`);
			onUnwatch();
		} catch (err) {
			console.log(err);
			// Reverts the state if there is an error.
			setJobs(jobs);
		}
	};

	// Reusable component for EditJobCard
	const EditJobCardLink = () => (
		<div className='text-right'>
			{is_owner ? (
				<Link to={`/jobs/${id}/edit-job`}>
					<Button variant='primary'>Edit Job Card</Button>
				</Link>
			) : (
				<Button
					variant='outline-secondary'
						disabled
					size='sm'>
					<div className={styles.DisabledJobEditButton}>Editing unavailable.</div>
					<div
						className={
							styles.DisabledJobEditButton
						}>{`Only ${owner} can edit this job`}</div>
				</Button>
			)}
		</div>
	);

	// Reusable component for JobCard Image.
	const JobImage = () => (
		<Card.Img
			src={image}
			alt={job_type}
			className={styles.JobImage}
		/>
	);

	// Reusable component for Comments Icon.
	const CommentBubble = () => {
		const displayCommentCount = commentsCount || comment_count;

		return (
			<>
				{displayCommentCount > 0 ? (
					<div className={styles.CommentBubbleActive}>
						<Link to={`/jobs/${id}`}>
							<i className='fa-regular fa-comment'></i>
							<span>{displayCommentCount} commenting</span>
						</Link>
					</div>
				) : (
					<div className={styles.CommentBubbleGrey}>
						<Link to={`/jobs/${id}`}>
							<i className='fa-regular fa-comment'></i>
							<span>leave a comment</span>
						</Link>
					</div>
				)}
			</>
		);
	};

	// Reusable component for displaying Watching Icon.
	const DisplayWatchIcon = () => (
		<>
			{watch_id ? (
				<div
					className={`${styles.EyeWatched}`}
					onClick={handleUnwatch}>
					<i className='fa-regular fa-eye'></i>
				</div>
			) : (
				<div
					className={`${styles.EyeUnwatched}`}
					onClick={handleWatch}>
					<i className='fa-regular fa-eye'></i>
				</div>
			)}
		</>
	);

	// Reusable component for displaying Add Invoice Button.
	const DisplayAddInvoiceButton = () => (
		<>
			{!has_invoice && (is_owner || assigned_to === currentUser.pk) ? (
				<Link
					to={{
						pathname: "/invoices/addinvoice",
						state: { jobId: id },
					}}>
					<Button
						variant='primary'
						size='lg'
						block>
						Add Invoice
					</Button>
				</Link>
			) : (
				<div>
					<Button
						variant='outline-secondary'
						disabled
						siz='lg'
						block>
						<div className={styles.DisabledButton}>No invoice to display.</div>
						<div
							className={
								styles.DisabledButton
							}>{`Only ${owner} or ${assignedUsername} can add an invoice`}</div>
					</Button>
				</div>
			)}
		</>
	);

	// Reusable component for displaying View or Edit Invoice Button.
	const DisplayEditViewInvoiceButton = () => (
		<>
			{has_invoice ? (
				<div className={styles.InvoiceButtonContainer}>
					<Link to={`/invoices/${inv_id}/`}>
						<Button variant='primary'>View Full Invoice</Button>
					</Link>

					{(is_owner || assigned_to === currentUser.pk) && (
						<Link to={`/invoices/${inv_id}/edit-invoice`}>
							<Button variant='primary'>Edit Invoice</Button>
						</Link>
					)}
				</div>
			) : null}
		</>
	);

	return (
		<div className={styles.CardBlock}>
			<div className={`card ${styles.JobCard}`}>
				<div className='card-body'>
					<div className={styles.JobCardHeaderContainer}>
						<p className={styles.JobCardHeader}>JOBCARD</p>
						<EditJobCardLink />
					</div>
					<div className='row'>
						<div className='col-md-8'>
							<table className='table table-striped'>
								<tbody>
									<tr>
										<th>
											<i className='fa-solid fa-hashtag'></i>Job No:
										</th>
										<td>{id}</td>
									</tr>
									<tr>
										<th>
											<i className='fa-solid fa-wrench'></i>Job Type:
										</th>
										<td>{job_type}</td>
									</tr>
									<tr>
										<th>
											<i className='fa-solid fa-circle-info'></i>Details:
										</th>
										<td>{job_details}</td>
									</tr>
									<tr>
										<th>
											<i className='fa-solid fa-user'></i>Created By:
										</th>
										<td>
											<Link to={`/profile/${owner_id}`}>{owner}</Link>
										</td>
									</tr>
									<tr>
										<th>
											<i className='fa-solid fa-calendar-days'></i>Created on:
										</th>
										<td>{created_at}</td>
									</tr>
									<tr>
										<th>
											<i className='fa-regular fa-calendar-plus'></i> Updated
											on:
										</th>
										<td>{updated_at}</td>
									</tr>
									<tr>
										<th>
											<i className='fa-regular fa-calendar-check'></i>Due date:
										</th>
										<td>{due_date}</td>
									</tr>
									<tr>
										<th>
											<i className='fa-regular fa-id-badge'></i>Assigned to:
										</th>
										<td>
											<Link to={`/profile/${assigned_to}`}>
												{assignedUsername}
											</Link>
										</td>
									</tr>
									<tr>
										<th>
											<i className='fa-solid fa-circle-question'></i>Status:
										</th>
										<td>{status}</td>
									</tr>
								</tbody>
							</table>
							<div className={styles.CommentWatchContainer}>
								<CommentBubble />
								<DisplayWatchIcon />
							</div>

							{has_invoice ? (
								<Accordion defaultActiveKey='1'>
									<Card>
										<Card.Header>
											<div className={styles.CenteredToggle}>
												<Accordion.Toggle
													as={Button}
													variant='link'
													eventKey='0'>
													<span className={styles.ViewInvoiceLink}>
														Click To View Invoice Summary
													</span>
												</Accordion.Toggle>
											</div>
										</Card.Header>
										<Accordion.Collapse eventKey='0'>
											<Card.Body>
												<DisplayEditViewInvoiceButton />
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
															<th>Amount:</th>
															<td>£{amount}</td>
														</tr>
														<tr>
															<th>Invoice Status:</th>
															<td>{invoice_status}</td>
														</tr>
													</tbody>
												</table>
											</Card.Body>
										</Accordion.Collapse>
									</Card>
								</Accordion>
							) : (
								<div className={styles.AddInvoiceContainer}>
									<DisplayAddInvoiceButton />
								</div>
							)}
						</div>

						{/* Desktop Display */}
						<div
							className={`col-md-4 d-none d-md-block text-center ${styles.JobImageContainer}`}>
							<JobImage />
						</div>

						{/* Mobile Display */}
						<div className='col-12 d-md-none mt-3 text-center'>
							<JobImage />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default JobCard;
