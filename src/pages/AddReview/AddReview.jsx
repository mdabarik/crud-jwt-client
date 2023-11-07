import { Rating, Typography } from "@mui/material";
import moment from "moment/moment";
import { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, Navigate, useParams } from "react-router-dom";
import useAxios from "../../hooks/useAxios";
import { GlobalContext } from "../../providers/GlobalProvider";
import { Helmet } from "react-helmet";


const AddReview = () => {

    const { user } = useContext(GlobalContext);
    

    const [value, setValue] = useState(0);
    const [errorMessage, setErrorMessage] = useState("");
    const [review, setReview] = useState(null);
    const [profession, setProfession] = useState(null)
    const [exist, setExist] = useState(false);
    const params = useParams();
    console.log(params);
    const [countReviews, setCountReviews] = useState(0);
    const [countStars, setCountStars] = useState(0);

    useEffect(() => {
        axios.get(`/api/v1/rooms/${params.id}`)
        .then(res => {
            console.log('api/v1/rooms',res?.data);
            setCountReviews(res?.data?.count_reviews)
            setCountStars(res?.data?.count_stars)
            console.log(countReviews, countStars);
        })
    }, [])

    useEffect(() => {
        axios.get(`/api/v1/singlereview?userEmail=${user?.email}&roomId=${params.id}`, { withCredentials: true })
            .then(res => {
                const data = res.data;
                setValue(parseFloat(data[0]?.rating).toFixed(2))
                setReview(data[0].review)

                setProfession(data[0].profession)
                console.log(data);
                if (data[0].review) {
                    setExist(true);
                }
            })
    }, [])

    const [notAuthorized, setNotAuthorized] = useState(false);
    const [load, setLoad] = useState(false);
    useEffect(() => {
        fetch(`http://localhost:5555/review/checking?email=${user?.email}&id=${params.id}`)
        .then(res => res.json())
        .then(data => {
            console.log(user.email, params.id);
            const result = data?.data;
            console.log(result);
            if (result.length == 0) {
                setNotAuthorized(true);
            } else if (result.length != 0) {
                setNotAuthorized(false);
            }
        })
    }, [])

    // if (load) {
    //     return <p>loading</p>
    // }

    if (notAuthorized) {
        return <Navigate to="/" />
    }

    const axios = useAxios();

    const handleAddReview = (e) => {
        e.preventDefault();

        if (value == 0) {
            setErrorMessage('Please select rating');
            return;
        }
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
        axios.post('/api/v1/add-review', info, { withCredentials: true })
            .then(res => {
                console.log(res);
                if (res.data?.insertedId) {
                    toast.success('Your review added successfully.')
                    setExist(true)

                } else {
                    toast.error("Something went wrong")
                }
            })

            

        axios.patch(`/update-room/${params.id}`, {rating})
        .then(res => {
            console.log(res?.data);
        })

        // axios.put('/api/v1/add-review', info, { withCredentials: true })
        //     .then(res => {
        //         console.log(res);
        //         if (res?.data?.upsertedCount) {
        //             toast.success('Your review added successfully.')
        //             setExist(true)

        //         } else {
        //             // toast.success("Updated succfully")
        //         }

        //     })
    }



    return (
        <div className="my-10">
            <Helmet>
                <title>Add Review - Hotel Booking</title>
            </Helmet>
            <div className="flex flex-col items-center justify-center">
                <h2 className="text-2xl font-bold text-center">Your Feedback</h2>
                <p className="text-center">Write your detailed feedback</p>
            </div>
            <div className="flex items-center justify-center mt-8">
                <form onSubmit={handleAddReview} className="w-[90%] md:w-[60%]">




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
                    <div className="flex items-center justify-center">
                    {/* to={`/my-booking/review/edit/${params.id}`} */}
                        {
                            exist ?
                                <button  className="text-center font-bold w-full btn btn-primary" disabled>Already Submitted!</button>
                                :
                                <div className="form-control w-full">
                                    <input type="submit" className="btn btn-full w-full text-white bg-[orange] hover:bg-[#ffb731] hover:border-[orange] border-[orange] normal-case text-lg mt-3" default="Add Review" />
                                </div>
                        }
                        {
                            errorMessage != '' ? <p className="text-2xl text-red-600 text-center">{errorMessage}</p> : ""
                        }
                    </div>

                </form>
            </div>
        </div>
    );
};

export default AddReview;