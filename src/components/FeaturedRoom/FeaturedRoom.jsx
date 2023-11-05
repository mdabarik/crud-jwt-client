
const FeaturedRoom = () => {
    return (
        <div className="my-8">
            {/* Rooms */}
            <div className="my-8">
                <div className="flex flex-col items-center justify-center my-4">
                    <h2 className="text-2xl font-bold text-center">Featured Rooms</h2>
                    <p className="text-center">Get the best deals and suitable affordable rooms</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="max-w-[300px] h-[200px] bg-gray-400"></div>
                    <div className="max-w-[300px] h-[200px] bg-gray-400"></div>
                    <div className="max-w-[300px] h-[200px] bg-gray-400"></div>
                    <div className="max-w-[300px] h-[200px] bg-gray-400"></div>
                    <div className="max-w-[300px] h-[200px] bg-gray-400"></div>
                </div>
            </div>
        </div>
    );
};

export default FeaturedRoom;