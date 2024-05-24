import {useNavigate, useParams} from "react-router-dom";
import * as apiClient from "../api-client";
import {useMutation, useQuery, useQueryClient} from "react-query";
import {ManageHotelForm} from "../forms/manageHotelForm/ManageHotelForm";
import {toast} from "react-toastify";

const EditHotel = () => {
  const {hotelId} = useParams();
  const navigate = useNavigate();

  const {data: hotel} = useQuery(
    "fetchMyHotelById",
    () => apiClient.fetchMyhotelById(hotelId || ""),
    {
      enabled: !!hotelId,
    }
  );

  const queryClient = useQueryClient();

  const {mutate, isLoading} = useMutation(apiClient.updateMyHotelById, {
    onSuccess: async () => {
      toast.success("Updated", {className: "toast-message"});
      await queryClient.invalidateQueries("fetchMyHotelById");
      navigate("/my-hotels");
    },

    onError: async () => {
      toast.error("Failed to update", {className: "toast-messsage-error"});
    },
  });

  const handleSave = (hotelFormData: FormData) => {
    mutate(hotelFormData);
  };

  return (
    <ManageHotelForm hotel={hotel} onSave={handleSave} isLoading={isLoading} />
  );
};

export default EditHotel;
