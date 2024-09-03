import { MoreHorizontal } from 'lucide-react'
import { Popover, PopoverContent, PopoverTrigger } from '../../../ui/popover'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../../../ui/table'
import { IJob } from '../../../../types/jobTypes'
import { Link } from 'react-router-dom'
import { Button } from '../../../ui/button'
import { useAppDispatch } from '../../../../hooks/toolkitHooks'
import { updateApplicantStatus } from '../../../../store/slices/jobSlice'

const ApplicationsTable = ({ applicants }: { applicants: IJob }) => {
    const
        dispatch = useAppDispatch(),
        status = ["Accepted", "Rejected"]

    const updateStatusHandler = (id: string, status: string) => {
        dispatch(updateApplicantStatus({ status: status, applicantId: id }))
    }

    return (
        <div>
            <Table>
                <TableCaption>A list of your recent applied users</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Full Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Contact</TableHead>
                        <TableHead>Resume</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        applicants?.applications?.map((e, i) =>
                            <TableRow key={i}>
                                <TableCell>{e.applicant.fullName}</TableCell>
                                <TableCell>{e.applicant.email}</TableCell>
                                <TableCell>{e.applicant.phoneNumber}</TableCell>
                                <TableCell className="text-blue-700"><Link to={`${e.applicant.profile?.resume || ""}`} target='_blank' rel='noopener noreferrer'>{e.applicant.profile?.resumeOriginalName || "NA"}</Link></TableCell>
                                <TableCell>{new Date(e.createdAt as Date).toLocaleDateString()}</TableCell>
                                <TableCell className='text-right'>
                                    <Popover>
                                        <PopoverTrigger>
                                            <MoreHorizontal />
                                        </PopoverTrigger>
                                        <PopoverContent className="flex flex-col gap-1 max-w-32">
                                            {status.map((s, i) =>
                                                <Button onClick={() => updateStatusHandler(e?._id as string, s as string)} key={i}>
                                                    <span>{s}</span>
                                                </Button>
                                            )}
                                        </PopoverContent>
                                    </Popover>

                                </TableCell>
                            </TableRow>)
                    }
                </TableBody>
            </Table>
        </div>
    )
}

export default ApplicationsTable