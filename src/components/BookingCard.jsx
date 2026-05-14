'use client'

import { authClient } from "@/lib/auth-client";
import { Button, DateField, Label } from "@heroui/react";
import { useState } from "react";
import { BiRightArrow } from "react-icons/bi";
import { FaCheck } from "react-icons/fa";
import { toast } from "react-toastify";

const BookingCard = ({ destination }) => {
    // Destination Info
    const {_id, price, destinationName, imageUrl, country } = destination;

    // User Info
    const {data: session} = authClient.useSession()
    const user = session?.user;
    // console.log(user)

    // DepartureDate
    const [date, setDate] = useState(null)
    // console.log(new Date(date))

    // Booking Func
    const handleBooking = async() => {
        const bookingData = {
            userName: user?.name,
            userImage: user?.image,
            userId: user?.id,
            destinationId: _id,
            destinationName,
            country,
            imageUrl,
            price,
            departureDate : new Date(date)
        }

        const res = await fetch('http://localhost:5000/bookings', {
            method: 'POST',
            headers: {
                'content-type' : 'application/json'
            },
            body: JSON.stringify(bookingData)
        })
        const data = await res.json();

        console.log(data)
        toast.success(`You booked for ${destinationName} successfully!`)
    }

    return (
        <div className="w-[400px] space-y-1 border p-5 rounded-lg shadow-sm">
            <h2 className="text-muted">Starting from</h2>
            <h2 className="text-cyan-500 text-3xl font-bold">${price}</h2>
            <p className=" text-muted">per person</p>

            <DateField isRequired className="w-[256px] mt-7 w-full" name="date" onChange={setDate}>
                <Label>Departure Date</Label>
                <DateField.Group className={"rounded-none "}>
                    <DateField.Input>{(segment) => <DateField.Segment segment={segment} />}</DateField.Input>
                </DateField.Group>
            </DateField>

            <Button onClick={handleBooking} className={"rounded-none w-full p-5.5 my-5 text-[16px] font-bold"}>Book Now <BiRightArrow/></Button>

            <div>
                <p className="flex items-center gap-2">
                    <FaCheck className="text-green-500"/> Free cancellation up to 7 days
                </p>
                <p className="flex items-center gap-2">
                    <FaCheck className="text-green-500"/> Travel insurance included
                </p>
                <p className="flex items-center gap-2">
                    <FaCheck className="text-green-500"/> 24/7 customer support
                </p>
            </div>
        </div>
    );
};

export default BookingCard;