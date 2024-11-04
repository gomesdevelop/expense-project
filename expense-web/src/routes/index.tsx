import Dashboard from "@/app/dashboard/page";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
  },
]);
