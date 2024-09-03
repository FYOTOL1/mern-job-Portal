import NavBar from '../../../shared/Navbar'
import { Label } from '../../../ui/label'
import { Input } from '../../../ui/input'
import { Button } from '../../../ui/button'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../../../../hooks/toolkitHooks'
import { registerNewCompany } from '../../../../store/slices/companySlice'
import { useState } from 'react'
import { toast } from 'sonner'

const CompanyCreate = () => {
    const
        navigate = useNavigate(),
        dispatch = useAppDispatch(),
        [companyName, setCompanyName] = useState<string>("")

    const registerNewCompanyHandler = () => {
        if (companyName.length >= 3) {
            dispatch(registerNewCompany(companyName)).then((res) => navigate(`/admin/companies/${res.payload.company._id}`))
        } else {
            toast.warning("Name It's Too Little")
        }
    }

    return (
        <div>
            <NavBar />
            <div className="max-w-4xl mx-auto">
                <div className="my-10">
                    <h1 className="font-bold text-2xl">Your Company Name</h1>
                    <p className="text-gray-600">What would you like to give your company name? you can change this later</p>
                </div>
                <Label>Company Name</Label>
                <Input
                    onChange={(e) => setCompanyName(e.target.value)}
                    type="text"
                    className='my-2'
                    placeholder='jobHunt, Microsoft'
                    value={companyName}
                />
                <div className="flex justify-end items-center gap-2 my-10">
                    <Button variant={"outline"} onClick={() => navigate("/admin/companies")}>Cancel</Button>
                    <Button onClick={registerNewCompanyHandler}>Continue</Button>
                </div>
            </div>
        </div>
    )
}

export default CompanyCreate