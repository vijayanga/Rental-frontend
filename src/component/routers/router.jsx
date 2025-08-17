import { createBrowserRouter } from "react-router-dom";
import DashboardBuyer from "../buyer/Dashboard";
import DashboardSeller from "../buyer/Dashboard";

const router = createBrowserRouter([
  { path: "/buyer", element: <DashboardBuyer /> },
  { path: "/seller", element: <DashboardSeller /> },
]);

export default router;
