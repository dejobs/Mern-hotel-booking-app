import {useParams} from "react-router-dom";
import * as apiClient from "../api-client";
import {useQuery} from "react-query";
import {AiFillStar} from "react-icons/ai";
import GuestInfoForm from "../forms/guestInfoForm/GuestInfoForm";

const Detail = () => {
  const {hotelId} = useParams();

  const {data: hotel} = useQuery(
    "fetchHotel",
    () => apiClient.fetchHotelById(hotelId || ""),
    {enabled: !!hotelId}
  );

  if (!hotel) {
    return <></>;
  }

  return (
    <div className="container mx-auto space-y-6 my-9">
      <div>
        <span className="flex">
          {Array.from({length: hotel.starRating}).map(() => (
            <AiFillStar className="fill-yellow-400" />
          ))}
        </span>
        <h1 className="text-3xl font-bold">{hotel.name}</h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-4">
        {hotel.imageUrls.map((image) => (
          <div key={image} className="h-[300px]">
            <img
              src={image}
              alt={hotel.name}
              className="rounded-md w-full h-full object-cover object-center hover:scale-105  duration-300 "
            />
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-2">
        {hotel.facilities.map((facility) => (
          <div className="border border-slate-300 rounded-sm p-3">
            {facility}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr]  gap-2">
        <div className="whitespace-pre-line">{hotel.description}</div>
        <div className="h-fit">
          <GuestInfoForm
            hotelId={hotel._id}
            pricePerNight={hotel.pricePerNight}
          />
        </div>
      </div>
    </div>
  );
};

export default Detail;
