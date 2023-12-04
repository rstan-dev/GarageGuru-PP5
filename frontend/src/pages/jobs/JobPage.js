import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import JobCard from "./JobCard";
import AddCommentForm from "../comments/AddCommentForm";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import CommentSection from "../comments/CommentSection";
import InfiniteScroll from "react-infinite-scroll-component";
import Asset from "../../components/Asset";
import { fetchMoreData } from "../../utils/utils";

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

	/**
	 * Fetches job, comments, and invoice data from the server when the component mounts or the job ID changes.
	 * Applies the fetched data to the component's state.
	 */
	useEffect(() => {
		if (!currentUser) {
			// Redirect to login only if currentUser is explicitly null (not undefined)
			history.push("/login");
			return;
		}
		const handleMount = async () => {
			try {
				const [{ data: job }, { data: comments }, { data: invoice }] =
					await Promise.all([
						axiosReq.get(`/jobs/${id}/`),
						axiosReq.get(`/comments/?job=${id}`),
						axiosReq.get(`/invoices/?job_id=${id}`),
					]);
				setJob({ results: [job] });
				setComments(comments);
				setCommentsCount(job.comment_count);
				setInvoice({ ...invoice });
			} catch (error) {
				console.log(error);
			}
		};
		handleMount();
	}, [id, currentUser, history]);

	return (
		<div>
			JobPage
			<JobCard
				{...job.results[0]}
				commentsCount={commentsCount}
				{...invoice.results[0]}
			/>
			{currentUser ? (
				<AddCommentForm
					profileImage={profileImage}
					profileName={profileName}
					job={id}
					setJob={setJob}
					setComments={setComments}
					setCommentsCount={setCommentsCount}
				/>
			) : comments.results.length ? (
				"comments"
			) : null}
			{comments.results.length ? (
				<>
					<p>Previous comments</p>
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
				<span>No comments have been left. Please enter something here...</span>
			) : null}
		</div>
	);
}

export default JobPage;
