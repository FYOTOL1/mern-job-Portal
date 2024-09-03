import NavBar from '../../../shared/Navbar'
import { Input } from '../../../ui/input'
import { Button } from '../../../ui/button'
import CompaniesTable from './CompaniesTable'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useAppDispatch } from '../../../../hooks/toolkitHooks'
import { setSearchCompanyByText } from '../../../../store/slices/companySlice'

const Companies = () => {
    const
        [input, setInput] = useState(''),
        dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(setSearchCompanyByText(input))
    }, [dispatch, input])

    return (
        <div>
            <NavBar />
            <div className="max-w-6xl mx-auto my-10">
                <div className='flex justify-between items-center my-5'>
                    <Input
                        className="w-fit"
                        placeholder='Filter by name'
                        onChange={e => setInput(e.target.value)}
                        value={input}
                    />
                    <Link to={"/admin/companies/create"}><Button>New Company</Button></Link>
                </div>
                <CompaniesTable />
            </div>
        </div>
    )
}

export default Companies;