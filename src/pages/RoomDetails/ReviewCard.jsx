/** Rating **/
import { Rating } from "@mui/material";
import StarIcon from '@mui/icons-material/Star';
import { AiOutlineComment } from 'react-icons/ai';
import { useState } from "react";


const ReviewCard = ({card}) => {
    const {photoURL, userName, profession, date, rating, review} = card || {};

    console.log(card);
    return (
        <div className="bg-white drop-shadow-md rounded-lg space-y-3 p-8">
            <div className="flex items-center gap-x-4">
                <div className="h-[100px] w-[100px] rounded-full">
                    <img src={photoURL} className="h-[100px] w-[100px] rounded-full" />
                </div>
                <div className="flex flex-col">
                    <h3 className="text-xl font-bold">{userName}</h3>
                    <p>Date: {date || '2020-20-10'}</p>
                    <div>
                        <Rating
                            className="rounded-lg "
                            name="simple-controlled"
                            value={rating || 0}
                            precision={0.5}
                            emptyIcon={<StarIcon style={{ color: 'grey' }} fontSize="inherit" />}
                            readOnly
                        />
                    </div>
                </div>
            </div>

            <div>
                <AiOutlineComment className="text-3xl inline-block mr-4"></AiOutlineComment>
                <span>{review}</span>
            </div>
        </div>
    );
};

export default ReviewCard;