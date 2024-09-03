import { useAppSelector } from "../../../../hooks/toolkitHooks";
import LatestJobCard from "../../../shared/LatestJobCard";
import { motion } from "framer-motion"

const LatestJobs = () => {
  const { allJobs } = useAppSelector(state => state.job)

  return (
    <div className="max-w-7xl mx-auto my-20">
      <h1 className="text-4xl font-bold">
        <span className="text-[#6A38C2]">Latest & Top</span> Job Openings
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 my-5">
        {
          allJobs && allJobs?.length >= 1
            ? allJobs.slice(0, 6).map((e, i) =>
              <motion.div
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.3 }}
                key={e._id}
              >
                <LatestJobCard job={e} key={i} />
              </motion.div>
            )
            : <span>No Job Available</span>
        }
      </div>
    </div>
  );
};

export default LatestJobs;
