import AboutUsLogo from "../../assets/aboutUsLogo.png";
import { Helmet } from "react-helmet";


const AboutUs = () => {
    return (
        <div className='flex flex-col items-center justify-center my-8 w-[90%] md:w-[80%] mx-auto max-w-[1280px]'>
            <Helmet>
                <title>About Us - Hotel Booking</title>
            </Helmet>
            <h2 className='text-3xl text-center font-bold my-2'>About Us</h2>
            <p className='text-center mb-6 text-sm'>Your Trusted Partner in Exceptional Stays</p>
            <div>
                <div className="w-full flex items-center justify-center my-8">
                    <img className="h-[300px] w-[300px] object-cover rounded-full" src={AboutUsLogo} alt="" />
                </div>
                <div>
                    <p>
                        Welcome to [Your Hotel Booking App Name], where exceptional stays begin. We take pride in providing travelers with a seamless and enjoyable hotel booking experience. Founded with a passion for travel and a commitment to customer satisfaction, our platform connects you with a world of carefully curated hotels, ensuring your stay is comfortable, memorable, and hassle-free.\n\nAt [Your Hotel Booking App Name], we believe in the power of exploration and the joy of discovery. Our team of dedicated professionals works tirelessly to source the finest hotels, resorts, and accommodations across the globe. Whether you're planning a relaxing beach getaway, a business trip, or an adventurous city escape, we have the perfect lodging options for every occasion.\n\nWhat sets us apart is our unwavering dedication to quality, convenience, and personalized service. We understand the importance of a great stay, and we're here to make sure you find the ideal place to call your home away from home. With user-friendly features, secure booking processes, and a vast selection of hotels, we simplify your travel planning and enhance your overall experience.\n\nAt [Your Hotel Booking App Name], your satisfaction is our priority. We are committed to excellence, and we continuously strive to exceed your expectations. Thank you for choosing us as your trusted partner in travel. Join us on this exciting journey, and let's create unforgettable travel memories together.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AboutUs;