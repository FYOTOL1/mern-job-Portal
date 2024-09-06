import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../../hooks/toolkitHooks";
import NavBar from "../../../shared/Navbar";
import { getSearchedJobsByKeyword, setAllJobs, setSearchQuery } from "../../../../store/slices/jobSlice";
import Job from "../jobs/Job";
import { IJob } from "../../../../types/jobTypes";
import { Link } from "react-router-dom";
import { Button } from "../../../ui/button";
import { useTranslation } from "react-i18next";

const Browse = () => {
  const
    { allJobs, searchedQuery } = useAppSelector(state => state.job),
    { t } = useTranslation(),
    dispatch = useAppDispatch()



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
      <div className='max-w-7xl mx-auto my-10 px-2'>
        <Link to={"/"}>
          <Button>{t("browse.back")}</Button>
        </Link>
        <h1 className='font-bold text-xl my-10'>{t("browse.searchResult")} {allJobs.length}</h1>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
          {
            allJobs.length ? allJobs.map((job: IJob) => {
              return (
                <Job job={job} />
              )
            }) : <span className="text-gray-500">{t("browse.noResultFound")}</span>
          }
        </div>

      </div>
    </div>
  )
}

export default Browse