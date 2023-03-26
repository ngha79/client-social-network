import { Link, useNavigate } from "react-router-dom";
import "./navbar.scss";
import { FaSearch, FaFacebookMessenger, FaBell, FaHome } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { logout, reset } from "../../features/auth/authSlice";
import { getAllChat } from "../../features/chat/chatSlice";
import { getUserByName } from "../../features/user/userSlice";

const NavBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { searchPeople } = useSelector((state) => state.user);
  const [openFeature, setOpenFeature] = useState(false);
  const [searchUser, setSearchUser] = useState("");

  const featureUser = () => {
    setOpenFeature(!openFeature);
  };

  const handleLogout = (e) => {
    e.preventDefault();
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
    <div className="navbar">
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
            <img src={user?.user.avatar.url} alt="" onClick={featureUser} />

            {openFeature && (
              <div className="featureUser">
                <div className="feature">
                  <Link to={`/profile/${user?.user._id}`}>
                    <div className="toProfile">
                      <img src={user?.user.avatar.url} alt="" />
                      <span>{user?.user.name}</span>
                    </div>
                  </Link>
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
