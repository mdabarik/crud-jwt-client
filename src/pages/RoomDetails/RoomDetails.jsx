import "swiper/css";
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { useEffect, useState } from "react";
import Slider from "./Slider";

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

const RoomDetails = () => {

    const [value, setValue] = useState(dayjs('2022-04-17'));
    const [sliders, setSliders] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5555/api/v1/sliders")
            .then(res => res.json())
            .then(data => {
                setSliders(data);
            })
            .catch(() => {
            })
    }, []);

    const handleRoomBooking = (id) => {
        console.log(id);
        toast.success("Booked successfully");
    }

    return (
        <div className="my-8">
            <div className="flex flex-col ">
                <div className="flex flex-col items-center justify-center my-8">
                    <h2 className="text-2xl font-bold text-center">Room Location: Los Angelos</h2>
                    <p className="text-center text-sm mt-2">Check the details information of this room below</p>
                </div>
                <div className="flex border-2 h-[500px] my-8 w-full">
                    <div className="w-1/2">
                        <div className='h-[500px] border-2'>
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
                                    sliders.map(slider => {
                                        return <SwiperSlide key={slider._id}>
                                            <Slider slider={slider}></Slider>
                                        </SwiperSlide>
                                    })
                                }
                            </Swiper>
                        </div>
                    </div>
                    <div className="flex-1 w-1/2 space-y-1  border-2 p-3">
                        <h2 className="text-2xl font-bold">Cozy Single Room with Mountain View</h2>
                        <h3>Price Night: $200</h3>
                        <h3>Special Price:
                            <strike>$200</strike>
                            <span>$150</span>
                        </h3>
                        <p>Size: 400 sq ft</p>
                        <div>
                            <span>Status</span>
                            <span>For status select date</span>
                        </div>
                        <p>Location: <span>Lost, Angel, 11 Tower</span></p>
                        <div className="flex items-center gap-3">
                            <span>Rating</span>
                            <Rating
                                className="py-2 rounded-lg "
                                name="simple-controlled"
                                value={2}
                                precision={0.5}
                                emptyIcon={<StarIcon style={{ color: 'grey' }} fontSize="inherit" />}
                                readOnly
                            />
                            <span>(34 reviews)</span>
                        </div>
                        <p>Description: Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ea illum in quam temporibus cum obcaecati impedit ipsam corrupti, voluptas saepe provident sint cupiditate iure dolores voluptatem soluta molestias esse aliquam!</p>
                        <div>
                            {/* DatePicker */}
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer components={['DatePicker', 'DatePicker']}>
                                    <DatePicker
                                        label="Select Date"
                                        value={value}
                                        onChange={(newValue) => setValue(newValue)}
                                    />
                                </DemoContainer>
                            </LocalizationProvider>
                        </div>
                        <div>
                            <button onClick={() => handleRoomBooking(1)} className="btn btn-secondary">Book Now</button>
                        </div>
                    </div>
                </div>
            </div>
            {/* Reviews Sections */}
            <div className="border-2 h-[400px] my-8">
                <div>
                    <h2>Reviews</h2>
                    <p>Check the review from our previous customer</p>
                </div>
                <div>
                    Review Card/caraousal
                </div>
            </div>
        </div>
    );
};

export default RoomDetails;