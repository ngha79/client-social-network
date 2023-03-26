import React from "react";
import "./searchuser.scss";
import { useSelector } from "react-redux";

const SearchUser = () => {
  const { searchPeople } = useSelector((state) => state.user);
  return (
    <div className="search-user">
      <div className="left-search">
        <div className="title">Kết quả tìm kiếm</div>
      </div>
      <div className="right-search">
        <div className="result-search">
          {searchPeople &&
            searchPeople.map((user) => (
              <div className="user">
                <img src={user.avatar.url} alt="" />
                <span>{user.name}</span>
              </div>
            ))}

          {searchPeople && searchPeople.length === 0 && (
            <div>Không tìm thấy kết quả mà bạn muốn</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchUser;
