import DestinationCard from "@/components/shared/DestinationCard";
import Image from "next/image";

const DestinationsPage = async () => {
    const res = await fetch('http://localhost:5000/destinations');
    const destinationsData = await res.json();

    // console.log(destinationsData)

    return (
        <section className="container mx-auto">
            <div className="text-center py-10">
                <h2 className="font-bold text-5xl mb-4">Explore All Destinations</h2>
                <p>Find your perfect travel experience from our curated collection</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5">
                {
                    destinationsData.map(d => <DestinationCard key={d._id} d={d}></DestinationCard>)
                }
            </div>
        </section>
    );
};

export default DestinationsPage;