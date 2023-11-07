import React from 'react';
import { Helmet } from 'react-helmet';

const FAQ = () => {
    return (
        <div className='flex flex-col mx-auto items-center justify-center my-8 w-[90%] md:w-[90%] max-w-[1280px]'>
             <Helmet>
                <title>FAQ - Hotel Booking</title>
            </Helmet>
            <h2 className='text-3xl text-center font-bold my-2'>Frequent Asked Questions - FAQ</h2>
            <p className='text-center mb-6 text-sm'>Get Anwer to the Frequently Askedy Questions by our Client</p>
            <div className='space-y-5'>
                <div className="collapse collapse-plus bg-base-200">
                    <input type="radio" name="my-accordion-3" checked="checked" />
                    <div className="collapse-title text-xl font-medium">
                    1. How do I make a reservation?
                    </div>
                    <div className="collapse-content">
                        <p>To make a reservation, simply download our app, search for your desired hotel, select your check-in and check-out dates, and choose the room type. Follow the prompts to complete the booking process.</p>
                    </div>
                </div>
                <div className="collapse collapse-plus bg-base-200">
                    <input type="radio" name="my-accordion-3" />
                    <div className="collapse-title text-xl font-medium">
                    2. Can I cancel or modify my reservation?
                    </div>
                    <div className="collapse-content">
                        <p>Yes, you can cancel or modify your reservation through the app. Please check the hotel's cancellation policy for any applicable charges.</p>
                    </div>
                </div>

                <div className="collapse collapse-plus bg-base-200">
                    <input type="radio" name="my-accordion-3" />
                    <div className="collapse-title text-xl font-medium">
                    3. What payment methods are accepted?
                    </div>
                    <div className="collapse-content">
                        <p>We accept various payment methods, including credit/debit cards and mobile payment options. Ensure your preferred method is available during the booking process.</p>
                    </div>
                </div>
                <div className="collapse collapse-plus bg-base-200">
                    <input type="radio" name="my-accordion-3" />
                    <div className="collapse-title text-xl font-medium">
                    4. Is my credit card information secure?
                    </div>
                    <div className="collapse-content">
                        <p>
                        We accept various payment methods, including credit/debit cards and mobile payment options. Ensure your preferred method is available during the booking process.
                        </p>
                    </div>
                </div>
                <div className="collapse collapse-plus bg-base-200">
                    <input type="radio" name="my-accordion-3" />
                    <div className="collapse-title text-xl font-medium">
                    5. Can I request additional amenities or services?
                    </div>
                    <div className="collapse-content">
                        <p>
                        Certainly! You can request additional amenities or services, such as airport transfers or extra bedding, during the booking process or by contacting our customer support team.
                        </p>
                    </div>
                </div>
                <div className="collapse collapse-plus bg-base-200">
                    <input type="radio" name="my-accordion-3" />
                    <div className="collapse-title text-xl font-medium">
                    6. What is the check-in/check-out time?
                    </div>
                    <div className="collapse-content">
                        <p>
                        Check-in time is usually after 3:00 PM, and check-out time is before 12:00 PM. Specific timings may vary by hotel, so please check your booking confirmation for accurate details.
                        </p>
                    </div>
                </div>
                <div className="collapse collapse-plus bg-base-200">
                    <input type="radio" name="my-accordion-3" />
                    <div className="collapse-title text-xl font-medium">
                    7. Is breakfast included in the booking?
                    </div>
                    <div className="collapse-content">
                        <p>
                        Some hotels offer complimentary breakfast, while others may charge an additional fee. Check the hotel details and booking confirmation to see if breakfast is included
                        </p>
                    </div>
                </div>
                <div className="collapse collapse-plus bg-base-200">
                    <input type="radio" name="my-accordion-3" />
                    <div className="collapse-title text-xl font-medium">
                    8. Can I book multiple rooms under one reservation?
                    </div>
                    <div className="collapse-content">
                        <p>
                        Yes, you can book multiple rooms under one reservation. During the booking process, specify the number of rooms and occupants, and our system will handle the rest.
                        </p>
                    </div>
                </div>
                <div className="collapse collapse-plus bg-base-200">
                    <input type="radio" name="my-accordion-3" />
                    <div className="collapse-title text-xl font-medium">
                    9. What do I do if I have special requests or preferences?
                    </div>
                    <div className="collapse-content">
                        <p>
                        You can add special requests or preferences, such as a room with a view or a non-smoking room, in the 'Special Requests' section during the booking process. We will do our best to accommodate your preferences.
                        </p>
                    </div>
                </div>
                <div className="collapse collapse-plus bg-base-200">
                    <input type="radio" name="my-accordion-3" />
                    <div className="collapse-title text-xl font-medium">
                    10. How can I view or modify my booking details?
                    </div>
                    <div className="collapse-content">
                        <p>
                        Log in to your account on the app to view or modify your booking details. You can update your reservation dates, add requests, or cancel your booking if needed.
                        </p>
                    </div>
                </div>
                <div className="collapse collapse-plus bg-base-200">
                    <input type="radio" name="my-accordion-3" />
                    <div className="collapse-title text-xl font-medium">
                    11. Is Wi-Fi available at the hotel?
                    </div>
                    <div className="collapse-content">
                        <p>
                        Most hotels offer free Wi-Fi for guests. Check the hotel amenities section on the app or website to confirm if Wi-Fi is available and whether any additional charges apply.
                        </p>
                    </div>
                </div>
                <div className="collapse collapse-plus bg-base-200">
                    <input type="radio" name="my-accordion-3" />
                    <div className="collapse-title text-xl font-medium">
                    12. What should I do if I need to change my reservation dates?
                    </div>
                    <div className="collapse-content">
                        <p>
                        If you need to change your reservation dates, log in to your account, go to the 'My Bookings' section, and select 'Modify Booking.' Follow the prompts to change your check-in and check-out dates.
                        </p>
                    </div>
                </div>
                <div className="collapse collapse-plus bg-base-200">
                    <input type="radio" name="my-accordion-3" />
                    <div className="collapse-title text-xl font-medium">
                    13. Can I book a room for the same day?
                    </div>
                    <div className="collapse-content">
                        <p>
                        Yes, you can book a room for the same day, subject to availability. Use the app to check real-time availability and make a reservation for your desired hotel and room type.
                        </p>
                    </div>
                </div>
                <div className="collapse collapse-plus bg-base-200">
                    <input type="radio" name="my-accordion-3" />
                    <div className="collapse-title text-xl font-medium">
                    14. What is the hotel's cancellation policy?
                    </div>
                    <div className="collapse-content">
                        <p>
                        Each hotel may have a different cancellation policy. You can find the details of the hotel's cancellation policy on the booking page before confirming your reservation. Please review it carefully.
                        </p>
                    </div>
                </div>
                <div className="collapse collapse-plus bg-base-200">
                    <input type="radio" name="my-accordion-3" />
                    <div className="collapse-title text-xl font-medium">
                    15. How do I get directions to the hotel?
                    </div>
                    <div className="collapse-content">
                        <p>
                        Once your booking is confirmed, you will receive an email with the hotel's address and contact information. You can also find directions within the app using integrated maps.
                        </p>
                    </div>
                </div>
                <div className="collapse collapse-plus bg-base-200">
                    <input type="radio" name="my-accordion-3" />
                    <div className="collapse-title text-xl font-medium">
                    16. Can I earn loyalty points with my bookings?
                    </div>
                    <div className="collapse-content">
                        <p>
                        Yes, many hotels offer loyalty programs. Make sure to enter your loyalty program membership number during the booking process to earn points for your stay.
                        </p>
                    </div>
                </div>
                <div className="collapse collapse-plus bg-base-200">
                    <input type="radio" name="my-accordion-3" />
                    <div className="collapse-title text-xl font-medium">
                    17. What should I do if I forget my booking confirmation?
                    </div>
                    <div className="collapse-content">
                        <p>
                        If you forget your booking confirmation, you can log in to your account on the app and access your booking details, including the confirmation number, check-in/out dates, and hotel information.
                        </p>
                    </div>
                </div>
                <div className="collapse collapse-plus bg-base-200">
                    <input type="radio" name="my-accordion-3" />
                    <div className="collapse-title text-xl font-medium">
                    18. Are pets allowed in the hotel?
                    </div>
                    <div className="collapse-content">
                        <p>
                        Pet policies vary by hotel. Check the hotel details on the app to see if pets are allowed. If you plan to bring a pet, make sure to select a pet-friendly room during the booking process.
                        </p>
                    </div>
                </div>
                <div className="collapse collapse-plus bg-base-200">
                    <input type="radio" name="my-accordion-3" />
                    <div className="collapse-title text-xl font-medium">
                    19. Can I book a specific room number?
                    </div>
                    <div className="collapse-content">
                        <p>
                        Most hotels do not allow guests to request specific room numbers due to operational reasons. However, you can often request preferences such as a higher floor or a quiet room during the booking process.
                        </p>
                    </div>
                </div>
                <div className="collapse collapse-plus bg-base-200">
                    <input type="radio" name="my-accordion-3" />
                    <div className="collapse-title text-xl font-medium">
                    20. What should I do if I encounter issues during my stay?
                    </div>
                    <div className="collapse-content">
                        <p>
                        If you encounter any issues during your stay, please contact the hotel's front desk immediately. If the issue is not resolved to your satisfaction, you can also reach out to our customer support team for assistance.
                        </p>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default FAQ;