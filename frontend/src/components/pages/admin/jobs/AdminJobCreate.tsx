import NavBar from '../../../shared/Navbar'
import { Label } from '../../../ui/label'
import { Input } from '../../../ui/input'
import { Button } from '../../../ui/button'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../../../hooks/toolkitHooks'
import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { postJob } from '../../../../store/slices/jobSlice'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../../../ui/select'
import { getUserCompanies } from '../../../../store/slices/companySlice'
import { ICompany } from '../../../../types/companyTypes'

const AdminCreateJob = () => {
    const
        { companies } = useAppSelector(state => state.company),
        navigate = useNavigate(),
        dispatch = useAppDispatch(),
        [input, setInput] = useState({
            companyId: "",
            title: "",
            description: "",
            requirements: "",
            salary: 0,
            location: "",
            jobType: "",
            experience: 0,
            position: 0,
        })

    useEffect(() => {
        dispatch(getUserCompanies(''))
    }, [dispatch])

    const changeEventHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setInput({ ...input, [e.target.name]: e.target.value })
    }

    const selectChangeHandler = (value: string) => {
        const findCompanyByName = companies.filter((company: ICompany) => company.name.toLowerCase() == value)[0];

        setInput({ ...input, companyId: findCompanyByName._id as string });
    }

    const submitHandler = (e: FormEvent) => {
        e.preventDefault()
        dispatch(postJob(input)).then(res => {
            if (res.payload.success) {
                setInput({
                    companyId: "",
                    title: "",
                    description: "",
                    requirements: "",
                    salary: 0,
                    location: "",
                    jobType: "",
                    experience: 0,
                    position: 0,
                })
                navigate("/admin/jobs")
            }
        })
    }

    return (
        <div>
            <NavBar />
            <div className="max-w-4xl mx-auto">
                <div className="my-10">
                    <h1 className="font-bold text-2xl">Your Job Title</h1>
                    <p className="text-gray-600">What would you like to give your job title? you can change this later</p>
                </div>
                <form onSubmit={submitHandler} className="grid grid-cols-2 gap-4">
                    <div>
                        <Label>Title</Label>
                        <Input
                            required
                            type="text"
                            name='title'
                            className='my-2'
                            value={input.title}
                            onChange={changeEventHandler}
                            placeholder='jobHunt, Microsoft'
                        />
                    </div>
                    <div>
                        <Label>Description</Label>
                        <Input
                            required
                            type="text"
                            name='description'
                            className='my-2'
                            value={input.description}
                            onChange={changeEventHandler}
                            placeholder='jobHunt, Need Frontend Developer'
                        />
                    </div>
                    <div>
                        <Label>Requirements</Label>
                        <Input
                            required
                            type="text"
                            className='my-2'
                            name='requirements'
                            value={input.requirements}
                            onChange={changeEventHandler}
                            placeholder='jobHunt, Problem Solving And Js Data Structure Needed'
                        />
                    </div>
                    <div>
                        <Label>Salary</Label>
                        <Input
                            required
                            type="number"
                            name='salary'
                            className='my-2'
                            value={input.salary}
                            onChange={changeEventHandler}
                            placeholder='jobHunt, 1000$'
                        />
                    </div>
                    <div>
                        <Label>Location</Label>
                        <Input
                            required
                            type="text"
                            name='location'
                            className='my-2'
                            value={input.location}
                            onChange={changeEventHandler}
                            placeholder='jobHunt, Egypt, Cairo'
                        />
                    </div>
                    <div>
                        <Label>Job Type</Label>
                        <Input
                            required
                            type="text"
                            name='jobType'
                            className='my-2'
                            value={input.jobType}
                            onChange={changeEventHandler}
                            placeholder='jobHunt, Full Time'
                        />
                    </div>
                    <div>
                        <Label>Experience Level</Label>
                        <Input
                            required
                            type="number"
                            className='my-2'
                            name='experience'
                            value={input.experience}
                            onChange={changeEventHandler}
                            placeholder='jobHunt, Senior'
                        />
                    </div>
                    <div>
                        <Label>No of Position</Label>
                        <Input
                            required
                            type="number"
                            name='position'
                            className='my-2'
                            value={input.position}
                            onChange={changeEventHandler}
                            placeholder='jobHunt, Senior'
                        />
                    </div>
                    <Select onValueChange={selectChangeHandler}>
                        <SelectTrigger>
                            <SelectValue placeholder="Select a Company" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                {companies.length ? companies.map((e, i) =>
                                    <SelectItem key={i} value={e.name.toLowerCase()} className="cursor-pointer">{e.name}</SelectItem>) :
                                    <SelectItem value={"Company Is Required"} className="cursor-pointer">Company is Required!</SelectItem>}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                    <div className="flex justify-end gap-2 my-5">
                        <Button variant={"outline"} onClick={() => navigate("/admin/jobs")}>Cancel</Button>
                        <Button type='submit'>Upload</Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AdminCreateJob