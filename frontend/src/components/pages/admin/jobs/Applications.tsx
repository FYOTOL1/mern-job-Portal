import { useEffect } from 'react'
import NavBar from '../../../shared/Navbar'
import ApplicationsTable from './ApplicationsTable'
import { useAppDispatch, useAppSelector } from '../../../../hooks/toolkitHooks'
import { getApplicants } from '../../../../store/slices/jobSlice'
import { useParams } from 'react-router-dom'
import { IJob } from '../../../../types/jobTypes'

const Applications = () => {
    const
        applicants = useAppSelector(state => state.job.applicants) as IJob,
        dispatch = useAppDispatch(),
        { jobId } = useParams()

    useEffect(() => {
        dispatch(getApplicants(jobId))
    }, [dispatch, jobId])


    return (
        <div>
            <NavBar />
            <div className="max-w-7xl mx-auto">
                <h1 className="font-bold text-xl my-5">Applicants {applicants.applications.length}</h1>
                <ApplicationsTable applicants={applicants} />
            </div>
        </div>
    )
}

export default Applications