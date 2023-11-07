import FeaturedRoom from "../../components/FeaturedRoom/FeaturedRoom";
import NewsLetter from "../../components/NewsLetter/NewsLetter";
import Sliders from "../../components/Sliders/Sliders";
import Testimonials from "../../components/Testimonials/Testimonials";
/*** AOS Animation ***/
import 'aos/dist/aos.css';
import AOS from "aos";
import { useEffect } from "react";
import { Helmet } from "react-helmet";
/* solve any scrollbar of aos package using overflowhidden */

const Home = () => {

    useEffect(() => {
        AOS.init()
    }, [])


    return (
        <div className="w-[85%] md:w-[100%] mx-auto">
            <Helmet>
                <title>Home - Hotel Booking</title>
            </Helmet>
            <div className="w-[vw]">
                <div className="lg:max-w-[1280px] mx-auto">
                <Sliders></Sliders>
                </div>
                <div className="md:w-[80%] lg:max-w-[1280px] mx-auto">
                    <NewsLetter></NewsLetter>
                    <FeaturedRoom></FeaturedRoom>
                    <Testimonials></Testimonials>
                </div>
            </div>
        </div>
    );
};

export default Home;