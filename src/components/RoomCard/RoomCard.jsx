import { useNavigate } from "react-router-dom";

const RoomCard = ({ room }) => {
    const navigate = useNavigate();
    const { _id, price_per_night, room_images, countStars, countReviews } = room || {};
    return (
        <div className="hover:cursor-pointer" onClick={() => navigate(_id)}>
            <div>
                <img className="w-full rounded-t-lg h-[200px] object-cover" src={room_images[0]} alt="room image" />
            </div>
            <div className="w-full h-[100px] bg-gray-400 rounded-b-lg">
                <p>Price per night: ${price_per_night}</p>
                <div>
                    Rating: * * * * * (5)
                </div>
            </div>

        </div>
    );
};

export default RoomCard;