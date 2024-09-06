import { Search } from "lucide-react";
import { Button } from "../../../ui/button";
import {  useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../hooks/toolkitHooks";
import { setSearchQuery } from "../../../../store/slices/jobSlice";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const HeroSection = () => {
  const
    { lang } = useAppSelector(state => state.auth),
    [query, setQuery] = useState<string>(""),
    dispatch = useAppDispatch(),
    navigate = useNavigate(),
    { t } = useTranslation()

  const searchJobHandler = () => {
    dispatch(setSearchQuery(query))
    navigate("/browse")
  }

  return (
    <div className="text-center">
      <div className="flex flex-col gap-5 my-10">
        <span className="mx-auto px-4 py-2 rounded-full bg-gray-100 text-[#F83002] font-medium">
          {t("home.heroSection.hunt")}
        </span>
        <h1 className="text-5xl font-bold">
          {
            lang === 'ar' ?
              <>
                {t("home.heroSection.title").slice(0, 13)} <br />
                {t("home.heroSection.title").slice(13, 24)}<span className="text-[#6A38C2]">{t("home.heroSection.title").slice(24, 36)}</span>
              </> :
              <>
                {t("home.heroSection.title").slice(0, 16)} <br />
                {t("home.heroSection.title").slice(16, 25)}<span className="text-[#6A38C2]">{t("home.heroSection.title").slice(25, 36)}</span>
              </>
          }
        </h1>
        <p>
          {t("home.heroSection.description")}
        </p>

        <div dir="ltr" className="flex w-[90%] sm:w-[40%] shadow-lg border border-gray-200 pl-3 rounded-full items-center gap-4 mx-auto">
          <input
            onChange={e => setQuery(e.target.value)}
            value={query}
            type="text"
            placeholder={t("home.heroSection.inputPlaceholder")}
            className="outline-none border-none w-full"
          />
          <Button onClick={searchJobHandler} className="rounded-r-full bg-[#6A38C2]">
            <Search className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
