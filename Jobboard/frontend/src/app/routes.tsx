import { createBrowserRouter } from "react-router";
import Root from "./pages/Root";
import Home from "./pages/Home";
import JobListings from "./pages/JobListings";
import JobDetail from "./pages/JobDetail";
import EmployerDashboard from "./pages/EmployerDashboard";
import CandidateDashboard from "./pages/CandidateDashboard";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NotFound from "./pages/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Home },
      { path: "jobs", Component: JobListings },
      { path: "jobs/:id", Component: JobDetail },
      { path: "employer/dashboard", Component: EmployerDashboard },
      { path: "candidate/dashboard", Component: CandidateDashboard },
      { path: "login", Component: Login },
      { path: "signup", Component: Signup },
      { path: "*", Component: NotFound },
    ],
  },
]);
