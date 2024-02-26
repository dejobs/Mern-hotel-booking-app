import Layout from "./layouts/Layout";
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="/sign-in" element={<SignIn />} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
