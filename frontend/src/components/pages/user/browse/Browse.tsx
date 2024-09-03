import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../../hooks/toolkitHooks";
import NavBar from "../../../shared/Navbar";
import { getSearchedJobsByKeyword, setAllJobs, setSearchQuery } from "../../../../store/slices/jobSlice";
import Job from "../jobs/Job";
import { IJob } from "../../../../types/jobTypes";
import { Link } from "react-router-dom";
import { Button } from "../../../ui/button";

const Browse = () => {
  const
    dispatch = useAppDispatch(),
    { allJobs, searchedQuery } = useAppSelector(state => state.job)


  useEffect(() => {
    dispatch(getSearchedJobsByKeyword(searchedQuery))
    return () => {
      dispatch(setSearchQuery(""));
      dispatch(setAllJobs([]))
    }
  }, [dispatch, searchedQuery])

  return (
    <div>
      <NavBar />
      <div className='max-w-7xl mx-auto my-10'>
        <Link to={"/"}>
          <Button>Back</Button>
        </Link>
        <h1 className='font-bold text-xl my-10'>Search Results ({allJobs.length})</h1>
        <div className='grid grid-cols-3 gap-4'>
          {
            allJobs.length ? allJobs.map((job: IJob) => {
              return (
                <Job job={job} />
              )
            }) : <span className="text-gray-500">No Result Found!</span>
          }
        </div>

      </div>
    </div>
  )
}

export default Browse