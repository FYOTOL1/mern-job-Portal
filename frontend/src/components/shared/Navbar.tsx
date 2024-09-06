import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import { Button } from "../ui/button";
import { LogOut, User2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/toolkitHooks";
import { LogoutUser, setLanguage } from "../../store/slices/authSlice";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { useTranslation } from "react-i18next";

const NavBar = () => {
  const
    { user, lang } = useAppSelector((state) => state.auth),
    dispatch = useAppDispatch(),
    { t } = useTranslation()

  const logoutHandler = async () => {
    dispatch(LogoutUser(""))
  }

  const changeLanguageHandler = (lang: "ar" | "en") => {
    dispatch(setLanguage(lang))
  }

  return (
    <div className="bg-white m-2">
      <div className="flex items-center justify-between flex-col sm:flex-row mx-auto max-w-7xl h-18">
        <div>
          <h1 className="text-2xl font-bold">
            Job<span className="text-[#F83002]">Portal</span>
          </h1>
        </div>

        <div className="flex items-center justify-center flex-wrap gap-6 gap-y-3 sm:gap-12">
          <ul className="flex items-center font-medium gap-5 mt-2 sm:mt-0">
            {user && user.role === "recruiter" ?
              <>
                <li className="transition-all hover:text-gray-600"><Link to="/admin/companies">{t("shared.navBar.ul.companies")}</Link></li>
                <li className="transition-all hover:text-gray-600"><Link to="/admin/jobs">{t("shared.navBar.ul.jobs")}</Link></li>
              </> :
              <>
                <li className="transition-all hover:text-gray-600"><Link to="/">{t("shared.navBar.ul.home")}</Link></li>
                <li className="transition-all hover:text-gray-600"><Link to="/jobs">{t("shared.navBar.ul.jobs")}</Link></li>
                <li className="transition-all hover:text-gray-600"><Link to="/browse">{t("shared.navBar.ul.browse")}</Link></li>
              </>}
            <li>
              <Select defaultValue={lang} onValueChange={changeLanguageHandler}>
                <SelectTrigger className="mt-2 h-fit px-2 py-1">
                  <SelectValue placeholder="en" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="en" className="cursor-pointer">en</SelectItem>
                    <SelectItem value="ar" className="cursor-pointer">ar</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </li>
          </ul>
          {!user ? (
            <div className="flex items-center gap-2">
              <Link to={"/login"}>
                <Button variant={"outline"}>
                  {t("shared.navBar.login")}
                </Button>
              </Link>
              <Link to={"/signup"}>
                <Button className="bg-[#6A38C2] hover:bg-[#5b38a6]">
                  {t("shared.navBar.signup")}
                </Button>
              </Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar>
                  <AvatarImage
                    className="w-10 h-10 rounded-full cursor-pointer object-cover"
                    src={user?.profile?.profilePhoto}
                    alt="Avatar"
                  />
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-80 outline outline-1 bg-white outline-gray-100 shadow-lg rounded p-2 z-50">
                <div className="flex items-center gap-4 space-y-2">
                  <Avatar>
                    <AvatarImage
                      className="w-10 h-10 rounded-full cursor-pointer object-cover"
                      src={user?.profile?.profilePhoto}
                      alt="Avatar"
                    />
                  </Avatar>
                  <div>
                    <h4 className="font-medium">{user.fullName}</h4>
                    <p className="text-sm text-muted-foreground">
                      {user.profile?.bio}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col gap-3 mt-2 text-gray-600">
                  {user && user.role === "student" &&
                    <>
                      <div className="flex w-fit items-center gap-2 cursor-pointer">
                        <User2 />
                        <Button variant={"link"}><Link to="/profile">{t("shared.navBar.profile")}</Link></Button>
                      </div>
                    </>}
                  <div className="flex w-fit items-center gap-2 cursor-pointer">
                    <LogOut />
                    <Button onClick={() => logoutHandler()} variant={"link"}>{t("shared.navBar.logout")}</Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
