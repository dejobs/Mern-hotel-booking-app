import {HotelType} from "../../../backend/shared/types";

type Props = {
  checkIn: Date;
  checkOut: Date;
  childCount: number;
  adultCount: number;
  numberOfNights: number;
  hotel: HotelType;
};

const BookingDetailsSummary = ({
  checkIn,
  checkOut,
  childCount,
  adultCount,
  numberOfNights,
  hotel,
}: Props) => {
  return (
    <div className=" h-fit rounded-md border border-gray-300 p-5">
      <div className="flex flex-col gap-5">
        <h2 className="text-xl font-bold "> Your Booking Details</h2>
        <div className="flex flex-col border-b border-gray-300 py-5">
          <span className="text-gray-400 font-semibold">Location</span>
          <span className="text-sm font-bold">{`${hotel.name}, ${hotel.city}, ${hotel.country}`}</span>
        </div>
      </div>
      <div className="flex justify-between border-b border-gray-300 py-5">
        <div className="flex flex-col">
          <span className="text-gray-400 font-semibold">Check-in</span>
          <span className="text-sm font-bold">{checkIn.toDateString()}</span>
        </div>
        <div className="flex flex-col">
          <span className="text-gray-400 font-semibold">Check-out</span>
          <span className="text-sm font-bold">{checkOut.toDateString()}</span>
        </div>
      </div>
      <div className="flex flex-col border-b border-gray-300 py-5">
        <span className="text-gray-400 font-semibold">
          Total length of stay
        </span>
        <span className="text-sm font-bold">
          {numberOfNights} {numberOfNights > 1 ? "nights" : "night"}
        </span>
      </div>
      <div className="flex flex-col pt-5">
        <span className="text-gray-400 font-semibold">Guest</span>
        <span className="text-sm font-bold">
          {adultCount} {adultCount > 1 ? "adults" : "adult"} & {childCount}{" "}
          {childCount > 1 ? "children" : "child"}
        </span>
      </div>
    </div>
  );
};

export default BookingDetailsSummary;
