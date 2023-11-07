import { useEffect, useState } from "react";
import useAxios from "../../hooks/useAxios";
import RoomCard from "../../components/RoomCard/RoomCard";
/*** AOS Animation ***/
import 'aos/dist/aos.css';
import AOS from "aos";
import { Helmet } from "react-helmet";


const Rooms = () => {
    const axios = useAxios();
    const [range, setRange] = useState('');
    const [sortOrder, setSortOrder] = useState('')
    const [rooms, setRooms] = useState([]);


    useEffect(() => {
        AOS.init()
    }, [])


    useEffect(() => {
        // http://localhost:5555/api/v1/rooms?filterByPrice=0-100&sortField=price_per_night&sortOrder=asc
        const url = `/api/v1/rooms?filterByPrice=${range}&sortField=price_per_night&sortOrder=${sortOrder}`;
        console.log(url);
        axios.get(url, {withCredentials: true})
            .then(res => {
                setRooms(res.data);
            })
    }, [range, sortOrder])

    return (
        <div className="my-8 w-[90%] md:w-[90%] max-w-[1280px] mx-auto" data-aos="zoom-in">
            <Helmet>
                <title>Rooms - Hotel Booking</title>
            </Helmet>
            {/* Filter Rooms */}
            <div>
                <h2 className="text-2xl font-bold">Filter Rooms</h2>
                <div>
                    <p>Sort By Range:</p>
                    <select onChange={(e) => {
                        setRange(e.target.value)
                    }} className="select select-bordered w-full max-w-xs">
                        <option value={""} selected>Show All</option>
                        <option value="0-100">$0-$100</option>
                        <option value="101-200">$101-$200</option>
                        <option value="201-400">$201-$400</option>
                        <option value="401-10000">$401+</option>
                    </select>
                </div>
                <div>
                    <p>Sort By Price:</p>
                    <select onChange={(e) => { setSortOrder(e.target.value) }} className="select select-bordered w-full max-w-xs">
                        <option value={""} selected>No Sort</option>
                        <option value={"asc"}>Low to High</option>
                        <option value={"desc"}>High to Low</option>
                    </select>
                </div>
            </div>
            {/* Rooms */}
            <div className="my-8">
                {
                    rooms.length == 0 ?
                        <h2 className="text-center text-3xl font-bold text-red-700">No rooms found</h2> :
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {
                                rooms.map(room => <RoomCard key={room._id} room={room}></RoomCard>)
                            }
                        </div>
                }
            </div>
        </div>
    );
};

export default Rooms;