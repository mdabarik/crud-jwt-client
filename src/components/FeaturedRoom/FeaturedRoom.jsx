import { useEffect, useState } from "react";
import useAxios from "../../hooks/useAxios";
import RoomCard from "./RoomCard";

const FeaturedRoom = () => {
    const axios = useAxios();
    const [rooms, setRooms] = useState([]);

    useEffect(() => {
        // http://localhost:5555/api/v1/rooms?filterByPrice=0-100&sortField=price_per_night&sortOrder=asc
        const url = `/api/v1/rooms?filterByPrice=0-1000&sortField=price_per_night&sortOrder=desc`;
        axios.get(url)
            .then(res => {
                setRooms(res.data.splice(0, 4));
            })
    }, [])


    return (
        <div className="my-8">
            {/* Rooms */}
            <div className="my-8">
                <div className="flex flex-col items-center justify-center my-4">
                    <h2 className="text-2xl font-bold text-center">Featured Rooms</h2>
                    <p className="text-center">Get the best deals and suitable affordable rooms</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {
                        rooms.map(room => <RoomCard room={room} key={room._id}></RoomCard>)
                    }
                </div>
            </div>
        </div>
    );
};

export default FeaturedRoom;