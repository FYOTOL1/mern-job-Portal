import { Avatar, AvatarImage } from '../../../ui/avatar'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../../../ui/table'
import { Popover, PopoverContent, PopoverTrigger } from '../../../ui/popover'
import { Edit2, MoreHorizontal } from 'lucide-react'
import { useAppDispatch, useAppSelector } from '../../../../hooks/toolkitHooks'
import { useEffect, useState } from 'react'
import { getUserCompanies, setSingleCompany } from '../../../../store/slices/companySlice'
import { ICompany } from '../../../../types/companyTypes'
import { Link } from 'react-router-dom'
import { Button } from '../../../ui/button'

const CompaniesTable = () => {
    const dispatch = useAppDispatch(),
        { companies, searchCompanyByText }: { companies: ICompany[], searchCompanyByText: string } = useAppSelector(state => state.company),
        [filterCompany, setFilterCompany] = useState<ICompany[]>(companies)

    useEffect(() => {
        dispatch(getUserCompanies(''))
    }, [dispatch])

    useEffect(() => {
        const filteredCompany = companies.filter(company => {
            if (!searchCompanyByText.length) {
                return true;
            }
            return company?.name?.toLowerCase().includes(searchCompanyByText.toLowerCase());
        });
        setFilterCompany(filteredCompany as ICompany[]);
    }, [companies, searchCompanyByText]);


    const companyDataHandler = (company: ICompany) => {
        dispatch(setSingleCompany(company))
    }

    return (
        <>
            <Table className="text-xs sm:text-sm">
                <TableCaption>A list of your recent registered companies</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Logo</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Location</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className='text-right'>Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filterCompany.map((e, i) => (
                        <TableRow key={i}>
                            <TableCell>
                                <Avatar>
                                    <AvatarImage className="object-cover" src={e.logo || "/user.jpg"} />
                                </Avatar>
                            </TableCell>
                            <TableCell>{e.name}</TableCell>
                            <TableCell>{e.location}</TableCell>
                            <TableCell>{new Date(e.createdAt as Date).toLocaleDateString()}</TableCell>
                            <TableCell className="text-right cursor-pointer">
                                <Popover>
                                    <PopoverTrigger>
                                        <MoreHorizontal />
                                    </PopoverTrigger>
                                    <PopoverContent className="w-20 sm:w-24 md:w-32">
                                        <Link to={`/admin/companies/${e._id}`}>
                                            <button onClick={() => companyDataHandler(e)} className="flex items-center gap-2 w-fit cursor-pointer text-xs sm:text-sm">
                                                <Edit2 className='w-4' />
                                                <span>Edit</span>
                                            </button>
                                        </Link>
                                    </PopoverContent>
                                </Popover>
                            </TableCell >
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            {companies.length <= 0 && <Link to={"/admin/companies/create"}><Button variant={"ghost"} className="text-center w-full text-gray-500 underline">You Haven't Registered Any Company, Yet. </Button></Link>}
        </>
    )
}

export default CompaniesTable