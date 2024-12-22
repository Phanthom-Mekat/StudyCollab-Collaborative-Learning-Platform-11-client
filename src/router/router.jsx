import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home/Home";
import ErrorPage from "../pages/ErrorPage";
import AuthLayout from "../layout/AuthLayout";
import Login from "../components/Login";
import Register from "../components/Register";
import CreateAssignment from "../pages/CreateAssignment";
import Assignments from "@/pages/Assignments";

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path:'create',
                element:<CreateAssignment/>
            },
            {
                path:'assignments',
                element: <Assignments/>,
                loader: async () => fetch('http://localhost:5000/create').then(res => res.json())
            }
        ]
    },
    {
        path: 'auth',
        element: <AuthLayout />,
        children: [
            {
                path: 'login',
                element: <Login />
            },
            {
                path: 'register',
                element: <Register />
            }
        ]
    }, {
        path: '*',
        element: <ErrorPage />
    }
]);

export default router;