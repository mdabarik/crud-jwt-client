import { useState } from "react";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

/**** DatePicker *****/
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

/**** Modal ****/
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';




const MyBooking = () => {

    // datepicker
    const [value, setValue] = useState(dayjs('2022-04-17'));

    // modal
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };


    const handleCancel = (id) => {
        // console.log(id);
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
                //   Swal.fire(
                //     'Deleted!',
                //     'Your file has been deleted.',
                //     'success'
                //   )
                toast.success('Successfully deleted!')

            }
        })
    }

    const handleUpdateDate = (id) => {
        toast.success('Updated successfully!')
    }

    return (
        <div className="my-10">
            <div>
                <h1 className="text-2xl font-bold text-center mb-4">My Booking</h1>
                <div>
                    <div className="flex flex-col items-center justify-between md:flex-row border-[1.5px] rounded-lg p-3 shadow-lg">
                        <div className="flex gap-6">
                            <div className="h-[200px] w-[300px] bg-gray-400 rounded-lg" >
                                {/* img tag */}
                            </div>
                            <div className="space-y-3">
                                <h3 className="text-2xl">Deluxe King Room with Proof Access</h3>
                                <p>Price(One Night): $120</p>
                                <p>Booking date: 12 Dec 2023</p>
                                <button className="btn btn-primary">Write a Review</button>
                            </div>
                        </div>
                        <div className="space-y-4">
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
                                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                <DemoContainer components={['DatePicker', 'DatePicker']}>
                                                    <DatePicker
                                                        label="Update Date"
                                                        value={value}
                                                        onChange={(newValue) => setValue(newValue)}
                                                    />
                                                </DemoContainer>
                                            </LocalizationProvider>
                                        </div>
                                        <button onClick={() => handleUpdateDate()} className="btn btn-secondary text-center">Update Date</button>
                                    </div>

                                </Box>
                            </Modal>
                            <Button className="btn btn-primary" onClick={handleOpen}>Update Date</Button>
                            <button onClick={() => handleCancel(1)} className="btn w-full btn-error">Cancel Booking</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="my-10">
                <h1 className="text-2xl font-bold text-center my-3">Cancelled Booking</h1>
                <div className="border-[1.5px] rounded-lg p-3 shadow-lg flex justify-between">
                    <div className="flex gap-6">
                        <div className="h-[200px] w-[300px] bg-gray-400 rounded-lg" >
                            {/* img tag */}
                        </div>
                        <div className="space-y-2">
                            <h3 className="text-2xl">Deluxe King Room with Proof Access</h3>
                            <p>Price(One Night): $120</p>
                            <p>Cancelled at: 12 Dec 2023</p>
                        </div>
                    </div>
                    <div>
                        <p>Status:</p>
                        <p className="bg-[red] text-white px-3 py-1 rounded-md flex-1">Cancelled</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyBooking;