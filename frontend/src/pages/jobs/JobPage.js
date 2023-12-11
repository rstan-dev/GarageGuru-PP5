import React, { useEffect, useState, useRef } from "react";
import { useParams, useHistory } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import JobCard from "./JobCard";
import AddCommentForm from "../comments/AddCommentForm";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import CommentSection from "../comments/CommentSection";
import InfiniteScroll from "react-infinite-scroll-component";
import Asset from "../../components/Asset";
import { fetchMoreData } from "../../utils/utils";
import styles from "../../styles/JobPage.module.css";

/**
 * JobPage Component
 *
 * This component renders a page displaying detailed information about a
 * specific job, including related comments and invoices.
 * It fetches job, comments, and invoice data from the server based on
 * the job ID obtained from the URL parameters.
 **/
function JobPage() {
	// Extracts job ID from URL parameters.
	const { id } = useParams();

	// Fetching current user details for displaying profile image and username.
	const currentUser = useCurrentUser();
	const profileImage = currentUser?.profile_image;
	const profileName = currentUser?.username;

	// State for managing the job, comments, comments count and invoice data.
	const [job, setJob] = useState({ results: [] });
	const [comments, setComments] = useState({ results: [] });
	const [commentsCount, setCommentsCount] = useState(0);
	const [invoice, setInvoice] = useState({ results: [] });

	const history = useHistory();
	const isMountedRef = useRef(true);

	/**
	 * Fetches job, comments, and invoice data from the server when the component mounts or the job ID changes.
	 * Applies the fetched data to the component's state.
	 */
	useEffect(() => {
		const handleMount = async () => {
			try {
				const [{ data: job }, { data: comments }, { data: invoice }] =
					await Promise.all([
						axiosReq.get(`/jobs/${id}/`),
						axiosReq.get(`/comments/?job=${id}`),
						axiosReq.get(`/invoices/?job_id=${id}`),
					]);
				if (isMountedRef.current) {
					setJob({ results: [job] });
					setComments(comments);
					setCommentsCount(job.comment_count);
					setInvoice({ ...invoice });
				}
			} catch (err) {
				if (isMountedRef.current) {
					console.log(err);
					history.push('/404-error-page')
				}
			}
		};
		handleMount();

		return () => {
			isMountedRef.current = false;
		};
	}, [id, currentUser, history]);

	// Handles the watch status change, passed to JobCard component
	const handleWatchStatusChange = (newWatchId) => {
		setJob((prevJob) => {
			const updatedJob = { ...prevJob.results[0], watch_id: newWatchId };
			return { results: [updatedJob] };
		});
	};

	return (
		<div>
			<JobCard
				{...job.results[0]}
				commentsCount={commentsCount}
				{...invoice.results[0]}
				onWatchStatusChange={handleWatchStatusChange}
				shouldRemoveOnUnwatch={false}
			/>
			{currentUser ? (
				<>
					<p className={styles.CommentTitle}>Leave a comment</p>
					<AddCommentForm
						profileImage={profileImage}
						profileName={profileName}
						job={id}
						setJob={setJob}
						setComments={setComments}
						setCommentsCount={setCommentsCount}
					/>
				</>
			) : comments.results.length ? (
				"comments"
			) : null}
			{comments.results.length ? (
				<>
					<p className={styles.CommentTitle}>Previous comments</p>
					<InfiniteScroll
						children={comments.results.map((comment) => (
							<CommentSection
								job={id}
								key={comment.id}
								{...comment}
								setJob={setJob}
								setComments={setComments}
								setCommentsCount={setCommentsCount}
							/>
						))}
						dataLength={comments.results.length}
						loader={<Asset spinner />}
						hasMore={!!comments.next}
						next={() => fetchMoreData(comments, setComments)}
					/>
				</>
			) : currentUser ? (
				<div className={styles.NoCommentsSection}>
					<p className={styles.CommentTitle}>
						No comments have been left yet...
					</p>
				</div>
			) : null}
		</div>
	);
}

export default JobPage;
