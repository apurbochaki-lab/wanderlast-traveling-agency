'use server';
import { revalidatePath } from "next/cache";

export const handleCancelBooking = async (bookingId) => {
    const res = await fetch(`http://localhost:5000/bookings/${bookingId}`, {
        method: 'DELETE'
    });
    const data = await res.json();

    // Need to revalidate
    revalidatePath('/my-bookings')
    console.log(data)
}