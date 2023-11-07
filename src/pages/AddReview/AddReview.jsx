import { Rating, Typography } from "@mui/material";
import moment from "moment/moment";
import { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useParams } from "react-router-dom";
import useAxios from "../../hooks/useAxios";
import { GlobalContext } from "../../providers/GlobalProvider";


const AddReview = () => {

    const { user } = useContext(GlobalContext);

    const [value, setValue] = useState(0);
    const [errorMessage, setErrorMessage] = useState("");
    const [review, setReview] = useState(null);
    const [profession, setProfession] = useState(null)
    const [exist, setExist] = useState(false);
    const params = useParams();
    console.log(params);

    useEffect(() => {
        axios.get(`/api/v1/singlereview?userEmail=${user?.email}&roomId=${params.id}`)
            .then(res => {
                const data = res.data;
                setValue(data[0].rating)
                setReview(data[0].review)

                setProfession(data[0].profession)
                console.log(data);
                if (data[0].review) {
                    setExist(true);
                }
            })
    }, [])

    const axios = useAxios();

    const handleAddReview = (e) => {
        e.preventDefault();
        const rating = value;
        const userName = user?.displayName;
        const photoURL = user?.photoURL;
        const userEmail = user?.email;
        const roomId = params.id;
        const date = moment().format('ll')
        const info = {
            rating,
            review,
            userName,
            photoURL,
            date,
            userEmail,
            roomId,
            profession
        }
        axios.put('/api/v1/add-review', info)
            .then(res => {
                console.log(res);
                if (res.data.upsertedCount) {
                    toast.success('Your review added successfully.')
                    setExist(true)

                } else {
                    toast.success("Updated succfully")
                }

                axios.patch(`/update-room/${params.id}`, { rating })
                    .then(res => {
                        console.log(res.data);
                    })

            })
    }



    return (
        <div className="my-10">
            <div className="flex flex-col items-center justify-center">
                <h2 className="text-2xl font-bold text-center">Your Feedback</h2>
                <p className="text-center">Write your detailed feedback</p>
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
                            <div className="rounded">
                                <img className="max-w-[100px] h-[100px]" src={user?.photoURL} alt="photo" />
                            </div>
                        </div>
                    </div>
                    <div className="form-control">
                        <label htmlFor="your-name" className="label">Your Name</label>
                        <input value={user?.displayName} required type="text" id="your-name" placeholder="Your Name" className="input input-bordered disabled dark:text-black" disabled />
                    </div>
                    <div className="form-control">
                        <label htmlFor="email" className="label">Your Email</label>
                        <input value={user?.email} required type="email" id="email" placeholder="Your email" className="input input-bordered  dark:text-black" disabled />
                    </div>
                    <div className="form-control">
                        <label htmlFor="email" className="label">Your Profession</label>
                        <input value={profession || ''} onChange={e => setProfession(e.target.value)} required type="text" id="profession" placeholder="Your profession" className="input input-bordered  dark:text-black" />
                    </div>
                    <div className="form-control">
                        <label htmlFor="feedback" className="label"> Your Review</label>
                        <textarea value={review || ''} onChange={(e) => setReview(e.target.value)} required className="textarea textarea-bordered h-24  dark:text-black" id="feedback" placeholder="Write your feedback"></textarea>
                    </div>
                    <div className="form-control my-3 space-y-2 ">
                        <Typography className="pl-1" component="legend">Rating</Typography>
                        <Rating
                            className="bg-white py-2 px-2 rounded-lg"
                            name="simple-controlled"
                            value={value || 0}
                            onChange={(event, newValue) => {
                                setValue(newValue);
                            }}
                            precision={0.5}
                        />
                    </div>

                    {/* /my-booking/review/add/${roomId} */}
                    {
                        exist ?
                            <Link to={`/my-booking/review/edit/${params.id}`} className="btn btn-full w-full text-white bg-[orange] hover:bg-[#ffb731] hover:border-[orange] border-[orange] normal-case text-lg mt-3">Go To Edit Page</Link>
                            :
                            <div className="form-control">
                                <input type="submit" className="btn btn-full w-full text-white bg-[orange] hover:bg-[#ffb731] hover:border-[orange] border-[orange] normal-case text-lg mt-3" default="Add Review" />
                            </div>
                    }
                </form>
            </div>
        </div>
    );
};

export default AddReview;