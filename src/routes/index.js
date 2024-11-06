import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/home";
import SignUpLogin from "../pages/signup-login";
import Layout from "../components/layout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
    ],
  },
  {
    path: "/login",
    element: <SignUpLogin />,
  },
  {
    path: "/registration",
    element: <SignUpLogin />,
  },
]);
