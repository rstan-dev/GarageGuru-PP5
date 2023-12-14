import React from "react";
import { formatDate } from "../../utils/utils";

import { Link, useLocation } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Accordion from "react-bootstrap/Accordion";

import styles from "../../styles/JobCard.module.css";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
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
		assigned_username,
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
		onWatchStatusChange,
		shouldRemoveOnUnwatch
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

	// Handles logic for watching a job.
	const handleWatch = async () => {
		try {
			const { data } = await axiosRes.post("/watchers/", { job: id });
			// Behavior for AllJobsPage
			if (typeof setJobs === 'function') {
				setJobs((prevJobs) => ({
					...prevJobs,
					results: prevJobs.results.map((job) =>
						job.id === id ? { ...job, watch_id: data.id } : job
					),
				}));
			} else {
				// Behavior for JobPage (JobCard)
				onWatchStatusChange(data.id);
			}
		} catch (err) {
			// console.log(err);
		}
	};

	// Handles logic for unwatching a job, depending if its on Watched Jobs page
	// or AllJobs Page or JobCard.
	const handleUnwatch = async () => {
		try {
			await axiosRes.delete(`/watchers/${watch_id}/`);
			if (shouldRemoveOnUnwatch) {
				// Behavior for Watched Jobs Page
				onUnwatch();
			} else if (typeof setJobs === 'function') {
				// Behavior for AllJobsPage
				setJobs((prevJobs) => ({
					...prevJobs,
					results: prevJobs.results.map((job) =>
						job.id === id ? { ...job, watch_id: null } : job
					),
				}));
			} else {
				// Behavior for JobPage (JobCard)
				onWatchStatusChange(null);
			}
		} catch (err) {
			// console.log(err);
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
					<div className={styles.DisabledJobEditButton}>
						Editing unavailable.
					</div>
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
		const location = useLocation();
		const linkPath = `/jobs/${id}`;
		const isCurrentPage = location.pathname === linkPath;

		const CommentContent = ({ isActive }) => (
			<div className={isActive ? styles.CommentBubbleActive : styles.CommentBubbleGrey}>
				<i className='fa-regular fa-comment' aria-hidden='true'></i>
				<span>{isActive ? `${displayCommentCount} commenting` : 'leave a comment'}</span>
			</div>
		);

		return (
			<>
				{isCurrentPage ? (
					<CommentContent isActive={displayCommentCount > 0} />
				) : (
					<Link to={linkPath}>
						<CommentContent isActive={displayCommentCount > 0} />
					</Link>
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
					<i
						className='fa-regular fa-eye'
						aria-hidden='true'></i>
				</div>
			) : (
				<div
					className={`${styles.EyeUnwatched}`}
					onClick={handleWatch}>
					<i
						className='fa-regular fa-eye'
						aria-hidden='true'></i>
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
							}>{`Only ${owner} or ${assigned_username} can add an invoice`}</div>
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
											<i
												className='fa-solid fa-hashtag'
												aria-hidden='true'></i>
											Job No:
										</th>
										<td>{id}</td>
									</tr>
									<tr>
										<th>
											<i
												className='fa-solid fa-wrench'
												aria-hidden='true'></i>
											Job Type:
										</th>
										<td>{job_type}</td>
									</tr>
									<tr>
										<th>
											<i
												className='fa-solid fa-circle-info'
												aria-hidden='true'></i>
											Details:
										</th>
										<td>{job_details}</td>
									</tr>
									<tr>
										<th>
											<i
												className='fa-solid fa-user'
												aria-hidden='true'></i>
											Created By:
										</th>
										<td>
											<Link to={`/profile/${owner_id}`}>{owner}</Link>
										</td>
									</tr>
									<tr>
										<th>
											<i
												className='fa-solid fa-calendar-days'
												aria-hidden='true'></i>
											Created on:
										</th>
										<td>{created_at}</td>
									</tr>
									<tr>
										<th>
											<i
												className='fa-regular fa-calendar-plus'
												aria-hidden='true'></i>{" "}
											Updated on:
										</th>
										<td>{updated_at}</td>
									</tr>
									<tr>
										<th>
											<i
												className='fa-regular fa-calendar-check'
												aria-hidden='true'></i>
											Due date:
										</th>
										<td>{formatDate(due_date)}</td>
									</tr>
									<tr>
										<th>
											<i
												className='fa-regular fa-id-badge'
												aria-hidden='true'></i>
											Assigned to:
										</th>
										<td>
											<Link to={`/profile/${assigned_to}`}>
												{assigned_username}
											</Link>
										</td>
									</tr>
									<tr>
										<th>
											<i
												className='fa-solid fa-circle-question'
												aria-hidden='true'></i>
											Status:
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
