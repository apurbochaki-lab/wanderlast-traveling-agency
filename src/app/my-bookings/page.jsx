import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Image from "next/image";

const MyBookingPage = async() => {

    const session = await auth.api.getSession({
        headers: await headers()
    })
    const user = session?.user;
    // console.log(user)

    const res = await fetch(`http://localhost:5000/bookings/${user?.id}`);
    const data = await res.json();
    console.log(data)

    return (
        <div className="py-10 container mx-auto">
            <h2 className="text-3xl font-bold text-center">My Bookings</h2>

            <div>
                {
                    data.map(d => <div key={d._id} className="flex gap-5 mt-10">
                            <div>
                                <Image src={d?.imageUrl} alt={d?.destinationName}
                                width={300} height={200}/>
                            </div>

                            <div>
                                <h2>Destination : {d?.destinationName}</h2>
                                <h2>Country : {d?.country}</h2>
                            </div>
                    </div> )
                }
            </div>
        </div>
    );
};

export default MyBookingPage;