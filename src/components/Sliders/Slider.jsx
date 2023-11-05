
const Slider = ({slider}) => {
    const { title, subtitle, image } = slider || {};

    return (
        <div className="h-[500px] relative">
            <img className="w-full h-full object-cover" src={image} alt="image" />
            <div className="h-[500px] w-full bg-[#00000090] absolute top-0 left-0 flex  flex-col items-center justify-center space-y-5">
                <h1 className="text-center text-white text-2xl md:text-3xl lg:text-4xl font-bold">{title}</h1>
                <p className="text-sm md:text-lg text-center text-white">{subtitle}</p>
                <button className="btn btn-secondary text-center" >Buy Now</button>
            </div>
        </div>
    )
};

export default Slider;