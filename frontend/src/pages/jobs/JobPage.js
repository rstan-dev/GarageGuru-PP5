import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { axiosReq } from '../../api/axiosDefaults';
import JobCard from './JobCard';
import AddCommentForm from '../comments/AddCommentForm';
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import CommentSection from '../comments/CommentSection';
import InfiniteScroll from "react-infinite-scroll-component";
import Asset from '../../components/Asset';
import { fetchMoreData } from '../../utils/utils';

function JobPage() {
    const { id } = useParams();
    const [job, setJob] = useState({ results: []});
    const currentUser = useCurrentUser();
    const profileImage = currentUser?.profile_image
    const profileName = currentUser?.username
    const [comments, setComments] = useState({ results: []});
    const [commentsCount, setCommentsCount] = useState(0);

    // Retrieve an array of jobs by id
    useEffect(() => {
        const handleMount = async () => {
            try {
                const [{ data: job }, { data: comments }] = await Promise.all([
                    axiosReq.get(`/jobs/${id}/`),
                    axiosReq.get(`/comments/?job=${id}`)
                ])
                setJob({ results: [job]})
                setComments(comments)
                setCommentsCount(comments.count)
            } catch(error) {
                console.log(error)
            }
        }
        handleMount()
    }, [id]);

    console.log(comments)
    console.log(commentsCount)

    return (
    <div>JobPage
        < JobCard
        {...job.results[0]}
        commentsCount={commentsCount}
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
        ) : currentUser ? (
            <span>No comments have been left.  Please enter something here...</span>
        ): null }
    </div>

  )
}

export default JobPage