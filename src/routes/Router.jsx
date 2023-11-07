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
import RoomDetails from "../pages/RoomDetails/RoomDetails";
import PrivateRoute from "./PrivateRoute";
import FAQ from "../pages/FAQ/FAQ";
import AboutUs from "../pages/AboutUs/AboutUs";

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
                path: '/rooms/:id',
                element: <RoomDetails></RoomDetails>
            },
            {
                path: '/my-booking',
                element: <PrivateRoute><MyBooking></MyBooking></PrivateRoute>
            },
            {
                path: '/my-booking/review/add/:id',
                element: <PrivateRoute><AddReview></AddReview></PrivateRoute>
            },
            {
                path: '/my-booking/review/edit/:id',
                element: <PrivateRoute><EditReview></EditReview></PrivateRoute>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/register',
                element: <Register></Register>
            },
            {
                path: '/faq',
                element: <FAQ></FAQ>
            },
            {
                path: '/about-us',
                element: <AboutUs></AboutUs>
            }
        ]
    },
])

export default router;