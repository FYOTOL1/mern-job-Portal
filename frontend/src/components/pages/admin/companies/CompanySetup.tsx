import NavBar from '../../../shared/Navbar'
import { Button } from '../../../ui/button'
import { ArrowLeft, Loader2 } from 'lucide-react'
import { Label } from '../../../ui/label'
import { Input } from '../../../ui/input'
import { ChangeEvent, FormEvent, useState } from 'react'
import { TInputUpdateUserCompany } from '../../../../types/publicTypes'
import { useAppDispatch, useAppSelector } from '../../../../hooks/toolkitHooks'
import { updateUserCompany } from '../../../../store/slices/companySlice'
import { Link, useNavigate, useParams } from 'react-router-dom'


const CompanySetup = () => {
    const
        dispatch = useAppDispatch(),
        navigate = useNavigate(),
        { companyId } = useParams(),
        { loading, singleCompany } = useAppSelector(state => state.company)


    const [input, setInput] = useState<TInputUpdateUserCompany>({
        companyId: companyId as string,
        name: singleCompany?.name || "",
        description: singleCompany?.description || "",
        website: singleCompany?.website || "",
        location: singleCompany?.location || "",
        file: undefined
    })

    const changeEventHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setInput({ ...input, [e.target.name]: e.target.value })
    }

    const changeFileHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) setInput({ ...input, file: file });
    };

    const submitHandler = (e: FormEvent) => {
        e.preventDefault()

        const formData = new FormData()
        formData.append('name', input.name)
        formData.append('description', input.description)
        formData.append('website', input.website)
        formData.append('location', input.location)
        if (input.file) formData.append('file', input.file)

        dispatch(updateUserCompany({ data: formData, companyId })).then((res) => {
            if (!loading && res.payload.success) navigate("/admin/companies")
        })
    }


    return (
        <div>
            <NavBar />
            <div className="max-w-xl mx-auto my-10 px-2">
                <div className="flex items-center gap-5 py-8">
                    <Link to={"/admin/companies"}>
                        <Button className="flex items-center gap-2 font-semibold">
                            <ArrowLeft />
                            <span>Back</span>
                        </Button></Link>
                    <h1 className="font-bold text-xl">Company Setup</h1>
                </div>
                <form onSubmit={submitHandler}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <Label>Company Name</Label>
                            <Input
                                onChange={e => changeEventHandler(e)}
                                value={input.name}
                                className="my-1"
                                name="name"
                                type="text"
                            />
                        </div>
                        <div>
                            <Label>Description</Label>
                            <Input
                                onChange={e => changeEventHandler(e)}
                                value={input.description}
                                className="my-1"
                                name="description"
                                type="text"
                            />
                        </div>
                        <div>
                            <Label>Location</Label>
                            <Input
                                onChange={e => changeEventHandler(e)}
                                value={input.location}
                                className="my-1"
                                name="location"
                                type="text"
                            />
                        </div>
                        <div>
                            <Label>Website</Label>
                            <Input
                                onChange={e => changeEventHandler(e)}
                                value={input.website}
                                className="my-1"
                                name="website"
                                type="text"
                            />
                        </div>
                        <div>
                            <Label>Logo</Label>
                            <Input
                                onChange={e => changeFileHandler(e)}
                                className="my-1"
                                name="file"
                                accept='image/*'
                                type="file"
                            />
                        </div>
                    </div>
                    {loading ?
                        <Button><Loader2 className="animate-spin" />Loading</Button> :
                        <Button className="w-full mt-8">Update</Button>
                    }
                </form>
            </div>
        </div>
    )
}

export default CompanySetup