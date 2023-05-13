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
import { socket } from "./utils/socket";
import Friends, {
  AllFriends,
  HomeFriends,
  InvitedFriendRequest,
  RecommendFriend,
  SendInvitedFriend,
} from "./pages/friends/Friends";
import { useEffect } from "react";

function App() {
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user?._id) {
      socket.on("connect", () => {
        socket.emit("set user", user._id);
      });
    }
  }, []);
  console.log(user);
  const ProtectedRoute = ({ children }) => {
    if (!user?._id) {
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
        {
          path: "/friends",
          element: <Friends />,
          children: [
            {
              path: "/friends",
              element: <HomeFriends />,
            },
            {
              path: "/friends/requests",
              element: <InvitedFriendRequest />,
            },
            {
              path: "/friends/suggests",
              element: <RecommendFriend />,
            },
            {
              path: "/friends/sends",
              element: <SendInvitedFriend />,
            },
            {
              path: "/friends/allfriends",
              element: <AllFriends />,
            },
          ],
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
