import {useForm} from "react-hook-form";
import {
  PaymentIntentResponse,
  UserType,
} from "../../../../backend/shared/types";
import {CardElement, useStripe, useElements} from "@stripe/react-stripe-js";
import {StripeCardElement} from "@stripe/stripe-js";
import {useSearchContext} from "../../contexts/SearchContext";
import {useMutation} from "react-query";
import * as apiClient from "../../api-client";
import {useParams} from "react-router-dom";
import {toast} from "react-toastify";

type Props = {
  currentUser: UserType;
  paymentIntent: PaymentIntentResponse;
};

export type BookingFormData = {
  firstName: string;
  lastName: string;
  email: string;
  adultCount: number;
  childCount: number;
  checkIn: string;
  checkOut: string;
  hotelId: string;
  paymentIntentId: string;
  totalCost: number;
};

const BookingForm = ({currentUser, paymentIntent}: Props) => {
  const stripe = useStripe();
  const elements = useElements();

  const search = useSearchContext();
  const {hotelId} = useParams();

  const {mutate: bookYourRoom, isLoading} = useMutation(
    apiClient.createRoomBooking,
    {
      onSuccess: () => {
        toast.success("Booking Saved", {className: "toast-message"});
        console.log("saved");
      },

      onError: () => {
        toast.error("Error saving booking", {className: "toast-message-error"});
        console.log("Error saving");
      },
    }
  );

  const {register, handleSubmit} = useForm<BookingFormData>({
    defaultValues: {
      firstName: currentUser.firstName,
      lastName: currentUser.lastName,
      email: currentUser.email,
      adultCount: search.adultCount,
      childCount: search.childCount,
      checkIn: search.checkIn.toISOString(),
      checkOut: search.checkOut.toISOString(),
      totalCost: paymentIntent.totalCost,
      hotelId: hotelId,
      paymentIntentId: paymentIntent.paymentIntentId,
    },
  });

  const onSubmit = async (formData: BookingFormData) => {
    if (!stripe || !elements) {
      return;
    }

    const result = await stripe.confirmCardPayment(paymentIntent.clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement) as StripeCardElement,
      },
    });

    if (result.paymentIntent?.status === "succeeded") {
      // book the room
      bookYourRoom({
        ...formData,
        paymentIntentId: result.paymentIntent.id,
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid grid-cols-1 gap-5 rounded-lg border border-slate-300 p-5 h-fit"
    >
      <span className="text-3xl font-bold">Confirm Your Details</span>
      <div className="grid grid-cols-2 gap-6">
        <label className="text-sm text-gray-700 font-bold flex-1">
          First Name
          <input
            className="mt-1 border rounded w-full py-2 px-3 text-gray-700 bg-gray-200 font-normal"
            type="text"
            readOnly
            disabled
            {...register("firstName")}
          />
        </label>
        <label className="text-sm text-gray-700 font-bold flex-1">
          Last Name
          <input
            className="mt-1 border rounded w-full py-2 px-3 text-gray-700 bg-gray-200 font-normal"
            type="text"
            readOnly
            disabled
            {...register("lastName")}
          />
        </label>
      </div>
      <label className="text-sm text-gray-700 font-bold flex-1">
        Email
        <input
          className="mt-1 border rounded w-full py-2 px-3 text-gray-700 bg-gray-200 font-normal"
          type="text"
          readOnly
          disabled
          {...register("email")}
        />
      </label>

      <div className="space-y-2">
        <div className="text-xl font-semibold">Your Price Summary</div>
        <div className="bg-blue-200 p-4 rounded-md">
          <div className="font-semibold text-lg">
            Total Cost: £{paymentIntent.totalCost.toFixed(2)}
          </div>
          <div className="text-xs">Include taxes and charges</div>
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="text-xl font-semibold">Payment Details</h3>
        <CardElement
          id="payment-element"
          className="border rounded-md p-4 text-sm shadow-md"
        />
      </div>
      <div className="flex justify-end">
        <button
          disabled={isLoading}
          type="submit"
          className="bg-blue-600 text-white p-2 font-bold hover:bg-blue-500 text-lg disabled:cursor-not-allowed disabled:bg-blue-400"
        >
          {isLoading ? "Saving" : "Confirm Booking"}
        </button>
      </div>
    </form>
  );
};

export default BookingForm;
