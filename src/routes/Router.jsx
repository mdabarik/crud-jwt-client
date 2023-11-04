import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout/MainLayout";
import Login from "../pages/Login/Login";

const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout></MainLayout>,
        errorElement: <p>404 Not Found!</p>,
        children: [
            {
                path: '/',
                element: <p>Home</p>
            },
            {
                path: '/rooms',
                element: <p>Rooms</p>
            },
            {
                path: '/booking',
                element: <p>Booking</p>
            },
            {
                path: '/my-booking',
                element: <p>My booking</p>
            }
        ]
    },
    {
        path: '/login',
        element: <Login></Login>
    },
    {
        path: '/register',
        element: <p>Register</p>
    }
])

export default router;