import "swiper/css";
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { useContext, useEffect, useState } from "react";
import Slider from "./Slider";
import { Helmet } from "react-helmet";
/**** DatePicker *****/
import toast from "react-hot-toast";

/** Rating **/
import { Rating } from "@mui/material";
import StarIcon from '@mui/icons-material/Star';
import { Link, useParams } from "react-router-dom";
import useAxios from "../../hooks/useAxios";
import moment from "moment";

/**** Modal ****/
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { GlobalContext } from "../../providers/GlobalProvider";
import ReviewCard from "./ReviewCard";

const RoomDetails = () => {


    const axios = useAxios();
    const [sliders, setSliders] = useState([]);
    const [room, setRoom] = useState({});
    const [rating, setRating] = useState(0);
    const [available, setAvailable] = useState('notavailable');
    const [sDate, setSDate] = useState("");
    const { id } = useParams();
    const [validation, setValidation] = useState(moment(new Date()))
    const [disabled, setDisabled] = useState(true);
    const [availableSeat, setAvailableSeat] = useState(0);


    // modal
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    const currentDate = new Date().toISOString().split('T')[0]; // Get current date in format 'YYYY-MM-DD'
    const [selectedDate, setSelectedDate] = useState('');



    const { user } = useContext(GlobalContext);

    useEffect(() => {
        axios.get(`/api/v1/rooms/${id}`)
            .then(res => {
                setSliders(res?.data?.room_images);
                setRoom(res.data);
                // setAvailableSeat(res.data.available_rooms)
                if (res?.data?.count_reviews != 0) {
                    setRating(parseFloat(res?.data?.count_stars / res?.data?.count_reviews).toFixed(2))
                }
            })
    }, []);

    const params = useParams();
    console.log(params);

    const [reviews, setReviews] = useState([]);
    useEffect(() => {
        // userEmail=mdabarik19@gmail.com&roomId=65480a5e9b625d184f24e99d
        fetch(`http://localhost:5555/reviews/${params.id}`)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setReviews(data)
            })
    }, [])



    const handleRoomBooking = () => {

        // const currentTime = moment(new Date()); // Current time
        // const futureTime = moment(validation); // A future time to compare with, replace it with your desired time

        // if (currentTime.isBefore(futureTime, 'day')) {
        //     console.log('valid');
        // } else if (currentTime.isSame(futureTime, 'day')) {
        //     console.log('valid');
        // } else {
        //     console.log('invalid');
        //     toast.error("Oh, Sorry! Invalid date.");
        //     setDisabled(true)
        // }

        let discountPrice = parseInt(room?.price_per_night - (room?.special_offers / 100) * room?.price_per_night);
        if (parseInt(room?.price_per_night) == 0) {
            discountPrice = room?.price_per_night;
        }
        const bookingInfo = {
            roomId: id,
            roomDescription: room.room_description,
            pricePerNight: discountPrice,
            bookingDate: sDate,
            userEmail: user?.email,
            userName: user?.displayName,
            roomImage: sliders[0]
        }
        axios.post('/api/v1/booking', bookingInfo, { withCredentials: true })
            .then(res => {
                if (res.data.insertedId) {
                    toast.success('Successfully booked');
                    setDisabled(true)
                    setAvailable('notavailable')
                    setAvailableSeat(0)
                }
            })
    }

    const handleDateChange = (date) => {

        // const currentTime = moment(new Date()); // Current time
        // const futureTime = moment(validation); // A future time to compare with, replace it with your desired time

        // if (currentTime.isBefore(futureTime, 'day')) {
        //     console.log('valid');
        // } else if (currentTime.isSame(futureTime, 'day')) {
        //     console.log('valid');
        // } else {
        //     console.log('invalid');
        //     setDisabled(true)
        //     setAvailable("notavailable");
        //     return;
        // }


        console.log(date);
        setSDate(date);
        setAvailable('notavailable');
        setDisabled(true);
        fetch(`http://localhost:5555/api/v1/booking?date=${date}&id=${id}`)
            .then(response => response.json())
            .then(res => {
                console.log('available room', room.available_rooms, 'booked room', res.result.length, 'diff', parseInt(room.available_rooms) - res.result.length);
                const diff = parseInt(room.available_rooms) - res.result.length;
                setAvailableSeat(diff)
                console.log('available diff', availableSeat);
                console.log('change', res);
                setAvailable(`Available on ${date}  (${diff} seats)`)
                setDisabled(false)
                console.log('correct');
                // }
            })
            .catch(err => {
                console.log(err);
            })

    }


    const handleDateChange1 = (event) => {
        setSelectedDate(event.target.value);
        handleDateChange(event.target.value)
        setValidation(event.target.value)
    };




    return (
        <div className="my-8">
            <Helmet>
                <title>Room Details - Hotel Booking</title>
            </Helmet>
            <div className="flex flex-col ">
                <div className="flex flex-col items-center justify-center my-4">
                    <h2 className="text-3xl font-semibold text-center">Location: {room?.room_location}</h2>
                    <p className="text-center text-sm mt-2">Check the details information of this room below</p>
                </div>
                <div className="flex h-[500px] my-6 w-full">
                    <div className="w-1/2">
                        <div className='h-[500px]'>
                            <Swiper
                                loop={true}
                                spaceBetween={30}
                                centeredSlides={true}
                                autoplay={{
                                    delay: 2500,
                                    disableOnInteraction: false,
                                    pauseOnMouseEnter: true,
                                }}
                                pagination={{
                                    clickable: true,
                                }}
                                navigation={true}
                                modules={[Autoplay, Pagination, Navigation]}
                                className="mySwiper"
                            >
                                {
                                    sliders?.map((slider, index) => {
                                        return <SwiperSlide key={index}>
                                            <Slider key={slider._id} slider={slider}></Slider>
                                        </SwiperSlide>
                                    })
                                }
                            </Swiper>
                        </div>
                    </div>
                    <div className="flex-1 w-1/2 space-y-1 px-5">
                        <h2 className="text-2xl font-bold">{room?.room_description}</h2>
                        <h3 className="font-semibold">Price Night: ${room?.price_per_night}</h3>
                        <div className="flex items-center gap-x-2">
                            <p className="font-semibold">Special Price:</p>
                            {

                                parseInt(room?.special_offers) == 0 ? <span>No Special Offer Available Now</span> :

                                    <>
                                        <strike>${room?.price_per_night}</strike>
                                        <p>${parseInt(room?.price_per_night - (room?.special_offers / 100) * room?.price_per_night)}</p>
                                        <p>({room.special_offers}% off)</p></>
                            }
                        </div>
                        <p><span className="font-semibold">Size:</span> 400 sq ft</p>
                        <p><span className="font-bold">Available Seat:</span> {availableSeat == 0 ? 'Please select date for available seat' : availableSeat}</p>
                        <div className="flex items-center gap-x-2">
                            <p className="font-semibold">Status:</p>
                            <p className="px-3 py-1 rounded-lg">
                                {
                                    available == 'notavailable' ? <span className="bg-[orangered] px-3 py-1 text-[white]">For status select valid date</span> :
                                        <span className="bg-red-500 text-white font-bold px-3 py-1">{available}</span>
                                }
                            </p>
                        </div>
                        <p><span className="font-bold">Location: </span> <span>Lost, Angel, 11 Tower</span></p>
                        <div className="flex items-center gap-3">
                            <span className="font-bold">Rating:</span>
                            <Rating
                                className="py-2 rounded-lg "
                                name="simple-controlled"
                                value={rating}
                                precision={0.5}
                                emptyIcon={<StarIcon style={{ color: 'grey' }} fontSize="inherit" />}
                                readOnly
                            />
                            <span>({room.count_reviews} reviews)</span>
                        </div>
                        <p>
                            <span className="font-bold">Description: </span>
                            {room?.room_details}
                        </p>



                        {/* <input className="border-2 p-3 rounded-md" onChange={(e) => {
                            handleDateChange(e.target.value)
                            setValidation(e.target.value)
                        }
                        } type="date" /> */}

                        <input
                            className="border-2 p-3 rounded-md"
                            type="date"
                            id="datePicker"
                            name="datePicker"
                            value={selectedDate}
                            onChange={handleDateChange1}
                            min={currentDate}
                        />


                        <div>
                            <div className="space-y-4">
                                <Modal
                                    open={open}
                                    onClose={handleClose}
                                    aria-labelledby="modal-modal-title"
                                    aria-describedby="modal-modal-description"
                                >
                                    <Box sx={style}>
                                        <div className="flex flex-col space-y-5 my-10">
                                            <h2 className="text-2xl font-bold text-center">Confirm/Cancel(Click Outsite to cancel)</h2>
                                            <div>
                                                <h2>{room.room_description}</h2>
                                                <h3><span className="font-bold">Pricing:</span> ${room.price_per_night}</h3>
                                                <p><span className="font-bold">Booking date:</span> {sDate}</p>
                                            </div>
                                            <button onClick={() => handleRoomBooking()} className="btn btn-secondary text-center">Confirm Booking</button>
                                        </div>

                                    </Box>
                                </Modal>
                                {/* <Button className="btn btn-primary" onClick={handleOpen}>Book Now</Button> */}
                                {
                                    !user ? <Link className="btn btn-error" to="/login">Login to Book</Link> :
                                        disabled == true || availableSeat == 0 ?
                                            <button className="btn w-1/2 mt-2" title="select date to enable" disabled>Book Now</button>
                                            :
                                            <button onClick={() => {
                                                handleOpen()
                                            }} className="btn w-1/2 btn-secondary mt-2">Book Now</button>

                                }
                            </div>

                        </div>

                    </div>
                </div>
            </div>
            {/* Reviews Sections */}
            <div className="my-8">
                <div>
                    <h2 className="text-3xl font-semibold">Reviews: {reviews.length}</h2>
                    <p>Check the review from our previous customer</p>
                </div>
                <div className="my-3 space-y-5">
                    {/* single comment */}
                    {
                        reviews.map(card => <ReviewCard key={card._id} card={card}></ReviewCard>)
                    }


                </div>
            </div>
        </div>
    );
};

export default RoomDetails;