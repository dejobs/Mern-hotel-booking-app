import {useQuery} from "react-query";
import * as apiClient from "../api-client";
import {Link} from "react-router-dom";

const MyBookings = () => {
  const {data: userBookings} = useQuery(
    "fetchMyBookings",
    apiClient.fetchMyBookings,
    {
      onError: () => {},
    }
  );

  if (!userBookings || userBookings.length < 1) {
    return (
      <div className="container mx-auto font-bold text-2xl my-6">
        No booking found!
      </div>
    );
  }

  return (
    <div className="container mx-auto my-6 ">
      <div className="flex flex-col gap-5 ">
        <h1 className="text-3xl font-bold">My Bookings</h1>
        <div className="flex flex-col gap-4 space-y-4">
          {userBookings.map((hotel) => (
            <div className="grid grid-cols-1 md:grid-cols-[1fr_3fr] gap-5 border rounded-md border-gray-300 p-5 bg-gray-50">
              <div className="md:w-full md:h-[300px]">
                <img
                  src={hotel.imageUrls[0]}
                  alt="hotel image"
                  className="w-full h-full object-cover object-center rounded-md"
                />
              </div>
              <div className="flex flex-col gap-2 overflow-y-auto max-h-[300px]">
                <div>
                  <Link to={`/detail/${hotel._id}`}>
                    <div className="text-2xl font-bold capitalize ">
                      {hotel.name}
                    </div>
                  </Link>

                  <div className="text-base font-normal text-slate-400">{`${hotel.city}, ${hotel.country}`}</div>
                </div>

                {hotel.bookings.map((booking) => (
                  <div>
                    <div className="flex gap-2 mt-5">
                      <span className="font-bold">Date:</span>
                      <span className="font-normal">
                        {new Date(booking.checkIn).toDateString()} -{" "}
                        {new Date(booking.checkOut).toDateString()}
                      </span>
                    </div>
                    <div className="flex gap-2 mt-1">
                      <span className="font-bold">Guest:</span>
                      <span className="">
                        {booking.adultCount}{" "}
                        {booking.adultCount > 1 ? "adults" : "adult"},{" "}
                        {booking.childCount}
                        {booking.childCount > 1 ? " children" : " children"}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyBookings;
