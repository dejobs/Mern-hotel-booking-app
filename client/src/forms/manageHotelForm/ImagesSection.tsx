import {useFormContext} from "react-hook-form";
import {HotelFormData} from "./ManageHotelForm";

export const ImagesSection = () => {
  const {
    register,
    formState: {errors},
  } = useFormContext<HotelFormData>();

  return (
    <div>
      <h2 className="text-2xl font-bold mb-3">Images</h2>
      <div className="border rounded p-4">
        <input
          className="font-normal text-sm text-gray-700 w-full"
          type="file"
          accept="image/*"
          multiple
          {...register("imageFiles", {
            validate: (imageFiles) => {
              if (imageFiles.length === 0) {
                return "You must upload atleast an image";
              }
              if (imageFiles.length > 6) {
                return "You can not upload more than 6 images";
              }
              return true;
            },
          })}
        />
      </div>
      {errors.imageFiles && (
        <span className="text-red-600 text-sm font-bold">
          {errors.imageFiles.message}
        </span>
      )}
    </div>
  );
};
