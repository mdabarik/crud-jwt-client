import { useNavigate } from "react-router-dom";

/** Rating **/
import { Rating } from "@mui/material";
import StarIcon from '@mui/icons-material/Star';
import { useEffect, useState } from "react";

const RoomCard = ({ room }) => {

    const navigate = useNavigate();
    const { _id, price_per_night, room_images, count_stars, count_reviews } = room || {};
    const [rating, setRating] = useState(0);

    useEffect(() => {
        let rating_calculation = 0;
        if (count_reviews != 0) {
            rating_calculation = count_stars / count_reviews;
            rating_calculation = rating_calculation.toFixed(2)
            rating_calculation = parseFloat(rating_calculation);
            setRating(rating_calculation);
        }
    }, [])

    return (
        <div className="hover:cursor-pointer" onClick={() => navigate(_id)}>
            <div>
                <img className="w-full rounded-t-lg h-[200px] object-cover" src={room_images[0]} alt="room image" />
            </div>
            <div className="w-full h-[100px] bg-white rounded-b-lg p-4 drop-shadow-md">
                <p>Price per night: ${price_per_night}</p>
                <div className="flex items-center">
                    <Rating
                        className="py-2 rounded-lg "
                        name="simple-controlled"
                        value={rating}
                        precision={0.5}
                        emptyIcon={<StarIcon style={{ color: 'grey' }} fontSize="inherit" />}
                        readOnly
                    />
                    ({count_reviews} <span className="ml-2">reviews</span>)
                </div>
            </div>

        </div>
    );
};

export default RoomCard;