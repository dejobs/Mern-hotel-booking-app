import {useFormContext} from "react-hook-form";
import {HotelFormData} from "./ManageHotelForm";

export const GuestSection = () => {
  const {
    register,
    formState: {errors},
  } = useFormContext<HotelFormData>();

  return (
    <div>
      <h2 className="text-2xl font-bold mb-3">Guests</h2>
      <div className="flex gap-4 flex-row bg-gray-300 p-5">
        <label className="flex flex-col text-gray-700 text-sm font-semibold gap-1 flex-1">
          Adults
          <input
            className="border rounded py-2 px-2 font-normal"
            type="number"
            min={1}
            max={4}
            {...register("adultCount", {required: "This field is required"})}
          />
          {errors.adultCount && (
            <span className="text-red-600 font-bold">
              {errors.adultCount.message}
            </span>
          )}
        </label>
        <label className="flex flex-col text-gray-700 text-sm font-semibold gap-1 flex-1">
          Children
          <input
            className="border rounded py-2 px-2 font-normal"
            type="number"
            min={0}
            max={6}
            {...register("childCount", {required: "This field is required"})}
          />
          {errors.childCount && (
            <span className="text-red-600 font-bold">
              {errors.childCount.message}
            </span>
          )}
        </label>
      </div>
    </div>
  );
};
