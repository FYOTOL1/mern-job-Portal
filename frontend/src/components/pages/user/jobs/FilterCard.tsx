import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../../hooks/toolkitHooks';
import { setSearchQuery } from '../../../../store/slices/jobSlice';
import { RadioGroup, RadioGroupItem } from '../../../ui/radio-group';
import { Label } from '../../../ui/label';
import { IJob } from '../../../../types/jobTypes';
import { useTranslation } from 'react-i18next';

type TFilterData = {
  filterType: string
  array: string[]
}

const FilterCard = () => {
  const
    { lang } = useAppSelector((state) => state.auth),
    { allJobs }: { allJobs: IJob[] } = useAppSelector((state) => state.job),
    dispatch = useAppDispatch(),
    [selectedValue, setSelectedValue] = useState(''),
    { t } = useTranslation(),
    filterData: TFilterData[] = [
      {
        filterType: t("jobs.filterCard.location"),
        array: Array.isArray(allJobs) ? Array.from(new Set(allJobs.map(job => job.location).filter((location): location is string => location !== undefined))).slice(0, 20) : []
      },
      {
        filterType: t("jobs.filterCard.industry"),
        array: Array.isArray(allJobs) ? Array.from(new Set(allJobs.map(job => job.title).filter((title): title is string => title !== undefined))).slice(0, 20) : []

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
      <h1 className='font-bold text-lg'>{t("jobs.filterCard.title")}</h1>
      <hr className='mt-3' />
      <RadioGroup dir={lang === "ar" ? 'rtl' : "ltr"} value={selectedValue} onValueChange={changeHandler}>
        {filterData.map((data, index) => (
          <div key={index}>
            <h1 className='font-bold text-lg'>{data.filterType}</h1>
            {data.array?.map((item, idx) => {
              const itemId = `id${index}-${idx}`;
              if (typeof item === 'string') {
                return (
                  <div key={idx} className='flex items-center space-x-2 my-2'>
                    <RadioGroupItem value={item} id={itemId} className="w-fit mx-1" />
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

    </div >
  )
}

export default FilterCard