import Image from "next/image";
import Link from "next/link";
import { FaCalendarAlt } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { LuArrowUpRight } from "react-icons/lu";

const DestinationCard = ({ d }) => {
    const { _id, category, country, departureDate, description, destinationName, duration, imageUrl, price } = d;
    return (
        <div className="mt-10 max-w-[410px] mx-auto p-5 border-2 rounded-lg shadow-sm bg-white">
            <Image src={imageUrl} alt={destinationName} width={400} height={400} className="mx-auto rounded-lg h-50 object-cover border-2 shadow-sm"></Image>

            <div className="mt-5 space-y-2">
                <span className="flex items-center gap-2">
                    <FaLocationDot />
                    <h2 className="font-semibold text-muted">{country}</h2>
                </span>

                <div className="flex justify-between">
                    <h2 className=" font-semibold text-xl">{destinationName}</h2>
                    <h2 className="font-semibold text-xl">${price}<span className="text-lg text-muted">/Person</span></h2>
                </div>

                <span className="flex items-center gap-2">
                    <FaCalendarAlt />
                    <p className=" font-semibold text-muted">{duration}</p>
                </span>

                <Link href={`/destinations/${_id}`} className="flex items-center gap-1 text-xl font-semibold text-blue-500">BOOK NOW <LuArrowUpRight /></Link>
            </div>
        </div>
    );
};

export default DestinationCard;