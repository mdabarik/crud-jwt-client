
const Slider = ({slider: image}) => {
    return (
        <div className="h-[500px] relative rounded-lg">
            <img className="h-[500px] w-full object-cover rounded-lg" src={image} alt="image" />
        </div>
    );
};

export default Slider;