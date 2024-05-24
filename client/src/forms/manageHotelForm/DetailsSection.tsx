import {useFormContext} from "react-hook-form";
import {HotelFormData} from "./ManageHotelForm";

export const DetailsSection = () => {
  const {
    register,
    formState: {errors},
  } = useFormContext<HotelFormData>();

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-3xl font-bold mb-3">Add Hotel</h1>
      <label className="flex flex-col text-gray-700 font-semibold flex-1 text-sm">
        Name
        <input
          className="border rounded w-full py-1 px-2 font-normal focus:ring-0 focus:border-black"
          {...register("name", {required: "This field is required"})}
          type="text"
        />
        {errors.name && (
          <span className="text-red-600 font-bold">{errors.name.message}</span>
        )}
      </label>
      <div className="flex flex-col gap-4 md:flex-row">
        <label className="flex flex-col text-gray-700 font-semibold flex-1 text-sm">
          City
          <input
            className="border rounded w-full py-1 px-2 font-normal focus:ring-0 focus:border-black"
            {...register("city", {required: "This field is required"})}
            type="text"
          />
          {errors.city && (
            <span className="text-red-600 font-bold ">
              {errors.city.message}
            </span>
          )}
        </label>
        <label className="flex flex-col text-gray-700 font-semibold flex-1 text-sm">
          Country
          <input
            className="border rounded w-full py-1 px-2 font-normal focus:ring-0 focus:border-black"
            {...register("country", {required: "This field is required"})}
            type="text"
          />
          {errors.country && (
            <span className="text-red-600 font-bold">
              {errors.country.message}
            </span>
          )}
        </label>
      </div>
      <label className="flex flex-col text-gray-700 font-semibold flex-1 text-sm">
        Description
        <textarea
          className="border rounded w-full py-1 px-2 font-normal focus:ring-0 focus:border-black"
          {...register("description", {required: "This field is required"})}
          rows={10}
        />
        {errors.description && (
          <span className="text-red-600 font-bold">
            {errors.description.message}
          </span>
        )}
      </label>
      <label className="flex flex-col text-gray-700 font-semibold w-[50%] text-sm">
        Price Per Night
        <input
          className="border rounded w-full py-1 px-2 font-normal focus:ring-0 focus:border-black"
          {...register("pricePerNight", {required: "This field is required"})}
          type="number"
          min={1}
        />
        {errors.pricePerNight && (
          <span className="text-red-600 font-bold">
            {errors.pricePerNight.message}
          </span>
        )}
      </label>
      <label className="flex flex-col text-gray-700 font-semibold w-[50%] text-sm">
        Star Rating
        <select
          className="border rounded p-2 text-gray-700 font-normal focus:ring-0 focus:border-black"
          {...register("starRating", {required: "This field is required"})}
        >
          <option className="font-normal text-sm" value={""}>
            --Select a rating--
          </option>
          {[1, 2, 3, 4, 5].map((num) => (
            <option className="font-bold" value={num}>
              {num}
            </option>
          ))}
        </select>
        {errors.starRating && (
          <span className="text-red-600 font-bold">
            {errors.starRating.message}
          </span>
        )}
      </label>
    </div>
  );
};
