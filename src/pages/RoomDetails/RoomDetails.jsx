import "swiper/css";
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { useEffect, useState } from "react";
import Slider from "./Slider";
import { AiOutlineComment } from 'react-icons/ai';

/**** DatePicker *****/
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import toast from "react-hot-toast";

/** Rating **/
import { Rating } from "@mui/material";
import StarIcon from '@mui/icons-material/Star';
import { useParams } from "react-router-dom";
import useAxios from "../../hooks/useAxios";

const RoomDetails = () => {

    const axios = useAxios();
    const [value, setValue] = useState(dayjs(new Date()));
    const [sliders, setSliders] = useState([]);
    const [room, setRoom] = useState({});
    const [rating, setRating] = useState(0);

    const { id } = useParams();

    useEffect(() => {
        axios.get(`/api/v1/rooms/${id}`)
        .then(res => {
            setSliders(res?.data?.room_images);
            setRoom(res.data);
            if (res?.data?.count_reviews != 0) {
                setRating(parseFloat(res?.data?.count_stars/res?.data?.count_reviews).toFixed(2))
            }
        })
    }, []);

    const handleRoomBooking = (id) => {
        console.log(id);
        toast.success("Booked successfully");
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
                                    sliders?.map((slider) => {
                                        return <SwiperSlide key={slider._id}>
                                            <Slider slider={slider}></Slider>
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
                            <p>${parseInt( room?.price_per_night - (room?.special_offers/100)*room?.price_per_night )}</p>
                            <p>({room.special_offers}% off)</p>
                        </h3>
                        <p><span className="font-semibold">Size:</span> 400 sq ft</p>
                        <div className="flex items-center gap-x-2">
                            <p className="font-semibold">Status:</p>
                            <p className="bg-orange-200 text-red-600 px-3 py-1 rounded-lg">For status select date</p>
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
                        <div>
                            {/* DatePicker */}
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer components={['DatePicker', 'DatePicker']}>
                                    <DatePicker
                                        label="Select Date"
                                        // value={value}
                                        onChange={(newValue) => setValue(newValue)}
                                    />
                                </DemoContainer>
                            </LocalizationProvider>
                        </div>
                        <div>
                            <button onClick={() => handleRoomBooking(room?._id)} className="btn btn-secondary mt-2">Book Now</button>
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