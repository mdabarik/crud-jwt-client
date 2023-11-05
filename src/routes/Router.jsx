import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/Login/Login";
import Register from "../pages/Login/Register";
import MainLayout from "../layout/MainLayout";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import Rooms from "../pages/Rooms/Rooms";
import Home from "../pages/Home/Home";
import MyBooking from "../pages/MyBooking/MyBooking";
import AddReview from "../pages/AddReview/AddReview";
import EditReview from "../pages/EditReview/EditReview";

const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout></MainLayout>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/rooms',
                element: <Rooms></Rooms>
            },
            {
                path: '/my-booking',
                element: <MyBooking></MyBooking>
            },
            {
                path: '/my-booking/review/add/:id',
                element: <AddReview></AddReview>
            },
            {
                path: '/my-booking/review/edit/:id',
                element: <EditReview></EditReview>
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