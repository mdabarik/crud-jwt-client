import { Rating, Typography } from "@mui/material";
import { useState } from "react";


const EditReview = () => {
    const [value, setValue] = useState(0);
    const [errorMessage, setErrorMessage] = useState("");

    const handleAddReview = (e) => {
        e.preventDefault();
    }

    return (
        <div className="my-10">
            <div className="flex flex-col items-center justify-center">
                <h2 className="text-2xl font-bold text-center">Update Your Feedback</h2>
                <p className="text-center">Edit your feedback here</p>
            </div>
            <div className="flex items-center justify-center mt-8">
                <form onSubmit={handleAddReview} className="w-[90%] md:w-[60%]">
                    {
                        errorMessage == "" ? "" :
                            <div className="alert alert-error flex items-center justify-center">
                                <span>Error: {errorMessage}</span>
                            </div>
                    }

                    <div className="form-control flex items-center justify-center">
                        <div className="avatar">
                            <div className=" rounded">
                                <div className="w-[100px] h-[100px] bg-gray-500"></div>
                            </div>
                        </div>
                    </div>
                    <div className="form-control">
                        <label htmlFor="your-name" className="label">Your Name</label>
                        <input required type="text" id="your-name" placeholder="Your Name" className="input input-bordered disabled dark:text-black" disabled />
                    </div>
                    <div className="form-control">
                        <label htmlFor="email" className="label">Your Email</label>
                        <input required type="email" id="email" placeholder="Your email" className="input input-bordered  dark:text-black" disabled />
                    </div>
                    <div className="form-control">
                        <label htmlFor="feedback" className="label"> Your Review</label>
                        <textarea required className="textarea textarea-bordered h-24  dark:text-black" id="feedback" placeholder="Write your feedback"></textarea>
                    </div>
                    <div className="form-control my-3 space-y-2 ">
                        <Typography className="pl-1" component="legend">Rating</Typography>
                        <Rating
                            className="bg-white py-2 px-2 rounded-lg"
                            name="simple-controlled"
                            value={value}
                            onChange={(event, newValue) => {
                                setValue(newValue);
                            }}
                            precision={0.5}
                        />
                    </div>
                    <div className="form-control">
                        <input type="submit" className="btn btn-full w-full text-white bg-[orange] hover:bg-[#ffb731] hover:border-[orange] border-[orange] normal-case text-lg mt-3" default="Add Review" />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditReview;