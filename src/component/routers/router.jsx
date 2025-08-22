import { createBrowserRouter } from "react-router-dom";
import DashboardBuyer from "../buyer/Dashboard";
import DashboardSeller from "../seller/Dashboard";
import DashboardAdmin from "../admin/Dashboard";
import Login from "../Common/login";
import Signup from "../Common/signup";
import PropertyListingPage from "../../pages/seller/Profertylist";

import EditDeletePropertyPage from "../../pages/seller/Profertyedit";

const router = createBrowserRouter([
  { path: "/buyer", element: <DashboardBuyer /> },
  { path: "/seller", element: <DashboardSeller /> },
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <Signup /> },
  { path: "/admin", element: <DashboardAdmin /> },
  { path: "/properties", element: <PropertyListingPage /> },

  { path: "/edit-delete-property", element: <EditDeletePropertyPage /> }, // New route // Property listing page
]);

export default router;
