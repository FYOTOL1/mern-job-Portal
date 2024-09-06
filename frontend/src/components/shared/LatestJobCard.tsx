import { useNavigate } from 'react-router-dom'
import { IJob } from '../../types/jobTypes'
import { Badge } from '../ui/badge'

type Props = {
  job: IJob
}

const LatestJobCards = ({ job }: Props) => {
  const
    navigate = useNavigate()


  return (
    <div
      onClick={() => navigate(`/description/${job._id}`)}
      className='p-5 w-[95%] sm:w-[unset] mx-auto sm:mx-[unset] rounded-md shadow-xl bg-white border border-gray-100 cursor-pointer'
    >
      <div>
        <h1 className='font-medium text-lg text-ellipsis whitespace-nowrap overflow-hidden'>{job?.company?.name}</h1>
        <p className='text-sm text-gray-500 text-ellipsis whitespace-nowrap overflow-hidden'>India</p>
      </div>
      <div>
        <h1 className='font-bold text-lg my-2 text-ellipsis whitespace-nowrap overflow-hidden'>{job?.title}</h1>
        <p className='text-sm text-gray-600 text-ellipsis whitespace-nowrap overflow-hidden'>{job?.description}</p>
      </div>
      <div className='flex items-center flex-wrap gap-2 mt-4'>
        <Badge variant={"outline"} className={'text-blue-700 font-bold'}>{job?.position} Positions</Badge>
        <Badge variant={"outline"} className={'text-[#F83002] font-bold'}>{job?.jobType}</Badge>
        <Badge variant={"outline"} className={'text-[#7209b7] font-bold'}>{job?.salary}USD</Badge>
      </div>

    </div>
  )
}

export default LatestJobCards