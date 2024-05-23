import {useQuery} from "react-query";
import {useSearchContext} from "../contexts/SearchContext";
import * as apiClient from "../api-client";
import {useState} from "react";
import SearchResultCard from "../components/SearchResultsCard";
import Pagination from "../components/Pagination";
import StarRatingFilter from "../components/StarRatingFilter";
import HotelTypesFilter from "../components/HotelTypesFilter";
import HotelFacilitiesFilter from "../components/HotelFacilitiesFilter";
import HotelPriceFilter from "../components/HotelPriceFilter";

const Search = () => {
  const search = useSearchContext();
  const [page, setPage] = useState<number>(1);
  const [selectedStars, setSelectedStars] = useState<string[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedFacilities, setSelectedFacities] = useState<string[]>([]);
  const [selectedPrice, setSelectedPrice] = useState<number | undefined>();
  const [sortOption, setSortOption] = useState<string>("");

  const handleStarsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {value, checked} = event.target;
    setSelectedStars((prevStars) =>
      checked
        ? [...prevStars, value]
        : prevStars.filter((star) => star !== value)
    );
  };

  const handleTypesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {checked, value} = event.target;
    setSelectedTypes((prevTypes) =>
      checked
        ? [...prevTypes, value]
        : prevTypes.filter((type) => type !== value)
    );
  };

  const handleFacilitiesChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const {checked, value} = event.target;
    setSelectedFacities((prevFacilities) =>
      checked
        ? [...prevFacilities, value]
        : prevFacilities.filter((facility) => facility !== value)
    );
  };

  const searchParams = {
    destination: search.destination,
    checkIn: search.checkIn.toISOString(),
    checkOut: search.checkOut.toISOString(),
    adultCount: search.adultCount.toString(),
    childCount: search.childCount.toString(),
    page: page.toString(),
    stars: selectedStars,
    types: selectedTypes,
    facilities: selectedFacilities,
    maxPrice: selectedPrice?.toString(),
    sortOption,
  };

  const {data: hotelData} = useQuery(["searchHotels", searchParams], () =>
    apiClient.searchHotels(searchParams)
  );

  return (
    <div className=" mt-12 ">
      <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] md:grid-cols-[200px_1fr] gap-5">
        <div className="rounded-lg border border-slate-300 p-5 h-fit md:sticky top-10">
          <div className="space-y-5">
            <h3 className="text-lg font-semibold border-b border-slate-300 pb-5">
              Filter by:
            </h3>
            <StarRatingFilter
              onChange={handleStarsChange}
              selectedStars={selectedStars}
            />
            <HotelTypesFilter
              onChange={handleTypesChange}
              selectedTypes={selectedTypes}
            />
            <HotelFacilitiesFilter
              onChange={handleFacilitiesChange}
              selectedFacilities={selectedFacilities}
            />
            <HotelPriceFilter
              onChange={(value?: number) => setSelectedPrice(value)}
              selectedPrice={selectedPrice}
            />
          </div>
        </div>
        <div className="flex flex-col gap-5">
          <div className="flex justify-between items-center">
            <span className="text-xl font-bold">
              {hotelData &&
                hotelData.pagination &&
                `${hotelData.pagination.total} hotels found`}
              {search.destination ? ` in ${search.destination}` : ""}
            </span>
            <select
              className="border p-2 border-slate-300 rounded-md  text-sm"
              value={sortOption}
              onChange={(event) => setSortOption(event.target.value)}
            >
              <option value="">Sort By</option>
              <option value="starRating">Star Rating</option>
              <option value="pricePerNightAsc">
                Price Per Night (low to high)
              </option>
              <option value="pricePerNightDesc">
                Price Per Night (high to low)
              </option>
            </select>
          </div>
          {hotelData?.data.map((hotel) => (
            <SearchResultCard hotel={hotel} />
          ))}
          <div>
            <Pagination
              page={hotelData?.pagination.page || 1}
              pages={hotelData?.pagination.pages || 1}
              onPageChange={(page) => setPage(page)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
