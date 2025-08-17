import React from "react";

import { RouterProvider } from "react-router-dom";
import router from "./component/routers/router";

export default function App() {
  return <RouterProvider router={router} />;
}
