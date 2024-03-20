import {ManageHotelForm} from "../forms/manageHotelForm/ManageHotelForm";
import {useMutation, useQueryClient} from "react-query";
import * as apiClient from "../api-client";
import {toast} from "react-toastify";

const AddHotel = () => {
  const queryClient = useQueryClient();

  const {mutate, isLoading} = useMutation(apiClient.addMyHotel, {
    onSuccess: async () => {
      await queryClient.invalidateQueries("validateToken");
      toast.success("Hotel saved", {className: "toast-message"});
    },
    onError: async (err: Error) => {
      toast.error("Error saving hotel", {className: "toast-message-error"});
      console.log(err.message);
    },
  });

  const handleSave = (hotelFormData: FormData) => {
    mutate(hotelFormData);
  };

  return <ManageHotelForm onSave={handleSave} isLoading={isLoading} />;
};

export default AddHotel;
