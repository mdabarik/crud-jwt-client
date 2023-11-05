import { useEffect, useState } from "react";
import useAxios from "../../hooks/useAxios";
import RoomCard from "../../components/RoomCard/RoomCard";

const Rooms = () => {
    const axios = useAxios();

    const [rooms, setRooms] = useState([]);
    useEffect(() => {
        axios.get('/api/v1/rooms')
        .then(res => {
            setRooms(res.data);
        })
    }, [])

    return (
        <div className="my-8">
            {/* Filter Rooms */}
            <div>
                <h2 className="text-2xl font-bold">Filter Rooms</h2>
                <div>
                    <p>Sort By Range:</p>
                    <select onChange={() => {}} className="select select-bordered w-full max-w-xs">
                        <option value="a" disabled selected>Select One</option>
                        <option value="b">$0-$100</option>
                        <option value="c">$101-$200</option>
                        <option value="d">$201-$400</option>
                        <option value="e">$401+</option>
                    </select>
                </div>
                <div>
                    <p>Sort By Price:</p>
                    <select  onChange={() => {}} className="select select-bordered w-full max-w-xs">
                        <option value="aa" disabled selected>Select One</option>
                        <option value={"asc"}>Low to High</option>
                        <option value={"desc"}>High to Low</option>
                    </select>
                </div>
            </div>
           {/* Rooms */}
           <div className="my-8 border-2">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {
                        rooms.map(room => <RoomCard key={room._id} room={room}></RoomCard>)
                    }
                </div>
           </div>
        </div>
    );
};

export default Rooms;