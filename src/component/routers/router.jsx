import { createBrowserRouter } from "react-router-dom";
import DashboardBuyer from "../buyer/Dashboard";
import DashboardSeller from "../seller/Dashboard";
import DashboardAdmin from "../admin/Dashboard";
import Login from "../Common/login";
import Signup from "../Common/signup";

const router = createBrowserRouter([
  { path: "/buyer", element: <DashboardBuyer /> },
  { path: "/seller", element: <DashboardSeller /> },
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <Signup /> },
  { path: "/admin", element: <DashboardAdmin /> },
]);

export default router;
