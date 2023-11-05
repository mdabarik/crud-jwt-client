
const RoomCard = ({room}) => {
    const {price_per_night, room_images, reviews, reviewCount} = room || {};
    return (
        <div>
             <div className="max-w-[300px] h-[200px] bg-gray-400"></div>
        </div>
    );
};

export default RoomCard;