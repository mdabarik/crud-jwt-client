

import 'swiper/css';
import 'swiper/css/pagination';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import Testimonial from './Testimonial';

const Testimonials = () => {


    const [testimonials, setTestimonials] = useState([]);
    useEffect(() => {
        fetch("https://brand-shop-server-e61d5nzmg-mdabarik.vercel.app/teams")
            .then(res => res.json())
            .then(data => {
                setTestimonials(data);
            })
            .catch(err => {
                console.log(err);
            })
    }, []);

    return (
        <div className="my-10">
            {/* Rooms */}
            <div className="my-8">
                <div className="flex flex-col items-center justify-center my-4">
                    <h2 className="text-2xl font-bold text-center">User Testimonials</h2>
                    <p className="text-center">Check the testimonials mad by our customers</p>
                </div>
                <div className="pb-8 w-[90vw] md:w-[100vw] container">
                    <Swiper
                        slidesPerView={2}
                        loop={true}
                        spaceBetween={16}
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
                            testimonials.map(testitmonial => {
                                return <SwiperSlide key={testitmonial._id}>
                                    <Testimonial testitmonial={testitmonial}></Testimonial>
                                </SwiperSlide>
                            })
                        }
                    </Swiper>
                </div>
            </div>
        </div>
    );
};

export default Testimonials;