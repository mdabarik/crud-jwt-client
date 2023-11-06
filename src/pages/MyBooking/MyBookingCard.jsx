import { useState } from "react";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

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


const MyBookingCard = ({card}) => {

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
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    const handleUpdateDate = (id) => {
        toast.success('Updated successfully!')
    }

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


    return (
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
    );
};

export default MyBookingCard;