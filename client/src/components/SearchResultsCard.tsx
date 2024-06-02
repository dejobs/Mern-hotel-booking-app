import {HotelType} from "../../../backend/shared/types";
import {AiFillStar} from "react-icons/ai";
import {Link} from "react-router-dom";

type Props = {
  hotel: HotelType;
};

const SearchResultCard = ({hotel}: Props) => {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-[2fr_3fr] border border-slate-300 p-8 gap-8 dark:bg-gray-200">
      <div className="w-full h-[300px]">
        <img
          className={"h-full w-full object-cover object-center"}
          src={hotel.imageUrls[0]}
          alt="hotel image"
        />
      </div>
      <div className="grid grid-rows-[1fr_2fr_1fr]">
        <div className="">
          <div className="flex items-center gap-1">
            <span className="flex">
              {Array.from({length: hotel.starRating}).map(() => (
                <AiFillStar className="text-yellow-400" />
              ))}
            </span>
            <span className="text-sm">{hotel.type}</span>
          </div>
          <Link
            to={`/detail/${hotel._id}`}
            className="text-2xl font-bold cursor-pointer"
          >
            {hotel.name}
          </Link>
        </div>
        <div className="line-clamp-4">{hotel.description}</div>
        <div className="flex justify-between whitespace-nowrap">
          <div className="flex gap-1 items-center">
            {hotel.facilities.slice(0, 3).map((facility) => (
              <span className="rounded-lg bg-gray-400 p-2 text-xs font-bold whitespace-nowrap">
                {facility}
              </span>
            ))}
            <span className="text-sm">
              {hotel.facilities.length > 3 &&
                `+${hotel.facilities.length - 3} more`}
            </span>
          </div>
          <div className="flex flex-col items-end gap-1">
            <p className="font-bold">&#163;{hotel.pricePerNight} per night</p>
            <Link
              to={`/detail/${hotel._id}`}
              className="bg-teal-500 text-white h-full max-w-fit p-2 text-xl hover:bg-teal-400"
            >
              View more
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResultCard;
