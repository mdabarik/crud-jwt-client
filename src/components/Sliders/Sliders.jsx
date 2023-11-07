import "swiper/css";
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { useEffect, useState } from "react";
import Slider from "./Slider";

/*** AOS Animation ***/
import 'aos/dist/aos.css';
import AOS from "aos";


const Sliders = () => {


    useEffect(() => {
        AOS.init({
            offset: 200,
            duration: 600,
            easing: 'ease-in-sine',
            delay: 100,
          })
    }, [])

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

    return (
        <div className='w-[100%] lg:w-full h-[500px] relative z-0' data-aos="zoom-in">
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
    );
};

export default Sliders;