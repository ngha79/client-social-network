import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./searchuser.scss";
import { useDispatch, useSelector } from "react-redux";
import { getUserByName } from "../../features/user/userSlice";

const SearchUser = () => {
  const { searchPeople } = useSelector((state) => state.user);
  const [searchUser, setSearchUser] = useState("");
  const dispatch = useDispatch();

  const handleSearchUser = (e) => {
    e.preventDefault();
    if (searchUser.length !== 0) {
      dispatch(getUserByName(searchUser));
    }
  };

  return (
    <div className="search-user">
      <div className="left-search">
        <div className="title">Kết quả tìm kiếm</div>
      </div>
      <div className="right-search">
        <div className="result-search">
          <form onSubmit={handleSearchUser} className="form-search">
            <input
              type="text"
              placeholder="Tìm kiếm"
              className="search-input"
              onChange={(e) => setSearchUser(e.target.value)}
            />
          </form>
          {searchPeople &&
            searchPeople.map((user) => (
              <Link to={`/profile/${user._id}`}>
                <div className="user">
                  <img src={user.avatar.url} alt="" />
                  <span>{user.name}</span>
                </div>
              </Link>
            ))}

          {searchPeople && searchPeople.length === 0 && (
            <div className="title-search">Nhập để tìm kiếm</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchUser;
