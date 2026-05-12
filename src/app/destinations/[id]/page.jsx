import { DeleteAlert } from "@/components/DeleteAlert";
import { EditModal } from "@/components/EditModal";
import Image from "next/image";
import { FaCalendarAlt } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";

const DestinationDetailsPage = async ({ params }) => {
    const { id } = await params;
    // console.log(id)

    const res = await fetch(`http://localhost:5000/destinations/${id}`);
    const data = await res.json()
    const { _id, category, country, departureDate, description, destinationName, duration, imageUrl, price } = data;
    // console.log(data)

    return (
        <section className="container mx-auto">
            <h2 className="text-center py-8 text-5xl font-semibold">Destination Details</h2>

            <div className="flex items-center gap-3 justify-end m-5">
                <EditModal destination={data}></EditModal>
                <DeleteAlert destination={data}></DeleteAlert>
            </div>

            <div className="m-5">
                <Image src={imageUrl} alt={destinationName} height={500} width={1000} className="mx-auto rounded-lg border-2 shadow-sm w-full h-180 object-cover"></Image>

                <div className="space-y-3 mt-10 border p-5 rounded-lg shadow-sm">
                    <span className="flex items-center gap-2 text-lg">
                        <FaLocationDot />
                        <h2 className="font-semibold text-muted">{country}</h2>
                    </span>

                    <div>
                        <h2 className="text-2xl font-semibold">{destinationName}</h2>
                        <span className="flex items-center gap-2">
                            <FaCalendarAlt />
                            <p className=" font-semibold text-muted">{duration}</p>
                        </span>
                    </div>

                    <div>
                        <h2 className="text-2xl font-semibold">Overview</h2>
                        <p>{description}</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default DestinationDetailsPage;