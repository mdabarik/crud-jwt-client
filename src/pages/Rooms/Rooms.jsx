
const Rooms = () => {
    return (
        <div className="my-8">
            {/* Filter Rooms */}
            <div>
                <h2 className="text-2xl font-bold">Filter Rooms</h2>
                <div>
                    <p>Sort By Range:</p>
                    <select className="select select-bordered w-full max-w-xs">
                        <option disabled selected>Select One</option>
                        <option>$0-$100</option>
                        <option>$101-$200</option>
                        <option>$201-$400</option>
                        <option>$401+</option>
                    </select>
                </div>
                <div>
                    <p>Sort By Price:</p>
                    <select className="select select-bordered w-full max-w-xs">
                        <option disabled selected>Select One</option>
                        <option>Low to High</option>
                        <option>High to Low</option>
                    </select>
                </div>
            </div>
           {/* Rooms */}
           <div className="my-8 border-2">
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

export default Rooms;