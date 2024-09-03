import { useParams } from "react-router-dom";
import { Badge } from "../../../ui/badge";
import { Button } from "../../../ui/button";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../hooks/toolkitHooks";
import { applyJob, getSingleJob, setSingleJob } from "../../../../store/slices/jobSlice";

const JobsDescription = () => {
    const { singleJob } = useAppSelector(state => state.job)
    const { user } = useAppSelector(state => state.auth)

    const isInitApplied = user?._id && singleJob && singleJob?.applications.some(app => app.applicant as unknown as string === user._id);

    const [isApplied, setIsApplied] = useState(isInitApplied)

    const { jobId } = useParams()
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getSingleJob(jobId))
        setIsApplied(isInitApplied)
    }, [dispatch, isInitApplied, jobId])

    const applyJobHandler = () => {
        if (!isApplied) {
            dispatch(applyJob(jobId))
            const updateSingleJob = { ...singleJob, applications: [...(singleJob?.applications || []), { applicant: user?._id }] }
            dispatch(setSingleJob(updateSingleJob)) // For Real Time Update
            setIsApplied(true)
        }
    }

    return (
        <div className="max-w-7xl mx-auto my-10">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 mt-4">
                    <h1 className="font-bold text-xl">{singleJob !== null && singleJob?.title}</h1>
                    <Badge variant="secondary" className="text-blue-700 font-bold">{singleJob !== null && singleJob?.position} Positions</Badge>
                    <Badge variant="secondary" className="text-[#F83002] font-bold capitalize">{singleJob !== null && singleJob?.jobType}</Badge>
                    <Badge variant="secondary" className="text-[#7209b7] font-bold">{singleJob !== null && singleJob?.salary} USD</Badge>
                </div>

                <Button
                    onClick={applyJobHandler}
                    disabled={isApplied as boolean}
                    className={`rounded-lg ${isApplied
                        ? "bg-gray-600 cursor-not-allowed"
                        : "bg-[#7209b7] hover:bg-[#5f32ad]"
                        }`}
                >
                    {!isApplied ? "Apply Now" : "Already Applied"}
                </Button>
            </div>
            <h1 className="border-b-2 border-b-gray-200 font-medium py-4">{singleJob !== null && singleJob?.description}</h1>
            <div className="my-4">
                <h1 className="font-bold my-1">Role: <span className="pl-2 font-normal text-gray-800">{singleJob !== null && singleJob?.title}</span></h1>
                <h1 className="font-bold my-1">Location: <span className="pl-2 font-normal text-gray-800">{singleJob !== null && singleJob?.location}</span></h1>
                <h1 className="font-bold my-1">Description: <span className="pl-2 font-normal text-gray-800">{singleJob !== null && singleJob?.description}</span></h1>
                <h1 className="font-bold my-1">Experience: <span className="pl-2 font-normal text-gray-800">{singleJob !== null && singleJob?.experience} years</span></h1>
                <h1 className="font-bold my-1">Salary: <span className="pl-2 font-normal text-gray-800">{singleJob !== null && singleJob?.salary} USD</span></h1>
                <h1 className="font-bold my-1">Total Applicants: <span className="pl-2 font-normal text-gray-800">{singleJob !== null && singleJob?.applications?.length}</span></h1>
                <h1 className="font-bold my-1">Posted Date: <span className="pl-2 font-normal text-gray-800">{new Date(singleJob?.createdAt as Date).toLocaleDateString()}</span></h1>
            </div>
        </div>
    );
};

export default JobsDescription;
