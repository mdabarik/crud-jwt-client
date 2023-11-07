import { useState } from "react";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { CiSquareRemove } from "react-icons/ci";
import { MdOutlineDateRange } from "react-icons/md";
import { MdOutlineRateReview } from "react-icons/md";
import { GrUpdate } from "react-icons/gr";
import { RxUpdate } from "react-icons/rx";

/**** Modal ****/
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';

/**** DatePicker *****/
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useEffect } from "react";
import { useContext } from "react";
import { GlobalContext } from "../../providers/GlobalProvider";
import { Link } from "react-router-dom";
import useAxios from "../../hooks/useAxios";
import moment from "moment";



const MyBookingCard = ({ card, myBooking, setMyBooking }) => {
    const [selDate, setSelDate] = useState("");

    const { _id, roomId, roomDescription, pricePerNight, bookingDate, roomImage, userEmail } = card || {};
    const [bookDate, setBookDate] = useState(bookingDate);


    const currentDate = new Date().toISOString().split('T')[0];
    const [selectedDate, setSelectedDate] = useState('');

    const handleDateChange = (event) => {
        setSelectedDate(event.target.value);
        setSelDate(event.target.value + "");
    };


    const { user } = useContext(GlobalContext);
    const [value, setValue] = useState(dayjs('2022-04-17'));
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        miWidth: 600,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    console.log(selDate);


    const [disable, setDisable] = useState(true);
    const handleUpdateDate = () => {
        const newDate = selDate;
        console.log(newDate);
        const id = _id;
        fetch("http://localhost:5555/update-date", {
            method: 'PATCH',
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({ newDate, userEmail, id })
        })
            .then(response => response.json())
            .then(res => {
                if (res.modifiedCount > 0) {
                    toast.success("Updated successfully");
                    setBookDate(newDate + "");
                    setDisable(true)
                } else {
                    toast.error("Already updated with the selected date")
                }
                console.log(res);
            })
            .catch(err => {
                console.log(err);
            })

        // toast.success('Updated successfully!')
    }

    // const [availableRoom, setAvailableRoom] = useState(0)
    const handleDateChange1 = (e) => {

        let availableRoom = 10; // default value
        // /api/v1/rooms/:id
        fetch(`http://localhost:5555/api/v1/rooms/${roomId}`, {
            credentials: 'include'
        })
            .then(res => res.json())
            .then(data => {
                availableRoom = data.available_rooms
                console.log('data on datechange', data.available_rooms);
            })


        const date = e.target.value;
        console.log(date);
        fetch(`http://localhost:5555/api/v1/booking?date=${date}&id=${roomId}`, {
            credentials: 'include'
        })
            .then(response => response.json())
            .then(res => {
                const remaining = availableRoom - res.result.length;
                console.log(remaining);
                console.log('total room', availableRoom, 'room in book', res.result.length, 'diff', remaining);
                console.log(res);
                if (remaining != 0) {
                    toast.success(`Available on ${date}`)
                    setDisable(false)
                } else {
                    toast.error('Not available')
                    setDisable(true)
                }
            })
            .catch(err => {
                console.log(err);
                setDisable(true);
            })
        setDisable(true)
    }

    const handleCancel = () => {

        // const currentTime = moment(new Date()); // Current time
        // const booked = moment(currentTime).subtract(1, 'days')
        // const futureTime = moment(validation); // A future time to compare with, replace it with your desired time

        // if (currentTime.isBefore(futureTime, 'day')) {
        //     console.log('valid');
        // } else if (currentTime.isSame(futureTime, 'day')) {
        //     console.log('valid');
        // } else {
        //     console.log('invalid');
        //     setDisabled(true)
        //     setAvailable("notavailable");
        //     return;
        // }

        const validCancelDate = moment(bookDate).subtract(1, 'days')._d;
        const currentTime = moment(new Date())
        console.log('cancel:', validCancelDate, 'curr:', currentTime);
        if ((currentTime.isBefore(validCancelDate, 'day'))) {
            console.log('can cancel');
        } else {
            console.log('cant cancel');
            toast.error('You can not cancel this booking. Tomorrow is your booking date');
            return;
        }





        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Confirm'
        }).then((result) => {
            if (result.isConfirmed) {
                // http://localhost:5555/api/v1/review/delete?userEmail=mdabarik19@gmail.com&roomId=141808iufofjaldkfjh
                fetch(`http://localhost:5555/delete-review/${_id}`, {
                    method: 'DELETE',
                    credentials: 'include'
                })
                    .then(r => r.json())
                    .then(res => {
                        console.log(res);
                        if (res.deletedCount > 0) {
                            toast.success('Deleted successfully');
                            const filter = myBooking.filter(book => book._id != _id);
                            setMyBooking(filter)
                        }
                    })


            }
        })
    }
    // /my-booking/review/add/:id

    return (
        <div className="flex flex-col items-center justify-between md:flex-row border-[1.5px] rounded-lg p-3 shadow-lg">
            <div className="flex flex-col md:flex-row w-full text-center md:text-left gap-6 md:w-2/3">

                <div className="h-[200px] w-full md:w-[300px] bg-gray-400 rounded-lg" >
                    <img className="h-[200px] w-full md:w-[300px] rounded-lg" src={roomImage} alt="room img" />
                </div>
                <div className="space-y-2 md:space-y-3">
                    <Link to={`/rooms/${roomId}`} className="text-xl md:text-2xl">{roomDescription}</Link>
                    <p>Price(One Night): ${pricePerNight}</p>
                    {/* <p>Booking date: {bookDate}</p> */}
                    <p>Booking: {moment(bookDate).format('ll')}</p>
                    <Link to={`/my-booking/review/add/${roomId}`} className="btn btn-primary">
                        <MdOutlineRateReview className="text-xl"></MdOutlineRateReview>
                        <span>Your Review</span>
                    </Link>
                </div>
            </div>
            <div className="space-y-4 w-full md:w-1/3">
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <div className="flex flex-col space-y-5 my-10">
                            <h2 className="text-2xl font-bold text-center">Update Booking Date</h2>
                            <div>

                                <div className="felx items-center justify-center text-center rounded-lg py-3 px-5 border-2">
                                    <input
                                        type="date"
                                        id="datePicker"
                                        name="datePicker"
                                        value={selectedDate}
                                        onChange={(e) => {
                                            handleDateChange(e);
                                            handleDateChange1(e)

                                        }}
                                        min={currentDate}
                                    />
                                </div>
                                {/* <input onChange={(e) => setSelDate(e.target.value + "")} type="date" /> */}
                            </div>
                            {
                                disable ?
                                    <button className="btn btn-secondary text-cente" disabled>
                                        <RxUpdate className="text-xl"></RxUpdate>
                                        <span>Update Date</span>
                                    </button> :
                                    <button onClick={() => handleUpdateDate()} className="btn btn-secondary text-center">
                                        <RxUpdate className="text-xl text-white"></RxUpdate>
                                        <span>Update Date</span>
                                    </button>
                            }

                        </div>

                    </Box>
                </Modal>
                <div className="flex  flex-col items-center justify-center mt-5 md:mt-0 md:justify-end overflow-hidden">
                    <Button className="h-[100%]" onClick={handleOpen}>
                        <span className="bg-[orange] hover:bg-[#c68202] border-none text-white rounded-lg btn btn-primary">
                            <MdOutlineDateRange className="text-xl"></MdOutlineDateRange>
                            <span className="">Update Date</span>
                        </span>
                        
                    </Button>
                    <button onClick={() => handleCancel(1)} className="btn my-4 md:my-0 bg-[orangered] hover:bg-[#b93201] text-white font-bold">
                        <CiSquareRemove className="text-xl"></CiSquareRemove>
                        <span>Cancel booking</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MyBookingCard;