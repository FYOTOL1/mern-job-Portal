import { FormEvent, useState } from "react"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "../../../ui/dialog"
import { Input } from "../../../ui/input"
import { Label } from "../../../ui/label"
import { Button } from "../../../ui/button"
import { Loader2 } from "lucide-react"
import { useAppDispatch, useAppSelector } from "../../../../hooks/toolkitHooks"
import { UpdateUser } from "../../../../store/slices/authSlice"
import { useNavigate } from "react-router-dom"

type Props = {
    activeEdit: boolean,
    setActiveEdit: (v: boolean) => void
}

const UpdateProfileDialog = ({ activeEdit, setActiveEdit }: Props) => {
    const { user, loading, success } = useAppSelector(state => state.auth)

    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const [input, setInput] = useState({
        fullName: user?.fullName || "",
        email: user?.email || "",
        phoneNumber: user?.phoneNumber || "",
        bio: user?.profile?.bio || "",
        skills: Array.isArray(user?.profile?.skills) && user?.profile?.skills?.join(", ") || "",
        file: null as File | null,
    })

    const changeEventHandler = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.currentTarget;
        setInput({ ...input, [name]: value });
    }

    const fileChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setInput({ ...input, file });
    }

    const submitHandler = async (e: FormEvent) => {
        e.preventDefault();

        if (!success) {
            const formData = new FormData();
            if (input.fullName) formData.append("fullName", input.fullName);
            if (input.email) formData.append("email", input.email);
            if (input.phoneNumber) formData.append("phoneNumber", input.phoneNumber.toString());
            if (input.skills) formData.append("skills", input.skills);
            if (input.bio) formData.append("bio", input.bio);
            if (input.file) formData.append("file", input.file);

            dispatch(UpdateUser(formData))
        }

        console.log(success);

    }

    const closeDialog = () => {
        setActiveEdit(false)
        navigate("/profile")
    }

    return (
        <div>
            <Dialog open={activeEdit}>
                <DialogContent className="sm:max-w-[425px]" onInteractOutside={() => closeDialog()}>
                    <DialogHeader>
                        <DialogTitle>Update Profile</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={submitHandler}>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="name">Name</Label>
                                <Input
                                    id="name"
                                    onChange={(e) => changeEventHandler(e)}
                                    value={input.fullName}
                                    name="fullName"
                                    className="col-span-3"
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    onChange={(e) => changeEventHandler(e)}
                                    value={input.email}
                                    name="email"
                                    className="col-span-3"
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="number">Number</Label>
                                <Input
                                    id="number"
                                    onChange={(e) => changeEventHandler(e)}
                                    value={input.phoneNumber}
                                    name="phoneNumber"
                                    className="col-span-3"
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="bio">Bio</Label>
                                <Input
                                    id="bio"
                                    onChange={(e) => changeEventHandler(e)}
                                    value={input.bio}
                                    name="bio"
                                    className="col-span-3"
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="skills">Skills</Label>
                                <Input
                                    id="skills"
                                    onChange={(e) => changeEventHandler(e)}
                                    value={input.skills}
                                    name="skills"
                                    className="col-span-3"
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="file">Resume</Label>
                                <Input
                                    required
                                    id="file"
                                    onChange={(e) => fileChangeHandler(e)}
                                    name="file"
                                    type="file"
                                    accept="application/pdf"
                                    className="col-span-3 cursor-pointer"
                                />
                            </div>
                        </div>
                        <DialogFooter>
                            {loading && !success ? (
                                <Button>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Please Wait...
                                </Button>
                            ) : (
                                <Button type="submit" className="w-full my-4">
                                    Update
                                </Button>
                            )}
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default UpdateProfileDialog;
