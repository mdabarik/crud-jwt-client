import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/Login/Login";
import Register from "../pages/Login/Register";
import MainLayout from "../layout/MainLayout";

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
        element: <Register></Register>
    }
])

export default router;