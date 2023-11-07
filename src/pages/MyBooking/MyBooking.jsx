import { useContext, useState } from "react";


/**** DatePicker *****/
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../../providers/GlobalProvider";
import MyBookingCard from "./MyBookingCard";


const MyBooking = () => {

    const { user, loading, logOut } = useContext(GlobalContext);
    const [myBooking, setMyBooking] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`http://localhost:5555/api/v1/all-booking?email=${user?.email}`, {
            credentials: 'include'
        })
            .then(res => {
                if (res.status == 401 || res.status == 403) {
                    logOut();
                    return navigate('/login')
                }
                return res.json()
            })
            .then(data => {
                setMyBooking(data.result)
                console.log(data.result);
            })
            .catch(err => {
                console.log(err);
                console.log('lakdjflakdjf');
            })
    }, [])


    return (
        <div className="my-10">
            <h1 className="text-3xl font-bold text-center mb-4">My Booking</h1>
            {
                myBooking?.length == 0 ? <p className="text-2xl font-bold text-center text-red-700">No booking exists.</p> : ""
            }
            <div>
                {
                    myBooking?.map(card => <MyBookingCard setMyBooking={setMyBooking} myBooking={myBooking} card={card} key={card._id}></MyBookingCard>)
                }
            </div>
        </div>
    );
};

export default MyBooking;