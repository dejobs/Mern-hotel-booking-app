import {useForm} from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {useSearchContext} from "../../contexts/SearchContext";
import {useAppContext} from "../../contexts/AppContext";
import {useNavigate, useLocation} from "react-router-dom";

type Props = {
  hotelId: string;
  pricePerNight: number;
};

type GuestInfoFormData = {
  checkIn: Date;
  checkOut: Date;
  adultCount: number;
  childCount: number;
};

const GuestInfoForm = ({hotelId, pricePerNight}: Props) => {
  const search = useSearchContext();
  const {isLoggedIn} = useAppContext();
  const navigate = useNavigate();
  const location = useLocation();

  const {
    handleSubmit,
    register,
    watch,
    setValue,
    formState: {errors},
  } = useForm<GuestInfoFormData>({
    defaultValues: {
      adultCount: search.adultCount,
      childCount: search.childCount,
      checkIn: search.checkIn,
      checkOut: search.checkOut,
    },
  });

  const checkIn = watch("checkIn");
  const checkOut = watch("checkOut");

  const minDate = new Date();
  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() + 1);

  const onSignInClick = (data: GuestInfoFormData) => {
    search.saveSearchValues(
      "",
      data.checkIn,
      data.checkOut,
      data.adultCount,
      data.childCount
    );
    navigate(`/sign-in`, {state: {from: location}});
  };

  const onSubmit = (data: GuestInfoFormData) => {
    search.saveSearchValues(
      "",
      data.checkIn,
      data.checkOut,
      data.adultCount,
      data.childCount
    );
    navigate(`/hotel/${hotelId}/booking`);
  };

  return (
    <div className="flex flex-col p-4 bg-blue-200 gap-4">
      <h3 className="text-lg font-bold">£{pricePerNight} Per Night</h3>
      <form
        onSubmit={
          isLoggedIn ? handleSubmit(onSubmit) : handleSubmit(onSignInClick)
        }
      >
        <div className="grid grid-cols-1 items-center gap-4">
          <div>
            <DatePicker
              required
              selected={checkIn}
              onChange={(date) => setValue("checkIn", date as Date)}
              selectsStart
              startDate={checkIn}
              endDate={checkOut}
              minDate={minDate}
              maxDate={maxDate}
              placeholderText="check-in Date"
              className="min-w-full bg-white p-2 focus:outline-none"
              wrapperClassName="min-w-full"
            />
          </div>
          <div>
            <DatePicker
              required
              selected={checkOut}
              onChange={(date) => setValue("checkOut", date as Date)}
              selectsStart
              startDate={checkIn}
              endDate={checkOut}
              minDate={minDate}
              maxDate={maxDate}
              placeholderText="check-out Date"
              className="min-w-full bg-white p-2 focus:outline-none"
              wrapperClassName="min-w-full"
            />
          </div>
          <div className="grid grid-cols-2 gap-1">
            <label className="flex items-center gap-2 ">
              Adults:
              <input
                className=" font-normal p-1 w-full focus:outline-none"
                type="number"
                max={20}
                min={1}
                {...register("adultCount", {
                  required: "This field is required",
                  min: {
                    value: 0,
                    message: "There must be atleast oe adult",
                  },
                  valueAsNumber: true,
                })}
              />
            </label>
            <label className="flex items-center gap-2">
              Children:
              <input
                className=" font-normal p-1 w-full focus:outline-none"
                type="number"
                max={20}
                min={0}
                {...register("childCount", {
                  required: "This field is required",
                  valueAsNumber: true,
                })}
              />
            </label>
            {errors.adultCount && (
              <span className="text-sm text-red-500 font-semibold">
                {errors.adultCount.message}
              </span>
            )}
          </div>
          {isLoggedIn ? (
            <button className="bg-blue-600 text-white p-2 font-bold h-full hover:bg-blue-500 hover:text-xl">
              Book Now
            </button>
          ) : (
            <button className="bg-blue-600 text-white p-2 font-bold h-full hover:bg-blue-000 hover:text-xl">
              Sign in to Book
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default GuestInfoForm;

/**
  navigate(`/sign-in`, {state: {from: location}});

navigate( /sign-in ): This part of the code is instructing the application to navigate to the  /sign-in  route. This means that the user will be redirected to the sign-in page of the application. 
-  {state: {from: location}} : This part is passing additional state information along with the navigation. In this case, it includes an object with a key  from  whose value is  location`. This can be useful for storing information about the current location before the navigation, which can be accessed in the sign-in page to potentially redirect the user back to the original location after signing in.  

 */
