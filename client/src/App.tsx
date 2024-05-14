import Layout from "./layouts/Layout";
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
  Navigate,
} from "react-router-dom";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import AddHotel from "./pages/AddHotel";
import MyHotels from "./pages/MyHotels";
import EditHotel from "./pages/EditHotel";
import Search from "./pages/Search";
import Detail from "./pages/Detail";
import Booking from "./pages/Booking";
import MyBookings from "./pages/MyBooking";
//import {useAppContext} from "./contexts/AppContext";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="/sign-in" element={<SignIn />} />
      <Route path="/search" element={<Search />} />
      <Route path="/detail/:hotelId" element={<Detail />} />
      <Route path="/add-hotel" element={<AddHotel />} />
      <Route path="/my-hotels" element={<MyHotels />} />
      <Route path="/edit-hotel/:hotelId" element={<EditHotel />} />
      <Route path="/hotel/:hotelId/booking" element={<Booking />} />
      <Route path="/my-bookings" element={<MyBookings />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;

/**
 function App() {
  const {isLoggedIn} = useAppContext();

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/search" element={<Search />} />
        <Route path="/detail/:hotelId" element={<Detail />} />
        {isLoggedIn && <Route path="/add-hotel" element={<AddHotel />} />}
        {isLoggedIn && <Route path="/my-hotels" element={<MyHotels />} />}
        {isLoggedIn && (
          <Route path="/edit-hotel/:hotelId" element={<EditHotel />} />
        )}
        {isLoggedIn && (
          <Route path="/hotel/:hotelId/booking" element={<Booking />} />
        )}
        {isLoggedIn && <Route path="/my-bookings" element={<MyBookings />} />}
        <Route path="*" element={<Navigate to="/" />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
}



 */
