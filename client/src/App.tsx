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
import {useAppContext} from "./contexts/AppContext";

/*
function App() {
  const {isLoggedIn} = useAppContext();

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/sign-in" element={<SignIn />} />
        {isLoggedIn && <Route path="/add-hotel" element={<AddHotel />} />}
        <Route path="*" element={<Navigate to="/" />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
}
*/

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="/sign-in" element={<SignIn />} />
      <Route path="/add-hotel" element={<AddHotel />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
