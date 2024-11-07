import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/home";
import SignUpLogin from "../pages/signup-login";
import Layout from "../components/layout";
import GetQuiz from "../pages/getQuiz";
import Quiz from "../pages/quiz";
import Result from "../pages/result";
import NotFound from '../pages/notFound'

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/get-quiz",
        element: <GetQuiz />,
      },
      {
        path: "/quiz",
        element: <Quiz />,
      },
      {
        path: "/result",
        element: <Result />,
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
  {
    path: "*",
    element: <NotFound />,
  },
]);
