import FeaturedRoom from "../../components/FeaturedRoom/FeaturedRoom";
import NewsLetter from "../../components/NewsLetter/NewsLetter";
import Sliders from "../../components/Sliders/Sliders";
import Testimonials from "../../components/Testimonials/Testimonials";
/*** AOS Animation ***/
import 'aos/dist/aos.css';
import AOS from "aos";
import { useEffect } from "react";
import { Helmet } from "react-helmet";


const Home = () => {

    useEffect(() => {
        AOS.init()
    }, [])


    return (
        <div>
            <Helmet>
                <title>Home - Hotel Booking</title>
            </Helmet>
            <Sliders></Sliders>
            <NewsLetter data-aos="fade-up"></NewsLetter>
            <FeaturedRoom></FeaturedRoom>
            <Testimonials></Testimonials>
        </div>
    );
};

export default Home;