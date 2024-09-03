import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/pages/user/home/Home";
import Login from "./components/pages/user/auth/Login";
import Signup from "./components/pages/user/auth/Signup";
import NotFound from "./components/pages/NotFound";
import Profile from "./components/pages/user/profile/Profile";
import Jobs from "./components/pages/user/jobs/Jobs";
import JobDescription from "./components/pages/user/jobs/JobDescription";
import Browse from "./components/pages/user/browse/Browse";
import Companies from "./components/pages/admin/companies/Companies";
import CompanyCreate from "./components/pages/admin/companies/CompanyCreate";
import CompanySetup from "./components/pages/admin/companies/CompanySetup";
import AdminJobs from "./components/pages/admin/jobs/AdminJobs";
import AdminCreateJob from "./components/pages/admin/jobs/AdminJobCreate";
import Applications from "./components/pages/admin/jobs/Applications";
import ProtectedAdminRoutes from "./middlewares/ProtectedAdminRoutes";
import ProtectedAuthRoutes from "./middlewares/ProtectedAuthRoutes";
import ProtectedUserRoutes from "./middlewares/ProtectedUserRoutes";

const App = () => {
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/login",
      element: <ProtectedAuthRoutes><Login /></ProtectedAuthRoutes>,
    },
    {
      path: "/signup",
      element: <ProtectedAuthRoutes><Signup /></ProtectedAuthRoutes>,
    },
    {
      path: "/profile",
      element: <ProtectedUserRoutes><Profile /></ProtectedUserRoutes>,
    },
    {
      path: "/jobs",
      element: <Jobs />,
    },
    {
      path: "/description/:jobId",
      element: <JobDescription />,
    },
    {
      path: "/browse",
      element: <Browse />,
    },
    // Admin Pages
    {
      path: "/admin/companies",
      element: <ProtectedAdminRoutes><Companies /></ProtectedAdminRoutes>,
    },
    {
      path: "/admin/companies/create",
      element: <ProtectedAdminRoutes><CompanyCreate /></ProtectedAdminRoutes>,
    },
    {
      path: "/admin/companies/:companyId",
      element: <ProtectedAdminRoutes><CompanySetup /></ProtectedAdminRoutes>,
    },
    {
      path: "/admin/jobs/create",
      element: <ProtectedAdminRoutes><AdminCreateJob /></ProtectedAdminRoutes>,
    },
    {
      path: "/admin/jobs",
      element: <ProtectedAdminRoutes><AdminJobs /></ProtectedAdminRoutes>,
    },

    {
      path: "/admin/jobs/:jobId/applications",
      element: <ProtectedAdminRoutes><Applications /></ProtectedAdminRoutes>
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ]);

  return (
    <>
      <RouterProvider router={appRouter} />
    </>
  );
};

export default App;
