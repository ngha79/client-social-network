import "./friends.scss";
import {
  AiFillSetting,
  AiOutlineUserAdd,
  AiOutlineUserSwitch,
} from "react-icons/ai";
import { FaUserFriends } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import ItemFriend from "./ItemFriend";
import { Link, Outlet } from "react-router-dom";
import {
  getInvitedFriend,
  getMoreSuggestFriend,
  getSendFriend,
} from "../../features/user/userSlice";

export const InvitedFriendRequest = () => {
  const { invitedFriends, people } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const handleGetMoreUser = () => {
    dispatch(getInvitedFriend(people.length));
  };
  return (
    <div className="header-right">
      <header>
        <h1>Lời mời kết bạn</h1>
      </header>
      <center>
        {invitedFriends.map((user) => (
          <ItemFriend user={user} key={user._id} typeButton={"invited"} />
        ))}
      </center>
      {invitedFriends.length > 0 && (
        <footer className="more-user" onClick={handleGetMoreUser}>
          Xem thêm
        </footer>
      )}
    </div>
  );
};

export const RecommendFriend = () => {
  const { people } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const handleGetMoreUser = () => {
    dispatch(getMoreSuggestFriend(people.length));
  };
  return (
    <div className="header-right">
      <header>
        <h1>Gợi ý</h1>
      </header>
      <span>Những người ban có thể biết</span>
      <center>
        {people.map((user) => (
          <ItemFriend user={user} key={user._id} typeButton={"suggest"} />
        ))}
      </center>
      <footer className="more-user" onClick={handleGetMoreUser}>
        Xem thêm
      </footer>
    </div>
  );
};

export const SendInvitedFriend = () => {
  const { people, sendInvite } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const handleGetMoreUser = () => {
    dispatch(getSendFriend(people.length));
  };
  return (
    <div className="header-right">
      <header>
        <h1>Lời mời đã gửi</h1>
      </header>
      <center>
        {sendInvite.map((user) => (
          <ItemFriend user={user} key={user._id} typeButton={"send"} />
        ))}
      </center>
      <footer className="more-user" onClick={handleGetMoreUser}>
        Xem thêm
      </footer>
    </div>
  );
};

export const AllFriends = () => {
  const { friends } = useSelector((state) => state.user);
  return (
    <div className="header-right">
      <header>
        <h1>Tất cả bạn bè</h1>
      </header>
      <center>
        {friends.map((user) => (
          <ItemFriend user={user} key={user._id} typeButton={"friends"} />
        ))}
      </center>
      <footer className="more-user">Xem thêm</footer>
    </div>
  );
};

export const HomeFriends = () => {
  const { invitedFriends, sendInvite } = useSelector((state) => state.user);
  return (
    <div>
      {invitedFriends.length > 0 && <InvitedFriendRequest />}
      <RecommendFriend />
      {sendInvite.length > 0 && <SendInvitedFriend />}
      <AllFriends />
    </div>
  );
};

const Friends = () => {
  return (
    <nav className="header-friends">
      <div className="left">
        <div className="content-left">
          <header className="flex-items head">
            <h1>Bạn bè</h1>
            <AiFillSetting className="icon icon-hover" size={36} />
          </header>
          <center>
            <Link to={"/friends"}>
              <div className="flex-items hover">
                <FaUserFriends className="icon" size={32} />
                <h3>Trang chủ</h3>
              </div>
            </Link>
            <Link to={"/friends/requests"}>
              <div className="flex-items hover">
                <AiOutlineUserSwitch className="icon" size={32} />
                <h3>Lời mời kết bạn</h3>
              </div>
            </Link>
            <Link to={"/friends/sends"}>
              <div className="flex-items hover">
                <AiOutlineUserSwitch className="icon" size={32} />
                <h3>Lời mời đã gửi</h3>
              </div>
            </Link>
            <Link to={"/friends/suggests"}>
              <div className="flex-items hover">
                <AiOutlineUserAdd className="icon" size={32} />
                <h3>Gợi ý</h3>
              </div>
            </Link>
            <Link to={"/friends/allfriends"}>
              <div className="flex-items hover">
                <FaUserFriends className="icon" size={32} />
                <h3>Tất cả bạn bè</h3>
              </div>
            </Link>
          </center>
        </div>
      </div>
      <div className="right">
        <Outlet />
      </div>
    </nav>
  );
};

export default Friends;
