import { Bookmark } from "lucide-react";
import { Button } from "../../../ui/button";
import { Avatar, AvatarImage } from "../../../ui/avatar";
import { Badge } from "../../../ui/badge";
import { Link } from "react-router-dom";
import { IJob } from "../../../../types/jobTypes";

type Props = {
  job: IJob
}

const Job = ({ job }: Props) => {

  const daysAgoFunc = (mongodbTime: Date) => {
    const createdAt = new Date(mongodbTime);
    const currentTime = new Date();
    const timeDifference = currentTime.getTime() - createdAt.getTime();
    return Math.floor(timeDifference / (1000 * 60 * 60 * 24))
  };

  return (
    <div className="p-5 rounded-md shadow-xl bg-white border border-gray-100">
      <div className="flex items-center justify-between">
        <p>{daysAgoFunc(job.createdAt as Date) === 0 ? "Today" : daysAgoFunc(job.createdAt as Date) + " Days Ago"} </p>
        <Button variant="outline" className="rounded-full" size={"icon"}>
          <Bookmark />
        </Button>
      </div>

      <div className="flex items-center gap-2 my-2">
        <Button className="p-6" variant={"outline"} size={"icon"}>
          <Avatar>
            <AvatarImage className="object-cover" src={job.company.logo || "/th.jpg"} />
          </Avatar>
        </Button>
        <div>
          <h1 className="font-medium text-lg">{job?.company?.name}</h1>
          <p className="text-sm text-gray-500">{job.location}</p>
        </div>
      </div>

      <div>
        <h1 className="font-bold text-lg my-2">{job.title}</h1>
        <p className="text-sm text-gray-600">{job.description}</p>
      </div>

      <div className="flex items-center flex-wrap gap-2 mt-4">
        <Badge variant="secondary" className="text-blue-700 font-bold">{job.position} Positions</Badge>
        <Badge variant="secondary" className="text-[#F83002] font-bold capitalize">{job.jobType}</Badge>
        <Badge variant="secondary" className="text-[#7209b7] font-bold">{job.salary} USD</Badge>
      </div>

      <div className="flex items-center gap-4 mt-4">
        <Link to={`/description/${job._id}`}><Button variant="outline">Details</Button></Link>
        <Button className="bg-[#7209b7]">Save For Later</Button>
      </div>
    </div>
  );
};

export default Job;
