import { useContext, useState } from "react";


/**** DatePicker *****/
import { useEffect } from "react";
import { GlobalContext } from "../../providers/GlobalProvider";
import MyBookingCard from "./MyBookingCard";





const MyBooking = () => {

    const { user } = useContext(GlobalContext);
    const [myBooking, setMyBooking] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:5555/api/v1/all-booking?email=${user?.email}`)
        .then(res => res.json())
        .then(data => {
            setMyBooking(data.result)
            console.log(data.result);
        })
    }, [])


    return (
            <div className="my-10">
                <h1 className="text-2xl font-bold text-center mb-4">My Booking</h1>
                <div>
                    {
                        myBooking.map(card => <MyBookingCard setMyBooking={setMyBooking} myBooking={myBooking} card={card} key={card._id}></MyBookingCard>)
                    }
                </div>
            </div>
    );
};

export default MyBooking;