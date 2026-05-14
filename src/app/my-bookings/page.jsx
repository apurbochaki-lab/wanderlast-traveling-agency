import DeleteBooking from "@/components/DeleteBooking";
import { handleCancelBooking } from "@/lib/actions";
import { auth } from "@/lib/auth";
import { Button } from "@heroui/react";
import { Calendar, Eye, Trash } from "lucide-react";
import { headers } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import { FaLocationDot } from "react-icons/fa6";

const MyBookingPage = async () => {

    const session = await auth.api.getSession({
        headers: await headers()
    })
    const user = session?.user;
    // console.log(user)

    const res = await fetch(`http://localhost:5000/bookings/${user?.id}`);
    const bookings = await res.json();
    console.log(bookings)

    // const handleCancelBooking = async (bookingId) => {
    //     'use server';
    //     const res = await fetch(`http://localhost:5000/bookings/${bookingId}`, {
    //         method: 'DELETE'
    //     });
    //     const data = await res.json();
    //     console.log(data)
    // }

    return (
        <div className="py-10 container mx-auto">
            <h2 className="text-3xl font-bold text-center">My Bookings</h2>

            <div className="mt-10 space-y-5">
                {bookings.length === 0 && <h2 className="text-center text-3xl text-muted font-semibold">No Bookings Here!</h2> }

                {
                    bookings.map(booking => <div key={booking._id} className="flex gap-5 border p-5 rounded-lg shadow-sm max-w-[1200px] mx-auto ">

                        <div>
                            <Image src={booking?.imageUrl} alt={booking?.destinationName}
                                width={300} height={200} />
                        </div>

                        <div className="space-y-2">
                            <h2 className="text-2xl font-semibold">{booking?.destinationName}</h2>
                            <h2 className="flex items-center gap-2 font-semibold text-green-600">
                                <FaLocationDot />
                                {booking?.country}
                            </h2>
                            <h2 className="flex items-center gap-2 font-semibold text-muted">
                                <Calendar />
                                Departure : {new Date(booking?.departureDate).toLocaleDateString("en-US", {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric"
                                })}
                            </h2>
                            <h2 className="font-semibold">Booking Id : {booking?._id}</h2>
                            <h2 className="text-3xl font-bold text-cyan-500">${booking?.price}</h2>
                        </div>

                        <div className="ml-auto mt-auto flex items-center gap-5">

                            {/* <form action={async () => {
                                'use server';
                                await handleCancelBooking(booking._id)
                            }}>
                                <Button type="submit" variant="outline" className="rounded-none border border-red-500 text-red-500 font-semibold">
                                    <Trash />Cancel
                                </Button>
                            </form> */}

                            <DeleteBooking bookingId={booking._id}></DeleteBooking>

                            <Link href={`/destinations/${booking.destinationId}`}>
                                <Button variant="outline" className="rounded-none font-semibold bg-cyan-500 text-white">
                                    <Eye />View
                                </Button>
                            </Link>
                        </div>
                    </div>)
                }
            </div>
        </div>
    );
};

export default MyBookingPage;