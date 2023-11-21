import React, { useEffect, useState } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { axiosReq } from '../../api/axiosDefaults';
import JobCard from './JobCard';
import AddCommentForm from '../comments/AddCommentForm';
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import CommentSection from '../comments/CommentSection';
import InfiniteScroll from "react-infinite-scroll-component";
import Asset from '../../components/Asset';
import { fetchMoreData } from '../../utils/utils';
import axios from 'axios';

function JobPage() {
    const { id } = useParams();
    const [job, setJob] = useState({ results: []});
    const currentUser = useCurrentUser();
    const profileImage = currentUser?.profile_image
    const profileName = currentUser?.username
    const [comments, setComments] = useState({ results: []});
    const [commentsCount, setCommentsCount] = useState(0);
    const [invoice, setInvoice] = useState({ results: []});
    const history = useHistory();

    // Retrieve an array of jobs by id
    useEffect(() => {
        if (!currentUser) {
            // Redirect to login only if currentUser is explicitly null (not undefined)
            history.push("/login");
            return;
          }
        const handleMount = async () => {
            try {
                const [{ data: job }, { data: comments }, { data: invoice }] = await Promise.all([
                    axiosReq.get(`/jobs/${id}/`),
                    axiosReq.get(`/comments/?job=${id}`),
                    axiosReq.get(`/invoices/?job_id=${id}`)
                ])
                setJob({ results: [job]})
                setComments(comments)
                setCommentsCount(comments.count)
                setInvoice({ ...invoice })
            } catch(error) {
                console.log(error)
            }
        }
        handleMount()
    }, [id, currentUser, history]);

    console.log(comments)
    console.log(commentsCount)
    console.log("Invoice Data:", invoice.results)
    console.log("Job Data:", job)

    return (
    <div>JobPage
        < JobCard
        {...job.results[0]}
        commentsCount={commentsCount}
        {...invoice.results[0]}
        />
        {currentUser ? (
        < AddCommentForm
        profileImage={profileImage}
        profileName={profileName}
        job={id}
        setJob={setJob}
        setComments={setComments}
        />
        ) : comments.results.length ? (
            "comments"
        ) : null}
        {comments.results.length ? (
            <>
            <p>Previous comments</p>
            <InfiniteScroll
                children={
                    comments.results.map((comment) => (
                        <CommentSection
                        key={comment.id} {...comment}
                        setJob={setJob}
                        setComments={setComments}
                        />
                    ))
                }
                    dataLength={comments.results.length}
                    loader={<Asset spinner />}
                    hasMore={!!comments.next}
                    next={() => fetchMoreData(comments, setComments)}
                />
            </>
        ) : currentUser ? (
            <span>No comments have been left.  Please enter something here...</span>
        ): null }
    </div>

  )
}

export default JobPage