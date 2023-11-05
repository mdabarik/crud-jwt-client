
const Slider = ({slider}) => {
    const { image } = slider || {};
    return (
        <div className="h-[500px] relative">
            <img className="h-[500px] object-cover" src={image} alt="image" />
        </div>
    );
};

export default Slider;