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
                const { data } = await axiosReq.get(`/jobs/${id}/`);
                setJob({ results: [data]})
            } catch(error) {
                console.log(error)
            }
        }
        handleMount()
    }, [id]);

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
    </div>

  )
}

export default JobPage