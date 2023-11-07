import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { axiosReq } from '../../api/axiosDefaults';
import JobCard from './JobCard';

function JobPage() {
    const { id } = useParams();
    const [job, setJob] = useState({ results: []});

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
    </div>

  )
}

export default JobPage