import * as apiClient from "../api-client";
import {useQuery} from "react-query";
import LatestDestinationCard from "../components/LatestDestinationCard";

const Home = () => {
  const {data: hotels} = useQuery("fetchHotelsFromLastUpdated", () =>
    apiClient.fetchHotelsFromLastUpdated()
  );

  const topRowHotels = hotels?.slice(0, 2) || [];
  const bottomRowHotels = hotels?.slice(2) || [];
  return (
    <div className="space-y-3 my-8">
      <h2 className="text-3xl font-bold">Lastest Destinations</h2>
      <p>Most recent destinations added by our hosts</p>
      <div className="grid gap-4">
        <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
          {topRowHotels.map((hotel) => (
            <LatestDestinationCard hotel={hotel} />
          ))}
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          {bottomRowHotels.map((hotel) => (
            <LatestDestinationCard hotel={hotel} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;