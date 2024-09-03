import { useAppSelector } from "../../../../hooks/toolkitHooks";
import LatestJobCard from "../../../shared/LatestJobCard";


const LatestJobs = () => {
  const { allJobs } = useAppSelector(state => state.job)

  return (
    <div className="max-w-7xl mx-auto my-20">
      <h1 className="text-4xl font-bold">
        <span className="text-[#6A38C2]">Latest & Top</span> Job Openings
      </h1>
      <div className="grid grid-cols-3 gap-4 my-5">
        {
          allJobs && allJobs?.length >= 1
            ? allJobs.slice(0, 6).map((e, i) => <LatestJobCard job={e} key={i} />)
            : <span>No Job Available</span>
        }
      </div>
    </div>
  );
};

export default LatestJobs;
