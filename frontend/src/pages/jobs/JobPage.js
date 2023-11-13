import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { axiosReq } from '../../api/axiosDefaults';
import JobCard from './JobCard';
import AddCommentForm from '../comments/AddCommentForm';
import { useCurrentUser } from '../../contexts/CurrentUserContext';

function JobPage() {
    const { id } = useParams();
    const [job, setJob] = useState({ results: []});
    const currentUser = useCurrentUser();
    const profileImage = currentUser?.profile_image
    const profileName = currentUser?.username
    const [comments, setComments] = useState({ results: []});

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
            } catch(error) {
                console.log(error)
            }
        }
        handleMount()
    }, [id]);

    console.log(comments)

    return (
    <div>JobPage
        < JobCard {...job.results[0]}/>
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
            comments.results.map((comment) => (
                <p key={comment.id}>
                    {comment.owner}: {comment.comment_detail}. {comment.updated_at}
                </p>
            ))
        ) : currentUser ? (
            <span>No comments have been left.  Please enter something here...</span>
        ): null }
    </div>

  )
}

export default JobPage