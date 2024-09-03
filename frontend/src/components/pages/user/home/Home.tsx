/* eslint-disable react-hooks/exhaustive-deps */
import { useAppDispatch, useAppSelector } from "../../../../hooks/toolkitHooks";
import CategoryCarousel from "../CategoryCarousel";
import NavBar from "../../../shared/Navbar";
import Footer from "../../../shared/Footer";
import HeroSection from "./HeroSection";
import LatestJobs from "./LatestJobs";
import { useEffect } from "react";
import { getAllJobs } from "../../../../store/slices/jobSlice";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { user } = useAppSelector(state => state.auth)

  const dispatch = useAppDispatch();
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(getAllJobs())
  }, [dispatch]);

  useEffect(() => {
    if (user?.role === "recruiter") navigate("/admin/companies")
  }, []);

  return (
    <>
      <NavBar />
      <HeroSection />
      <CategoryCarousel />
      <LatestJobs />
      <Footer />
    </>
  );
};

export default Home;
