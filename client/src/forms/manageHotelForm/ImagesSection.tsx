import {useFormContext} from "react-hook-form";
import {HotelFormData} from "./ManageHotelForm";

export const ImagesSection = () => {
  const {
    register,
    formState: {errors},
    watch,
    setValue,
  } = useFormContext<HotelFormData>();

  const existingImageUrls = watch("imageUrls");

  const handleImageDelete = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    imageUrls: string
  ) => {
    event.preventDefault();
    setValue(
      "imageUrls",
      existingImageUrls.filter((url) => url !== imageUrls)
    );
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-3">Images</h2>
      <div className="border rounded p-4 flex flex-col gap-4">
        {existingImageUrls && (
          <div className="grid grid-cols-6 gap-4">
            {existingImageUrls.map((url) => (
              <div className="relative group">
                <img src={url} key={url} className="min-h-full object-cover" />
                <button
                  onClick={(event) => {
                    handleImageDelete(event, url);
                  }}
                  className="absolute inset-0 items-start justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 text-white "
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
        <input
          className="font-normal text-sm text-gray-700 w-full"
          type="file"
          accept="image/*"
          multiple
          {...register("imageFiles", {
            validate: (imageFiles) => {
              if (imageFiles.length + (existingImageUrls?.length || 0) === 0) {
                return "You must upload atleast an image";
              }
              if (imageFiles.length + (existingImageUrls?.length || 0) > 6) {
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
