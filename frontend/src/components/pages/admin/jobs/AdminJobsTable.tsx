import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../../../ui/table'
import { Popover, PopoverContent, PopoverTrigger } from '../../../ui/popover'
import { Edit2, Eye, MoreHorizontal } from 'lucide-react'
import { useAppDispatch, useAppSelector } from '../../../../hooks/toolkitHooks'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '../../../ui/button'
import { getAdminJobs, setSingleJob } from '../../../../store/slices/jobSlice'
import { IJob } from '../../../../types/jobTypes'

const AdminJobsTable = () => {
    const
        dispatch = useAppDispatch(),
        { adminJobs, searchJobByText }: { adminJobs: IJob[], searchJobByText: string } = useAppSelector(state => state.job),
        [filterJob, setFilterJob] = useState<IJob[]>(adminJobs)

    useEffect(() => {
        dispatch(getAdminJobs(''))
    }, [dispatch])

    useEffect(() => {
        const filteredCompany = adminJobs.filter((job: IJob) => {
            if (!searchJobByText.length) {
                return true;
            }
            return job.title.toLowerCase().includes(searchJobByText.toLowerCase());
        });
        setFilterJob(filteredCompany as IJob[]);
    }, [adminJobs, searchJobByText]);


    const jobDataHandler = (job: IJob) => {
        dispatch(setSingleJob(job))
    }

    return (
        <div>
            <Table className="text-xs sm:text-sm">
                <TableCaption>A list of your recent posted jobs</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Company Name</TableHead>
                        <TableHead>Job Title</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className='text-right'>Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filterJob.map((e: IJob, i) => (
                        <TableRow key={i}>
                            <TableCell>{e.company?.name || "NA"}</TableCell>
                            <TableCell>{e.title || "NA"}</TableCell>
                            <TableCell>{new Date(e.createdAt as Date).toLocaleDateString()}</TableCell>
                            <TableCell>{new Date(e.createdAt as Date).toLocaleDateString()}</TableCell>
                            <TableCell className="text-right cursor-pointer">
                                <Popover>
                                    <PopoverTrigger>
                                        <MoreHorizontal />
                                    </PopoverTrigger>
                                    <PopoverContent className="w-20 sm:w-24 md:w-32">
                                        <Link to={`/admin/jobs/${e._id}`}>
                                            <button onClick={() => jobDataHandler(e)} className="flex items-center gap-2 w-fit cursor-pointer bg-gray-100 transition-all hover:bg-gray-200 rounded p-1 px-2 my-1">
                                                <Edit2 className='w-4' />
                                                <span>Edit</span>
                                            </button>
                                            <Link to={`/admin/jobs/${e._id}/applications`}>
                                                <button className="flex items-center gap-2 w-fit cursor-pointer bg-gray-100 transition-all hover:bg-gray-200 rounded p-1 px-2 my-1">
                                                    <Eye className='w-4' />
                                                    <span>Applications</span>
                                                </button></Link>
                                        </Link>
                                    </PopoverContent>
                                </Popover>
                            </TableCell >
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            {adminJobs.length <= 0 && <Link to={"/admin/jobs/create"}><Button variant={"ghost"} className="text-center w-full text-gray-500 underline">You Haven't Posted Any Job, Yet. </Button></Link>}
        </div>
    )
}

export default AdminJobsTable