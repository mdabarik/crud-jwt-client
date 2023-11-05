import FeaturedRoom from "../../components/FeaturedRoom/FeaturedRoom";
import NewsLetter from "../../components/NewsLetter/NewsLetter";
import Sliders from "../../components/Sliders/Sliders";
import Testimonials from "../../components/Testimonials/Testimonials";

const Home = () => {
    return (
        <div>
            <Sliders></Sliders>
            <NewsLetter></NewsLetter>
            <FeaturedRoom></FeaturedRoom>
            <Testimonials></Testimonials>
        </div>
    );
};

export default Home;