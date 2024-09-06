import { useEffect, useState } from "react";
import { Contact, Mail, Pen } from "lucide-react";
import NavBar from "../../../shared/Navbar";
import { Avatar, AvatarImage } from "../../../ui/avatar";
import { Button } from "../../../ui/button";
import { Badge } from "../../../ui/badge";
import { Label } from "../../../ui/label";
import AppliedJobTable from "./AppliedJobTable";
import UpdateProfileDialog from "./UpdateProfileDialog";
import { useAppDispatch, useAppSelector } from "../../../../hooks/toolkitHooks";
import { resetSuccess } from "../../../../store/slices/authSlice";
import { useTranslation } from "react-i18next";

const Profile = () => {
  const { user, success } = useAppSelector(state => state.auth),
    { t } = useTranslation(),
    dispatch = useAppDispatch(),
    [activeEdit, setActiveEdit] = useState(false)

  useEffect(() => {
    dispatch(resetSuccess(false))
    if (success) setActiveEdit(false)
  }, [dispatch, success])

  return (
    <div>
      <NavBar />
      <div className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8">
        <div className="flex justify-between">
          <div className="flex items-center gap-4">
            <Avatar className="h-24 w-24">
              <AvatarImage className="object-cover object-center" src={user?.profile?.profilePhoto} alt="profile" />
            </Avatar>
            <div className="">
              <h1 className="font-medium text-xl">{user?.fullName || "NA"}</h1>
              <p>{user?.profile?.bio || "NA"}</p>
            </div>
          </div>
          <Button onClick={() => setActiveEdit(true)} className="text-right" variant={"outline"}>
            <Pen />
          </Button>
        </div>
        <div className="my-5">
          <div className="flex items-center gap-3 my-2">
            <Mail />
            <span>{user?.email || "NA"}</span>
          </div>

          <div className="flex items-center gap-3 my-2">
            <Contact />
            <span>{user?.phoneNumber || "NA"}</span>
          </div>
        </div>
        <div className="my-5">
          <h1>{t("profile.skills")}</h1>
          <div className="flex items-center flex-wrap gap-1">
            {Array.isArray(user?.profile?.skills) && user?.profile?.skills?.length !== 0 ? (
              user?.profile?.skills?.map((e, i) => <Badge key={i}>{e}</Badge>)
            ) : (
              <span>NA</span>
            )}
          </div>
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label className="text-md font-bold">{t("profile.resume")}</Label>
          {user?.profile?.resume ? (<a target="blank" href={user.profile.resume} className="text-blue-500 w-full hover:underline cursor-pointer">{user.profile.resumeOriginalName}</a>) : (<span>NA</span>)}
        </div>
      </div>
      <div className="max-w-4xl mx-auto bg-white rounded-2xl">
        <h1 className="font-bold text-lg">{t("profile.appliedJobs")}</h1>
        <AppliedJobTable />
      </div>
      <UpdateProfileDialog activeEdit={activeEdit} setActiveEdit={setActiveEdit} />
    </div>
  );
};

export default Profile;
