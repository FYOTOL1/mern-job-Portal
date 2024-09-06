import { Link, useNavigate, useParams } from "react-router-dom";
import { Badge } from "../../../ui/badge";
import { Button } from "../../../ui/button";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../hooks/toolkitHooks";
import { applyJob, getSingleJob, setSingleJob } from "../../../../store/slices/jobSlice";
import { useTranslation } from "react-i18next";
import NavBar from "../../../shared/Navbar";

const JobsDescription = () => {
    const { singleJob } = useAppSelector(state => state.job),
        { user } = useAppSelector(state => state.auth),
        { t } = useTranslation(),
        { jobId } = useParams(),
        dispatch = useAppDispatch(),
        navigate = useNavigate(),
        isInitApplied = user?._id && singleJob && singleJob?.applications.some(app => app.applicant as unknown as string === user._id),
        [isApplied, setIsApplied] = useState(isInitApplied)

    useEffect(() => {
        dispatch(getSingleJob(jobId))
        setIsApplied(isInitApplied)
    }, [dispatch, isInitApplied, jobId])

    const applyJobHandler = () => {
        if (!isApplied) {
            dispatch(applyJob(jobId))
            const updateSingleJob = { ...singleJob, applications: [...(singleJob?.applications || []), { applicant: user?._id }] }
            dispatch(setSingleJob(updateSingleJob))
            setIsApplied(true)
            navigate("/jobs")
        }
    }

    return (
        <>
            <NavBar />
            <div className="max-w-7xl mx-auto my-10 px-2">
                <Link to={"/jobs"}>
                    <Button>{t("jobs.jobDesc.back")}</Button>
                </Link>
                <div className="flex items-center justify-between flex-wrap">
                    <div className="flex items-center flex-wrap gap-2 mt-4">
                        <h1 className="font-bold text-xl">{singleJob !== null && singleJob?.title}</h1>
                        <Badge variant="secondary" className="text-blue-700 font-bold  text-nowrap">{singleJob !== null && singleJob?.position} Positions</Badge>
                        <Badge variant="secondary" className="text-[#F83002] font-bold capitalize text-nowrap">{singleJob !== null && singleJob?.jobType}</Badge>
                        <Badge variant="secondary" className="text-[#7209b7] font-bold text-nowrap">{singleJob !== null && singleJob?.salary} USD</Badge>
                    </div>

                    <Button
                        onClick={applyJobHandler}
                        disabled={isApplied as boolean}
                        className={`rounded-lg my-2 ${isApplied
                            ? "bg-gray-600 cursor-not-allowed"
                            : "bg-[#7209b7] hover:bg-[#5f32ad]"
                            }`}
                    >
                        {!isApplied ? t("jobs.jobDesc.apply") : t("jobs.jobDesc.applied")}
                    </Button>

                </div>
                <h1 className="border-b-2 border-b-gray-200 font-medium py-4">{singleJob !== null && singleJob?.description}</h1>
                <div className="my-4">
                    <h1 className="font-bold my-1">{t("jobs.jobDesc.role")}: <span className="pl-2 font-normal text-gray-800">{singleJob !== null && singleJob?.title}</span></h1>
                    <h1 className="font-bold my-1">{t("jobs.jobDesc.location")}: <span className="pl-2 font-normal text-gray-800">{singleJob !== null && singleJob?.location}</span></h1>
                    <h1 className="font-bold my-1">{t("jobs.jobDesc.description")}: <span className="pl-2 font-normal text-gray-800">{singleJob !== null && singleJob?.description}</span></h1>
                    <h1 className="font-bold my-1">{t("jobs.jobDesc.experience")}: <span className="pl-2 font-normal text-gray-800">{singleJob !== null && singleJob?.experienceLevel} years</span></h1>
                    <h1 className="font-bold my-1">{t("jobs.jobDesc.salary")}: <span className="pl-2 font-normal text-gray-800">{singleJob !== null && singleJob?.salary} USD</span></h1>
                    <h1 className="font-bold my-1">{t("jobs.jobDesc.totalApplicants")}: <span className="pl-2 font-normal text-gray-800">{singleJob !== null && singleJob?.applications?.length}</span></h1>
                    <h1 className="font-bold my-1">{t("jobs.jobDesc.postedDate")}: <span className="pl-2 font-normal text-gray-800">{new Date(singleJob?.createdAt as Date).toLocaleDateString()}</span></h1>
                </div>
            </div>
        </>

    );
};

export default JobsDescription;
