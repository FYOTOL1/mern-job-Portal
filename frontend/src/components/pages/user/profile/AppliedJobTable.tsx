import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../../hooks/toolkitHooks";
import { Badge } from "../../../ui/badge";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../ui/table";
import { getUserAppliedJobs } from "../../../../store/slices/jobSlice";
import { IApplication } from "../../../../types/applicationTypes";

const AppliedJobTable = () => {
  const
    { userAppliedJobs } = useAppSelector(state => state.job),
    dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getUserAppliedJobs(''))
  }, [dispatch])

  return (
    <div>
      <Table>
        <TableCaption>A list of your recent jobs</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Job Role</TableHead>
            <TableHead>Company</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {userAppliedJobs?.map((e: IApplication, i) => (
            <TableRow key={i}>
              <TableCell>{e.job.title}</TableCell>
              <TableCell>{e.job.company.name}</TableCell>
              <TableCell>{new Date(e.updatedAt as Date).toLocaleDateString()}</TableCell>
              <TableCell className="text-right">
                {
                  e.status === "accepted" ?
                    <Badge className="bg-green-500">{e.status}</Badge> :
                    e.status === "rejected" ?
                      <Badge className="bg-red-600">{e.status}</Badge> :
                      <Badge>{e.status}</Badge>
                }
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div >
  );
};

export default AppliedJobTable;
