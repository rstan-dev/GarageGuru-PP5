import React, { useEffect, useState } from "react";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { useHistory } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";

import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

import styles from "../../styles/AllInvoicesPage.module.css";
import InvoiceCard from "./InvoiceCard";
import Asset from "../../components/Asset";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchMoreData } from "../../utils/utils";
import BackToTop from "../../components/BackToTop";

/**
 * AllInvoicesPage Component
 *
 * This component renders a page displaying all invoices. It includes functionality
 * for fetching invoices data, searching, sorting, and displaying the status counts.
 * It also handles redirecting to the login page if the current user is not authenticated.
 */
function AllInvoicesPage() {
	// Fetching current user details for authentication checks.
	const currentUser = useCurrentUser();

	// State for managing the invoices data, job data and their loading status.
	const [invoices, setInvoices] = useState({ results: [] });
	const [jobs, setJobs] = useState([]);
	const [hasLoaded, setHasLoaded] = useState(false);

	// State to manage status counts, search query, ordering fields and selection
	// status.
	const [statusCounts, setStatusCounts] = useState({
		Pending: 0,
		Invoiced: 0,
		Paid: 0,
	});
	const [query, setQuery] = useState("");
	const [orderingField, setOrderingField] = useState("-updated_at");
	const [selectedStatus, setSelectedStatus] = useState(null);

	const history = useHistory();

	// Effect to fetch invoices and jobs on component mount or when dependencies change.
	useEffect(() => {
		// Fetches invoice data from the server and updates state.
		const fetchInvoices = async () => {
			try {
				const { data } = await axiosReq.get(
					`/invoices/?search=${query}&ordering=${orderingField}`
				);
				setInvoices(data);
				setStatusCounts(data.invoice_status_counts);
				setHasLoaded(true);
			} catch (err) {
				// console.log(err);
			}
		};
		setHasLoaded(false);
		fetchInvoices();

		// Fetches job data from the server and updates state.
		const fetchJobs = async () => {
			try {
				const response = await axiosReq.get(`/jobs/`);
				const jobsData = response.data.results;
				setJobs(jobsData);
				setHasLoaded(true);
			} catch (err) {
				// console.log(err);
			}
		};
		setHasLoaded(false);
		fetchJobs();
	}, [currentUser, history, query, orderingField]);

	/**
	 * Handles the ordering field state based on the selected field.
	 **/
	const handleOrderBy = (field) => {
		// Sets the ordering field state for created date, updated date
		// and due date
		setOrderingField(field);
	};

	/**
	 * Clears the search query state.
	 */
	const handleClearSearch = () => {
		// Clears the query state when X button is clicked
		setQuery("");
	};

	return (
		<Container className={styles.AllInvoicesContainer}>
			<Col
				xs={12}
				sm={12}
				md={10}
				lg={10}
				xl={10}
				className='mx-auto'>
				<div className={styles.CardBlock}>
					{/* Dashboard Section */}
					<Card className={styles.StatusCard}>
						<p className={styles.DashboardHeadings}>Dashboard</p>
						<div className={`row ${styles["StatusBlock"]}`}>
							{/* Pending Status */}
							<div className='col-md-4'>
								<div
									className={`card ${styles.CardPointer} ${
										selectedStatus === "Pending" ? styles["PendingBorder"] : ""
									}`}
									onClick={() => {
										setQuery("Pending");
										setSelectedStatus("Pending");
									}}>
									<div
										className={`card-body text-center ${styles.StatusIconContainer}`}>
										<i
											className={`fa-solid fa-bell-concierge ${styles["PendingIcon"]}`}></i>
										<div className={styles.Title}>Pending</div>
										<div className={styles.Title}>
											{statusCounts.Pending || "0"}
										</div>
									</div>
								</div>

								{/* Pending Selector Button */}
								<div className={styles.SelectorButton}>
									<Button
										onClick={() => {
											setQuery("Pending");
											setSelectedStatus("Pending");
										}}
										variant='outline-danger'
										size='sm'>
										Set to Pending
									</Button>
								</div>
							</div>

							{/* Invoiced Status */}
							<div className='col-md-4'>
								<div
									className={`card ${styles.CardPointer} ${
										selectedStatus === "Invoiced"
											? styles["InvoicedBorder"]
											: ""
									}`}
									onClick={() => {
										setQuery("Invoiced");
										setSelectedStatus("Invoiced");
									}}>
									<div
										className={`card-body text-center ${styles.StatusIconContainer}`}>
										<i
											className={`fa-solid fa-hourglass-half ${styles["InvoicedIcon"]}`}></i>
										<div className={styles.Title}>Invoiced</div>
										<div className={styles.Title}>
											{statusCounts.Invoiced || "0"}
										</div>
									</div>
								</div>

								{/* Invoiced Selector Button */}
								<div className={styles.SelectorButton}>
									<Button
										onClick={() => {
											setQuery("Invoiced");
											setSelectedStatus("Invoiced");
										}}
										variant='outline-warning'
										size='sm'>
										Set to Invoiced
									</Button>
								</div>
							</div>

							{/* Paid Status */}
							<div className='col-md-4'>
								<div
									className={`card ${styles.CardPointer} ${
										selectedStatus === "Paid" ? styles["PaidBorder"] : ""
									}`}
									onClick={() => {
										setQuery("Paid");
										setSelectedStatus("Paid");
									}}>
									<div
										className={`card-body text-center ${styles.StatusIconContainer}`}>
										<i
											className={`fa-solid fa-hourglass-half ${styles["PaidIcon"]}`}></i>
										<div className={styles.Title}>Paid</div>
										<div className={styles.Title}>
											{statusCounts.Paid || "0"}
										</div>
									</div>
								</div>

								{/* Paid Selector Button */}
								<div className={styles.SelectorButton}>
									<Button
										onClick={() => {
											setQuery("Paid");
											setSelectedStatus("Paid");
										}}
										variant='outline-success'
										size='sm'>
										Set to Paid
									</Button>
								</div>
							</div>
						</div>

						{/* Order by section */}
						<p className={`text-md-end ${styles.DashboardHeadings}`}>
							Order by:
						</p>
						<div className={`row ${styles.OrderBySection}`}>
							<div className={`col-md-4 ${styles.OrderByBtnContainers}`}>
								<Button
									onClick={() => handleOrderBy("-created_at")}
									variant='outline-info'
									size='sm'>
									Recently Created
								</Button>
							</div>
							<div className={`col-md-4 ${styles.OrderByBtnContainers}`}>
								<Button
									onClick={() => handleOrderBy("-updated_at")}
									variant='outline-info'
									size='sm'>
									Recently Updated
								</Button>
							</div>
							<div className={`col-md-4 ${styles.OrderByBtnContainers}`}>
								<Button
									onClick={() => handleOrderBy("due_date")}
									variant='outline-info'
									size='sm'>
									Due Date
								</Button>
							</div>
						</div>

						{/* Search bar section */}
						<p className={`text-md-end ${styles.DashboardHeadings}`}>
							Keyword search:
						</p>
						<div className={styles.SearchBarContainer}>
							<i className={`fas fa-search ${styles.SearchIcon}`} />
							<Form
								className={styles.SearchBar}
								onSubmit={(event) => event.preventDefault()}>
								<Form.Control
									type='text'
									className='mr-sm-2'
									placeholder='Search jobs'
									value={query}
									onChange={(event) => setQuery(event.target.value)}
								/>
								{query && (
									<div
										className={styles.ClearSearchButton}
										onClick={handleClearSearch}>
										<i className='fa-regular fa-circle-xmark'></i>
									</div>
								)}
							</Form>
						</div>
					</Card>
				</div>

				{/* Invoice Cards */}
				{hasLoaded ? (
					<>
						{invoices.results?.length ? (
							<InfiniteScroll
								children={invoices.results.map((invoice) => {
									// Find the corresponding job for this invoice
									const relatedJob = jobs.find(
										(job) => job.id === invoice.job_id
									);

									return (
										<InvoiceCard
											key={invoice.inv_id}
											{...invoice}
											jobId={relatedJob?.id}
											jobType={relatedJob?.job_type}
											jobStatus={relatedJob?.status}
											setInvoices={setInvoices}
										/>
									);
								})}
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
					<Asset
						spinner
						message={"loading jobs"}
					/>
				)}
			</Col>
			<div>
				<BackToTop />
			</div>
		</Container>
	);
}

export default AllInvoicesPage;
