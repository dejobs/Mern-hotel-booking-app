import Layout from "./layouts/Layout";
import {
  Route,
  Navigate,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import AddHotel from "./pages/AddHotel";
import MyHotels from "./pages/MyHotels";
import EditHotel from "./pages/EditHotel";
import Search from "./pages/Search";
import Detail from "./pages/Detail";
import Booking from "./pages/Booking";
import MyBookings from "./pages/MyBookings";
import Home from "./pages/Home";
import PrivateRoute from "./components/PrivateRoute";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/detail/:hotelId" element={<Detail />} />
        <Route element={<PrivateRoute />}>
          <Route path="/add-hotel" element={<AddHotel />} />
          <Route path="/my-hotels" element={<MyHotels />} />
          <Route path="/edit-hotel/:hotelId" element={<EditHotel />} />
          <Route path="/hotel/:hotelId/booking" element={<Booking />} />
          <Route path="/my-bookings" element={<MyBookings />} />
        </Route>
      </Route>
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="/sign-in" element={<SignIn />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
