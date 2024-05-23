import {useSearchContext} from "../contexts/SearchContext";
import {useState} from "react";
import {MdTravelExplore} from "react-icons/md";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {useNavigate} from "react-router-dom";

const SearchBar = () => {
  const navigate = useNavigate();
  const search = useSearchContext();

  const [destination, setDestination] = useState<string>(search.destination);
  const [checkIn, setCheckIn] = useState<Date>(search.checkIn);
  const [checkOut, setCheckOUt] = useState<Date>(search.checkOut);
  const [adultCount, setAdultCount] = useState<number>(search.adultCount);
  const [childCount, setChildCount] = useState<number>(search.childCount);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    search.saveSearchValues(
      destination,
      checkIn,
      checkOut,
      adultCount,
      childCount
    );
    navigate("/search");
  };

  const minDate = new Date();
  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() + 1);

  return (
    <form
      className="p-3 bg-orange-400 rounded shadow-md grid grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5 items-center gap-4"
      onSubmit={handleSubmit}
    >
      <div className="flex flex-row items-center flex-1  bg-white p-2">
        <MdTravelExplore size={25} className="mr-2" />
        <input
          type="text"
          placeholder="Where are you going?"
          className="text-base w-full border-0 focus:ring-0"
          value={destination}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setDestination(e.target.value);
          }}
        />
      </div>
      <div className="flex bg-white px-2 py-1 gap-2 ">
        <label className="items-center flex">
          Adults:
          <input
            className="w-full p-1 border-0 focus:ring-0 font-bold"
            type="number"
            min={1}
            max={20}
            value={adultCount}
            onChange={(e) => {
              setAdultCount(parseInt(e.target.value));
            }}
          />
        </label>
        <label className="items-center flex">
          Children:
          <input
            className="w-full p-1 border-0 focus:ring-0 font-bold"
            type="number"
            min={0}
            max={20}
            value={childCount}
            onChange={(e) => {
              setChildCount(parseInt(e.target.value));
            }}
          />
        </label>
      </div>
      <div>
        <DatePicker
          selected={checkIn}
          onChange={(date) => setCheckIn(date as Date)}
          selectsStart
          startDate={checkIn}
          endDate={checkOut}
          minDate={minDate}
          maxDate={maxDate}
          placeholderText="check-in Date"
          className="min-w-full bg-white p-2 border-0 focus:ring-0"
          wrapperClassName="min-w-full"
        />
      </div>
      <div>
        <DatePicker
          selected={checkOut}
          onChange={(date) => setCheckOUt(date as Date)}
          selectsStart
          startDate={checkIn}
          endDate={checkOut}
          minDate={minDate}
          maxDate={maxDate}
          placeholderText="check-in Date"
          className="min-w-full bg-white p-2 border-0 focus:ring-0"
          wrapperClassName="min-w-full"
        />
      </div>
      <div className="flex gap-1">
        <button
          type="submit"
          className="w-2/3 bg-teal-700 text-white text-xl font-semibold p-[6px] h-full  hover:bg-teal-500 hover:shadow-md focus:outline-none  "
        >
          Search
        </button>
        <button className="w-1/3 bg-red-600 text-white text-xl font-semibold p-[6px]  h-full hover:bg-red-500 hover:shadow-md focus:outline-none">
          Clear
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
