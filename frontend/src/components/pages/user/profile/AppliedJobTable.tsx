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
import { useTranslation } from "react-i18next";

const AppliedJobTable = () => {
  const
    { userAppliedJobs } = useAppSelector(state => state.job),
    dispatch = useAppDispatch(),
    { t } = useTranslation()

  useEffect(() => {
    dispatch(getUserAppliedJobs(''))
  }, [dispatch])

  return (
    <div>
      <Table>
        <TableCaption>{t("profile.tableMessage")}</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="text-start">{t("profile.jobRole")}</TableHead>
            <TableHead className="text-start">{t("profile.company")}</TableHead>
            <TableHead className="text-start">{t("profile.date")}</TableHead>
            <TableHead className="text-right">{t("profile.status")}</TableHead>
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
                    <Badge className="bg-green-500">{t("profile.accepted")}</Badge> :
                    e.status === "rejected" ?
                      <Badge className="bg-red-600">{t("profile.rejected")}</Badge> :
                      <Badge>{t("profile.pending")}</Badge>
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
