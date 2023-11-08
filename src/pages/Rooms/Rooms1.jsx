import { useEffect, useState } from "react";
import useAxios from "../../hooks/useAxios";
import RoomCard from "../../components/RoomCard/RoomCard";
/*** AOS Animation ***/
import 'aos/dist/aos.css';
import AOS from "aos";
import { Helmet } from "react-helmet";

/**---------Range Dynamic----------*/
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
/* Tab */
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';


const Rooms1 = () => {
    const axios = useAxios();
    const [range, setRange] = useState('');
    const [sortOrder, setSortOrder] = useState('')
    const [rooms, setRooms] = useState([]);


    useEffect(() => {
        AOS.init()
    }, [])


    /**---------------Range Dynamic-------------- */
    function valuetext(value) {
        return `${value}`;
    }
    const minDistance = 1;
    const [value1, setValue1] = useState([0, 1500]);
    const handleChange1 = (event, newValue, activeThumb) => {
        if (!Array.isArray(newValue)) {
            return;
        }

        console.log(typeof event.target.value[0]);
        const low = event.target.value[0];
        const high = event.target.value[1];
        const curRange = low + "-" + high;
        console.log(curRange);
        setRange(curRange);

        if (activeThumb === 0) {
            setValue1([Math.min(newValue[0], value1[1] - minDistance), value1[1]]);
        } else {
            setValue1([value1[0], Math.max(newValue[1], value1[0] + minDistance)]);
        }
    };


    useEffect(() => {
        // https://crud-jwt-server.vercel.app/api/v1/rooms?filterByPrice=0-100&sortField=price_per_night&sortOrder=asc
        const url = `/api/v1/rooms?filterByPrice=${range}&sortField=price_per_night&sortOrder=${sortOrder}`;
        console.log(url);
        axios.get(url, { withCredentials: true })
            .then(res => {
                setRooms(res.data);
            })
    }, [range, sortOrder])


    const showAll = () => {
        setValue1([0, 1500]);
        setRange("0-1500");
    }

    return (
        <div className="my-8 w-[90%] md:w-[90%] max-w-[1280px] mx-auto" data-aos="zoom-in">
            <Helmet>
                <title>Rooms - Hotel Booking</title>
            </Helmet>
            <h1 className="text-2xl md:text-3xl font-bold text-center mt-4 mb-4">All Available Rooms</h1>
            {/* Filter Rooms */}
            <div className="">
                <h2 className="text-2xl font-bold mb-4">Filter Rooms</h2>
                <div className="w-[100%] md:w-[70%] lg:w-[60%] min-h-[130px]">
                    <Tabs>
                        <TabList>
                            <Tab onClick={() => showAll()} >Filter by Range Slider</Tab>
                            <Tab onClick={() => showAll()} >Filter by Range Field</Tab>
                        </TabList>

                        <TabPanel>
                            <div className='min-w-[200px] max-w-[400px] bg-white p-4 drop-shadow-lg'>
                                <Slider
                                    getAriaLabel={() => 'Minimum distance'}
                                    value={value1}
                                    max={1500}
                                    onChange={handleChange1}
                                    valueLabelDisplay="auto"
                                    getAriaValueText={valuetext}
                                // disableSwap
                                />
                            </div>
                        </TabPanel>
                        <TabPanel>
                            <div className="p-4 bg-white drop-shadow-lg">
                                <select onChange={(e) => {
                                    setRange(e.target.value)
                                }} className="select select-bordered w-full max-w-xs">
                                    <option value={""} selected>Show All</option>
                                    <option value="0-100">$0-$100</option>
                                    <option value="101-200">$101-$200</option>
                                    <option value="201-400">$201-$400</option>
                                    <option value="401-500">$401-$500+</option>
                                    <option value="501-1500">$500+</option>
                                </select>
                            </div>
                        </TabPanel>
                    </Tabs>
                </div>
                <div className="my-4">
                    <div>
                        <p>Sort By Price:</p>
                        <select onChange={(e) => { setSortOrder(e.target.value) }} className="select select-bordered w-full max-w-xs">
                            <option value={""} selected>No Sort</option>
                            <option value={"asc"}>Low to High</option>
                            <option value={"desc"}>High to Low</option>
                        </select>
                    </div>
                </div>
                {/* Rooms */}
                <div className="my-8">
                    {
                        rooms.length == 0 ?
                            <h2 className="text-center text-3xl font-bold text-red-700">No rooms found</h2> :
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                {
                                    rooms.map(room => <RoomCard key={room._id} room={room}></RoomCard>)
                                }
                            </div>
                    }
                </div>
            </div>
        </div>);
};

export default Rooms1;