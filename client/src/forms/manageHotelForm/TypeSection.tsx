import {useFormContext} from "react-hook-form";
import {HotelFormData} from "./ManageHotelForm";
import {hotelTypes} from "../../config/hotel-options-config";

export const TypeSection = () => {
  const {
    register,
    formState: {errors},
    watch,
  } = useFormContext<HotelFormData>();

  const typeWatch = watch("type");

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-2xl font-bold mb-3">Type</h2>
      <div className="grid grid-cols-5 gap-2">
        {hotelTypes.map((type) => (
          <label
            className={
              typeWatch === type
                ? "cursor-pointer bg-teal-300 text-sm rounded-full px-4 py-2 font-semibold "
                : "cursor-pointer bg-gray-300 text-sm rounded-full px-4 py-2 font-semibold"
            }
          >
            <input
              className="hidden"
              type="radio"
              value={type}
              {...register("type", {required: "This field is required"})}
            />
            <span className="text-gray-700">{type}</span>
          </label>
        ))}
      </div>
      {errors.type && (
        <span className="text-red-600 text-sm font-bold">
          {errors.type.message}
        </span>
      )}
    </div>
  );
};
