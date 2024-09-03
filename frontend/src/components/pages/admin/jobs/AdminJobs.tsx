import { setSearchJobByText } from '../../../../store/slices/jobSlice'
import { useAppDispatch } from '../../../../hooks/toolkitHooks'
import AdminJobsTable from './AdminJobsTable'
import { Button } from '../../../ui/button'
import NavBar from '../../../shared/Navbar'
import { useEffect, useState } from 'react'
import { Input } from '../../../ui/input'
import { Link } from 'react-router-dom'

const AdminJob = () => {
    const
        [input, setInput] = useState(''),
        dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(setSearchJobByText(input))
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
                    <Link to={"/admin/jobs/create"}><Button>New Job</Button></Link>
                </div>
                <AdminJobsTable />
            </div>
        </div>
    )
}

export default AdminJob;