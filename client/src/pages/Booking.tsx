import BookingForm from "../forms/bookingForm/BookingForm";
import {useQuery} from "react-query";
import * as apiClient from "../api-client";
import {useSearchContext} from "../contexts/SearchContext";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import BookingDetailsSummary from "../components/BookingDetailsSummary";

const Booking = () => {
  const search = useSearchContext();
  const {hotelId} = useParams();
  const [numberOfNights, setNumberofNights] = useState<number>(0);

  useEffect(() => {
    if (search.checkIn && search.checkOut) {
      const nights =
        Math.abs(search.checkOut.getTime() - search.checkIn.getTime()) /
        (1000 * 60 * 60 * 24);

      setNumberofNights(Math.ceil(nights));
    }
  }, [search.checkIn, search.checkOut]);

  const {data: hotel} = useQuery(
    "fetchHotelById",
    () => apiClient.fetchHotelById(hotelId || ""),
    {
      enabled: !!hotelId,
    }
  );

  const {data: currentUser} = useQuery(
    "fetchCurrentUser",
    apiClient.fetchCurrentUser
  );

  if (!hotel) {
    return <></>;
  }

  return (
    <div className="container mx-auto my-8">
      <div className="grid md:grid-cols-[1fr_2fr] h-fit gap-4">
        <BookingDetailsSummary
          checkIn={search.checkIn}
          checkOut={search.checkOut}
          adultCount={search.adultCount}
          childCount={search.childCount}
          numberOfNights={numberOfNights}
          hotel={hotel}
        />
        {currentUser && <BookingForm currentUser={currentUser} />}
      </div>
    </div>
  );
};

export default Booking;
