import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home/Home";
import ErrorPage from "../pages/ErrorPage";
import AuthLayout from "../layout/AuthLayout";
import Login from "../components/Login";
import Register from "../components/Register";
import CreateAssignment from "../pages/CreateAssignment";
import Assignments from "@/pages/Assignments";
import AssignmentDetails from "@/pages/AssignmentDetails";
import UpdateAssignment from "@/pages/UpdateAssignment";
import PendingAssignments from "@/pages/PendingAssignments";
import Mysubmission from "@/pages/Mysubmission";
import PrivateRouter from "./PrivateRouter";
import GamificationDashboard from "@/pages/GamificationDashboard";

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
                element: <PrivateRouter><CreateAssignment/></PrivateRouter>,
            },
            {
                path:'assignments',
                element: <Assignments/>,
                loader: async () => fetch('http://localhost:5000/create').then(res => res.json())
            },
            // assignment details
            { 
                path:'assignments/:id',
                element: <PrivateRouter><AssignmentDetails/></PrivateRouter>,
                loader:  ({params}) => fetch(`http://localhost:5000/create/${params.id}`)
            },
            // update assignment
            {
                path:'update/:id',
                element: <PrivateRouter><UpdateAssignment/></PrivateRouter>,
                loader:  ({params}) => fetch(`http://localhost:5000/create/${params.id}`)
                
            },
            {
                path: 'pendingAssignment',
                element: <PrivateRouter><PendingAssignments /></PrivateRouter>,
                // loader: ()=>fetch('http://localhost:5000/submitAssignment')
            },{
                path: "mySubmission",
                element: <PrivateRouter><Mysubmission /></PrivateRouter>,
            },
            {
                path:'leaderboard',
                element: <PrivateRouter><GamificationDashboard /></PrivateRouter>,
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