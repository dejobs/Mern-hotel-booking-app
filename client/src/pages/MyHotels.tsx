import {Link} from "react-router-dom";
import {useQuery} from "react-query";
import * as apiClient from "../api-client";
import {toast} from "react-toastify";
import {BsBuilding, BsMap} from "react-icons/bs";
import {BiHotel, BiMoney, BiStar} from "react-icons/bi";

const MyHotels = () => {
  const {data: hotelData} = useQuery("fetchMyHotels", apiClient.fetchMyhotels, {
    onError: async () => {
      toast.error("failed to load", {className: "toast-message-error"});
    },
  });

  if (!hotelData) {
    return <span>No Hotel Found</span>;
  }

  return (
    <div className="container mx-auto space-y-5 my-6">
      <div className="flex justify-between">
        <h1 className="text-3xl font-bold">My hotels</h1>
        <Link
          to="/add-hotel"
          className="bg-teal-600 text-white text-xl font-bold p-2 hover:bg-teal-500"
        >
          Add hotel
        </Link>
      </div>
      <div className="grid grid-cols-1 gap-6">
        {hotelData.map((hotel) => (
          <div className="flex flex-col justify-between border border-slate-300 rounded-lg p-6 gap-3">
            <h2 className="text-xl font-semibold">{hotel.name}</h2>
            <div className="text-lg font-normal whitespace-pre-line">
              {hotel.description}
            </div>
            <div className="grid grid-cols-5 gap-2 text-sm text-slate-800 flex-wrap">
              <div className="border border-slate-300 rounded-sm p-2  flex items-center gap-1 whitespace-nowrap">
                <BsMap />
                {`${hotel.city}, ${hotel.country}`}
              </div>
              <div className="border border-slate-300 rounded-sm p-2  flex items-center gap-1 whitespace-nowrap">
                <BsBuilding />
                {hotel.type}
              </div>
              <div className="border border-slate-300 rounded-sm p-2  flex items-center gap-1 whitespace-nowrap">
                <BiMoney />
                {hotel.pricePerNight} per night
              </div>
              <div className="border border-slate-300 rounded-sm p-2  flex items-center gap-1 truncate whitespace-nowrap ">
                <BiHotel />
                {`${hotel.adultCount} ${
                  hotel.adultCount > 1 ? "adults" : "adult"
                }, ${hotel.childCount} ${
                  hotel.adultCount > 1 ? "children" : "child"
                }`}
              </div>
              <div className="border border-slate-300 rounded-sm p-2  flex items-center gap-1 whitespace-nowrap">
                <BiStar />
                {hotel.starRating} Star rating
              </div>
            </div>
            <span className="flex justify-end">
              <Link
                to={`/edit-hotel/${hotel._id}`}
                className=" px-4 py-2 rounded bg-teal-600 text-white text-xl font-bold  hover:bg--500"
              >
                View details
              </Link>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyHotels;
