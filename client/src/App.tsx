import Layout from "./layouts/Layout";
import {Route, Routes, BrowserRouter, Navigate} from "react-router-dom";
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
import {useAppContext} from "./contexts/AppContext";

const App = () => {
  const {isLoggedIn} = useAppContext();
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
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
        </Route>
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
