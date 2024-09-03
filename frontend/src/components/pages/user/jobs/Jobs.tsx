import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../hooks/toolkitHooks";
import NavBar from "../../../shared/Navbar";
import FilterCard from "./FilterCard";
import Job from "./Job";
import { IJob } from "../../../../types/jobTypes";
import { motion } from "framer-motion"
import { getAllJobs } from "../../../../store/slices/jobSlice";

const Jobs = () => {
  const
    { allJobs, searchedQuery } = useAppSelector(state => state.job),
    dispatch = useAppDispatch(),
    [filterJobs, setFilterJobs] = useState<IJob[] | []>(allJobs)

  useEffect(() => {
    if (searchedQuery) {
      const filteredJobs = allJobs.filter((job: IJob) => {
        return job.title.toLowerCase().includes(searchedQuery.toLowerCase()) ||
          job.description?.toLowerCase().includes(searchedQuery.toLowerCase()) ||
          job.location?.toLowerCase().includes(searchedQuery.toLowerCase())
      })
      setFilterJobs(filteredJobs || allJobs)
    } else {
      setFilterJobs(allJobs)
    }
  }, [allJobs, dispatch, searchedQuery]);

  useEffect(() => {
    dispatch(getAllJobs())
  }, [dispatch])

  return (
    <div>
      <NavBar />
      <div className="max-w-7xl mx-auto mt-5">
        <div className="flex gap-5 flex-col sm:flex-row">
          <div className="w-full sm:w-[30%] md:w-[20%]">
            <FilterCard />
          </div>

          {filterJobs.length <= 0 ? (
            <span className="mx-auto mt-5 text-gray-600 font-semi">Job Not Found</span>
          ) : (
            <div className="flex-1 h-[88vh] overflow-y-auto pb-5">
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
                {filterJobs?.map((e, i) =>
                  <motion.div
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.3 }}
                    key={e._id}
                  >
                    <Job key={i} job={e} />
                  </motion.div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Jobs;
