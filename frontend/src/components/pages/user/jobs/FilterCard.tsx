import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../../hooks/toolkitHooks';
import { setSearchQuery } from '../../../../store/slices/jobSlice';
import { RadioGroup, RadioGroupItem } from '../../../ui/radio-group';
import { Label } from '../../../ui/label';
import { IJob } from '../../../../types/jobTypes';


type TFilterData = {
  filterType: string
  array: string[]
}

const FilterCard = () => {
  const
    { allJobs }: { allJobs: IJob[] } = useAppSelector((state) => state.job),
    dispatch = useAppDispatch(),
    [selectedValue, setSelectedValue] = useState(''),
    filterData: TFilterData[] = [
      {
        filterType: "Location",
        array: Array.from(new Set(allJobs.map(job => job.location).filter((location): location is string => location !== undefined))).slice(0, 20)
      },
      {
        filterType: "Industry",
        array: Array.from(new Set(allJobs.map(job => job.title).filter((title): title is string => title !== undefined))).slice(0, 20)

      },
    ];


  const changeHandler = (value: string) => {
    setSelectedValue(value);
  }

  useEffect(() => {
    dispatch(setSearchQuery(selectedValue));
  }, [dispatch, selectedValue]);

  return (
    <div className='w-full bg-white p-3 rounded-md'>
      <h1 className='font-bold text-lg'>Filter Jobs</h1>
      <hr className='mt-3' />
      <RadioGroup value={selectedValue} onValueChange={changeHandler}>
        {filterData.map((data, index) => (
          <div key={index}>
            <h1 className='font-bold text-lg'>{data.filterType}</h1>
            {data.array.map((item, idx) => {
              const itemId = `id${index}-${idx}`;
              if (typeof item === 'string') {
                return (
                  <div key={idx} className='flex items-center space-x-2 my-2'>
                    <RadioGroupItem value={item} id={itemId} />
                    <Label htmlFor={itemId}>{item}</Label>
                  </div>
                );
              } else {
                return null;
              }
            })}
          </div>
        ))}
      </RadioGroup>

    </div>
  )
}

export default FilterCard