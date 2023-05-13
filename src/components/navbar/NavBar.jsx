import { Link, useNavigate } from "react-router-dom";
import "./navbar.scss";
import { FaSearch, FaFacebookMessenger, FaBell, FaHome } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { logout, reset } from "../../features/auth/authSlice";
import { getUserByName } from "../../features/user/userSlice";
import { socket } from "../../utils/socket";

const NavBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [openFeature, setOpenFeature] = useState(false);
  const [searchUser, setSearchUser] = useState("");

  const featureUser = (e) => {
    e.stopPropagation();
    setOpenFeature(!openFeature);
  };

  const handleLogout = (e) => {
    e.preventDefault();
    socket.emit("logout", user._id);
    dispatch(logout());
    dispatch(reset());
    navigate("/login");
  };

  const handleSearchUser = (e) => {
    e.preventDefault();
    if (searchUser.length !== 0) {
      dispatch(getUserByName(searchUser));
      navigate("/search-people");
    }
  };

  return (
    <div className="navbar" onClick={() => setOpenFeature(false)}>
      <div className="content">
        <div className="left">
          <div className="logo">
            <Link to={"/"}>SoCon</Link>
          </div>
          <div className="search">
            <FaSearch className="icon" />
            <form onSubmit={handleSearchUser}>
              <input
                type="text"
                placeholder="Tìm kiếm mọi người"
                onChange={(e) => setSearchUser(e.target.value)}
              />
            </form>
          </div>
        </div>
        <div className="center">
          <Link to={"/"}>
            <div className="home">
              <FaHome className="icon" />
            </div>
          </Link>
        </div>
        <div className="right">
          <Link to={"/message"}>
            <div className="chat">
              <FaFacebookMessenger className="icon" />
            </div>
          </Link>
          {/* <div className="notification">
            <FaBell className="icon" />
          </div> */}

          <div className="user">
            <img src={user?.avatar?.url} alt="" onClick={featureUser} />

            {openFeature && (
              <div className="featureUser">
                <div className="feature">
                  <Link to={`/profile/${user?._id}`}>
                    <div className="toProfile">
                      <img src={user?.avatar?.url} alt="" />
                      <span>{user?.name}</span>
                    </div>
                  </Link>
                  <div className="search">
                    <hr />
                    <Link to={"/search-people"}>
                      <div className="search-mobile">
                        <span>Tìm kiếm</span>
                      </div>
                    </Link>
                  </div>

                  <div className="friend">
                    <hr />
                    <Link to={"/friends"}>
                      <div className="search-mobile">
                        <span>Bạn bè</span>
                      </div>
                    </Link>
                  </div>
                  <hr />
                  <div className="logout" onClick={handleLogout}>
                    <span>Đăng xuất</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
