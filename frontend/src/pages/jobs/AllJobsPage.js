import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

import styles from "../../styles/AllJobsPage.module.css";
import { axiosReq } from "../../api/axiosDefaults";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import JobCard from "./JobCard";
import Asset from "../../components/Asset";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchMoreData } from "../../utils/utils";
import { useHistory } from "react-router-dom";

/**
 * AllJobsPage Component
 *
 * This component renders a page displaying all jobs with filtering and sorting capabilities.
 * It fetches job data from the server, displays job status counts, and handles query and ordering updates.
 **/
function AllJobsPage({ filter = "" }) {
	// Fetching current user details for authentication checks.
	const currentUser = useCurrentUser();

	// State for managing the jobs data and their loading status, and
	// status counts.
	const [jobs, setJobs] = useState({ results: [] });
	const [hasLoaded, setHasLoaded] = useState(false);
	const [statusCounts, setStatusCounts] = useState({
		Pending: 0,
		Underway: 0,
		Completed: 0,
	});

	// State for managing search queries and ordering of jobs, and the
	// selected status.
	const [query, setQuery] = useState("");
	const [orderingField, setOrderingField] = useState("-created_at");
	const [selectedStatus, setSelectedStatus] = useState(null);

	// useHistory and useLocation hooks for navigation and URL tracking.
	const history = useHistory();
	const { pathname } = useLocation();

	/**
	 * Fetches jobs data from the server when the component mounts or when dependencies change.
	 * Applies filters and ordering based on the component's state and props.
	 */
	useEffect(() => {
		const fetchJobs = async () => {
			try {
				const { data } = await axiosReq.get(
					`/jobs/?${filter}search=${query}&ordering=${orderingField}`
				);
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

	/**
	 * Refetches jobs and status counts, typically used after an update to ensure data consistency.
	 */
	const refetchJobsAndCounts = async () => {
		try {
			const { data } = await axiosReq.get(
				`/jobs/?${filter}search=${query}&ordering=${orderingField}`
			);
			setJobs(data);
			setStatusCounts(data.status_counts);
		} catch (err) {
			console.log(err);
		}
	};

	/**
	 * Sets the ordering field state for created date, updated date
	 * and due date.
	 **/
	const handleOrderBy = (field) => {
		setOrderingField(field);
	};

	/**
	 * Clears the search query state.
	 */
	const handleClearSearch = () => {
		// Clears the query state when X button is clicked.
		setQuery("");
	};

	return (
		<Container className={styles.AllJobsContainer}>
			<Col
				xs={12}
				sm={12}
				md={10}
				lg={10}
				xl={10}
				className='mx-auto'>
				<div className={styles.CardBlock}>
					{/* Dashboard Block */}
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

							{/* Underway Status */}
							<div className='col-md-4'>
								<div
									className={`card ${styles.CardPointer} ${
										selectedStatus === "Underway"
											? styles["UnderwayBorder"]
											: ""
									}`}
									onClick={() => {
										setQuery("Underway");
										setSelectedStatus("Underway");
									}}>
									<div
										className={`card-body text-center ${styles.StatusIconContainer}`}>
										<i
											className={`fa-solid fa-hourglass-half ${styles["UnderwayIcon"]}`}></i>
										<div className={styles.Title}>Underway</div>
										<div className={styles.Title}>
											{statusCounts.Underway || "0"}
										</div>
									</div>
								</div>

								{/* Underway Selector Button */}
								<div className={styles.SelectorButton}>
									<Button
										onClick={() => {
											setQuery("Underway");
											setSelectedStatus("Underway");
										}}
										variant='outline-warning'
										size='sm'>
										Set to Underway
									</Button>
								</div>
							</div>

							{/* Completed Status */}
							<div className='col-md-4'>
								<div
									className={`card ${styles.CardPointer} ${
										selectedStatus === "Completed"
											? styles["CompletedBorder"]
											: ""
									}`}
									onClick={() => {
										setQuery("Completed");
										setSelectedStatus("Completed");
									}}>
									<div
										className={`card-body text-center ${styles.StatusIconContainer}`}>
										<i
											className={`fa-solid fa-hourglass-half ${styles["CompletedIcon"]}`}></i>
										<div className={styles.Title}>Completed</div>
										<div className={styles.Title}>
											{statusCounts.Completed || "0"}
										</div>
									</div>
								</div>

								{/* Completed Selector Button */}
								<div className={styles.SelectorButton}>
									<Button
										onClick={() => {
											setQuery("Completed");
											setSelectedStatus("Completed");
										}}
										variant='outline-success'
										size='sm'>
										Set to Completed
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

				{hasLoaded ? (
					<>
						{jobs?.results?.length ? (
							<InfiniteScroll
								children={jobs.results.map((job) => (
									<JobCard
										key={job.id}
										{...job}
										setJobs={setJobs}
										jobs={jobs}
										onUnwatch={refetchJobsAndCounts}
									/>
								))}
								dataLength={jobs.results.length}
								loader={<Asset spinner />}
								hasMore={!!jobs.next}
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
		</Container>
	);
}

export default AllJobsPage;
