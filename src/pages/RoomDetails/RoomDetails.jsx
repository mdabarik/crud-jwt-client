import "swiper/css";
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { useContext, useEffect, useState } from "react";
import Slider from "./Slider";
import { AiOutlineComment } from 'react-icons/ai';

/**** DatePicker *****/
import toast from "react-hot-toast";

/** Rating **/
import { Rating } from "@mui/material";
import StarIcon from '@mui/icons-material/Star';
import { useParams } from "react-router-dom";
import useAxios from "../../hooks/useAxios";
import moment from "moment";

/**** Modal ****/
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { GlobalContext } from "../../providers/GlobalProvider";

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

    const { user } = useContext(GlobalContext);

    useEffect(() => {
        axios.get(`/api/v1/rooms/${id}`)
            .then(res => {
                setSliders(res?.data?.room_images);
                setRoom(res.data);
                if (res?.data?.count_reviews != 0) {
                    setRating(parseFloat(res?.data?.count_stars / res?.data?.count_reviews).toFixed(2))
                }
            })
    }, []);





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

        const discountPrice = parseInt(room?.price_per_night - (room?.special_offers / 100) * room?.price_per_night);
        const bookingInfo = {
            roomId: id,
            roomDescription: room.room_description,
            pricePerNight: discountPrice,
            bookingDate: sDate,
            userEmail: user?.email,
            userName: user?.displayName,
            roomImage: sliders[0]
        }
        axios.post('/api/v1/booking', bookingInfo)
            .then(res => {
                if (res.data.insertedId) {
                    toast.success('Successfully booked');
                    setDisabled(true)
                    setAvailable('notavailable')
                }
            })
    }

    const handleDateChange = (date) => {

        const currentTime = moment(new Date()); // Current time
        const futureTime = moment(validation); // A future time to compare with, replace it with your desired time

        if (currentTime.isBefore(futureTime, 'day')) {
            console.log('valid');
        } else if (currentTime.isSame(futureTime, 'day')) {
            console.log('valid');
        } else {
            console.log('invalid');
            setDisabled(true)
            setAvailable("notavailable");
            return;
        }


        console.log(date);
        setSDate(date);
        setAvailable('notavailable');
        setDisabled(true);
        fetch(`http://localhost:5555/api/v1/booking?date=${date}&id=${id}`)
            .then(response => response.json())
            .then(res => {
                console.log(res);
                setAvailable(`Sorry not available at: ${date}`)
                if (res.result.length == 0) {
                    setAvailable(`Available on ${date}`)
                    toast.success(`Available on ${date}`)
                    setDisabled(false)
                    console.log('correct');
                }
            })
            .catch(err => {
                console.log(err);
            })

    }


    return (
        <div className="my-8">
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
                        <h3 className="flex items-center gap-x-2">
                            <p className="font-semibold">Special Price:</p>
                            <strike>${room?.price_per_night}</strike>
                            <p>${parseInt(room?.price_per_night - (room?.special_offers / 100) * room?.price_per_night)}</p>
                            <p>({room.special_offers}% off)</p>
                        </h3>
                        <p><span className="font-semibold">Size:</span> 400 sq ft</p>
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
                        <input className="border-2 p-3 rounded-md" onChange={(e) => {
                            handleDateChange(e.target.value)
                            setValidation(e.target.value)
                        }
                        } type="date" />
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
                                                <h3>Pricing: {room.price_per_night}</h3>
                                                <p>Booking date: {sDate}</p>
                                            </div>
                                            <button onClick={() => handleRoomBooking()} className="btn btn-secondary text-center">Confirm Booking</button>
                                        </div>

                                    </Box>
                                </Modal>
                                {/* <Button className="btn btn-primary" onClick={handleOpen}>Book Now</Button> */}
                                {
                                    disabled == true ?
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
                    <h2 className="text-3xl font-semibold">Reviews</h2>
                    <p>Check the review from our previous customer</p>
                </div>
                <div className="my-3 space-y-5">
                    {/* single comment */}
                    <div className="bg-white drop-shadow-md rounded-lg space-y-3 p-8">
                        <div className="flex items-center gap-x-4">
                            <div className="h-[100px] w-[100px] rounded-full bg-black">
                                {/* image */}
                            </div>
                            <div className="flex flex-col">
                                <h3>Md. A. Barik</h3>
                                <p>Date: 10 Oct 2023</p>
                                <div>
                                    <Rating
                                        className="rounded-lg "
                                        name="simple-controlled"
                                        value={2}
                                        precision={0.5}
                                        emptyIcon={<StarIcon style={{ color: 'grey' }} fontSize="inherit" />}
                                        readOnly
                                    />
                                </div>
                            </div>
                        </div>

                        <div>
                            <AiOutlineComment className="text-3xl inline-block mr-4"></AiOutlineComment>
                            <span>I booked this room at 20/10/23. It was really amazing and beautiful experience.
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ullam mollitia animi tempora perspiciatis hic error voluptatibus rerum, voluptatem quisquam sunt labore cum? Expedita sapiente, obcaecati quisquam corrupti exercitationem nostrum amet earum, necessitatibus, unde similique vitae blanditiis tempore explicabo repellat. Necessitatibus sunt facere ex voluptate quos accusantium quia tempore labore, odit architecto ipsam voluptas minus voluptatibus facilis at praesentium deserunt tempora. Nam facere doloribus labore obcaecati unde nobis ipsa rem eaque! Sed commodi et quod quo minima nulla soluta facere cum nam officia. Numquam expedita necessitatibus, fugit repellendus ipsa exercitationem dolor ut. Sint qui cumque animi optio eos! Provident iure deleniti optio necessitatibus suscipit, distinctio dignissimos similique minus autem, temporibus quo nesciunt dolore ut qui ad ipsam non voluptas sunt vel, nemo deserunt sit. Nulla quod dolorum error, ducimus laudantium aperiam dicta voluptates odio commodi quaerat sapiente blanditiis pariatur vel! Ab accusamus et consectetur, nam atque molestias corporis necessitatibus, omnis nulla qui aut asperiores dolorem enim tempore consequuntur perspiciatis impedit? Molestiae cumque laboriosam veritatis soluta eum. Ipsum laborum, omnis adipisci mollitia suscipit numquam optio molestias, corrupti, labore tenetur itaque voluptatum. Minus dolorem asperiores voluptatem deserunt eos labore! Accusamus dolore dolores velit eligendi soluta deleniti, non rerum quasi asperiores eveniet itaque consequuntur.
                            </span>
                        </div>
                    </div>

                    <div className="bg-white drop-shadow-md rounded-lg space-y-3 p-8">
                        <div className="flex items-center gap-x-4">
                            <div className="h-[100px] w-[100px] rounded-full bg-black">
                                {/* image */}
                            </div>
                            <div className="flex flex-col">
                                <h3>Md. A. Barik</h3>
                                <p>Date: 10 Oct 2023</p>
                                <div>
                                    <Rating
                                        className="rounded-lg "
                                        name="simple-controlled"
                                        value={2}
                                        precision={0.5}
                                        emptyIcon={<StarIcon style={{ color: 'grey' }} fontSize="inherit" />}
                                        readOnly
                                    />
                                </div>
                            </div>
                        </div>

                        <div>
                            <AiOutlineComment className="text-3xl inline-block mr-4"></AiOutlineComment>
                            <span>I booked this room at 20/10/23. It was really amazing and beautiful experience.
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ullam mollitia animi tempora perspiciatis hic error voluptatibus rerum, voluptatem quisquam sunt labore cum? Expedita sapiente, obcaecati quisquam corrupti exercitationem nostrum amet earum, necessitatibus, unde similique vitae blanditiis tempore explicabo repellat. Necessitatibus sunt facere ex voluptate quos accusantium quia tempore labore, odit architecto ipsam voluptas minus voluptatibus facilis at praesentium deserunt tempora. Nam facere doloribus labore obcaecati unde nobis ipsa rem eaque! Sed commodi et quod quo minima nulla soluta facere cum nam officia. Numquam expedita necessitatibus, fugit repellendus ipsa exercitationem dolor ut. Sint qui cumque animi optio eos! Provident iure deleniti optio necessitatibus suscipit, distinctio dignissimos similique minus autem, temporibus quo nesciunt dolore ut qui ad ipsam non voluptas sunt vel, nemo deserunt sit. Nulla quod dolorum error, ducimus laudantium aperiam dicta voluptates odio commodi quaerat sapiente blanditiis pariatur vel! Ab accusamus et consectetur, nam atque molestias corporis necessitatibus, omnis nulla qui aut asperiores dolorem enim tempore consequuntur perspiciatis impedit? Molestiae cumque laboriosam veritatis soluta eum. Ipsum laborum, omnis adipisci mollitia suscipit numquam optio molestias, corrupti, labore tenetur itaque voluptatum. Minus dolorem asperiores voluptatem deserunt eos labore! Accusamus dolore dolores velit eligendi soluta deleniti, non rerum quasi asperiores eveniet itaque consequuntur.
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RoomDetails;