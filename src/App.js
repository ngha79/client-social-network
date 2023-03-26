import { useDispatch, useSelector } from "react-redux";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Chat from "./pages/chat/Chat";
import Profile from "./pages/profile/Profile";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  createBrowserRouter,
  Navigate,
  Outlet,
  redirect,
  RouterProvider,
} from "react-router-dom";
import NotFound from "./pages/NotFound/NotFound";
import NavBar from "./components/navbar/NavBar";
import Diff from "./pages/outlet/Diff";
import ForgotPassword from "./pages/forgot-password/ForgotPassword";
import ResetPassword from "./pages/reset-password/ResetPassword";
import SearchUser from "./pages/search-user/SearchUser";

function App() {
  const { user } = useSelector((state) => state.auth);

  const ProtectedRoute = ({ children }) => {
    if (!user) {
      return <Navigate to={"/login"} />;
    }
    return children;
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <Diff />
        </ProtectedRoute>
      ),
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/profile/:userId",
          element: <Profile />,
        },
        {
          path: "/message",
          element: <Chat />,
        },
        {
          path: "/search-people",
          element: <SearchUser />,
        },
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/forgot-password",
      element: <ForgotPassword />,
    },
    {
      path: "/reset-password/*",
      element: <ResetPassword />,
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer />
    </>
  );
}

export default App;
