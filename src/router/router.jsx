import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
    {
        path: "/",
        element: <h1>Home</h1>,
    },
    {
        path: "/about",
        element: <h1>About</h1>,
    },
    {
        path: "/contact",
        element: <h1>Contact</h1>,
    },
]);

export default router;