import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./chat.scss";
import { BsThreeDots } from "react-icons/bs";
import { GrClose } from "react-icons/gr";
import ChatBox from "../../components/chatbox/ChatBox";
import Conversation from "../../components/conversation/Conversation";
import {
  addGroup,
  createChat,
  getAllChat,
  getChatByMember,
  getMessages,
  resetMemberChat,
  updateChat,
} from "../../features/chat/chatSlice";
import { toast } from "react-toastify";
import { socket } from "../../utils/socket";
import { useLocation } from "react-router-dom";
import CallVideo from "../../components/callvideo/CallVideo";
import CallVideoSend from "../../components/callvideo/CallVideoSend";
import ConversationChat from "../conversation/ConversationChat";

const useViewport = () => {
  const [width, setWidth] = React.useState(window.innerWidth);

  React.useEffect(() => {
    const handleWindowResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleWindowResize);
    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);

  return { width };
};

const Chat = () => {
  const { user } = useSelector((state) => state.auth);
  const { friends } = useSelector((state) => state.user);

  const { chat, isGetChat, updateChatCurrent, memberChat } = useSelector(
    (state) => state.chat
  );
  const [currentChat, setCurrentChat] = useState(null);
  const [openCreateChat, setOpenCreateChat] = useState(false);
  const [createGroup, setCreateGroup] = useState(false);
  const [addUser, setAddUser] = useState(false);
  const [nameChat, setNameChat] = useState("");
  const [avatarChat, setAvatarChat] = useState();
  const [userChat, setUserChat] = useState([]);

  const [chatMobile, setChatMobile] = useState(false);
  const viewPort = useViewport();
  const isMobile = viewPort.width <= 600;
  const dispatch = useDispatch();
  const location = useLocation();
  let profileUser;
  if (location.state) {
    profileUser = location.state;
  } else {
    profileUser = {};
  }

  useEffect(() => {
    if (Object.keys(profileUser).length !== 0) {
      dispatch(getChatByMember(profileUser._id));
      setChatMobile(true);
    }
  }, []);

  useEffect(() => {
    socket.on("new message chat", (chat) => {
      dispatch(addGroup(chat));
    });
  }, []);

  const handleSetChat = (e, chatmess) => {
    e.preventDefault();
    location.state = {};
    setCurrentChat(chatmess);
    dispatch(updateChat());
    dispatch(resetMemberChat());
    dispatch(getMessages(chatmess._id));
    setChatMobile(true);
    socket.emit("joinRoom", { chatId: chatmess._id, userId: user._id });
  };

  const handleCreateGroup = (e) => {
    e.preventDefault();
    const formData = new FormData();

    if (avatarChat) {
      formData.append("image", avatarChat);
    }
    if (!nameChat) {
      return toast.error("Vui lòng nhập tên nhóm!");
    } else {
      formData.append("name", nameChat);
    }
    if (userChat.length < 1) {
      return toast.error("Nhóm phải có ít nhất 2 người trở lên!");
    } else {
      formData.append("members", userChat);
    }
    formData.append("leader", user._id);
    formData.append("type", "Group");

    dispatch(createChat(formData));
    setUserChat([]);
    setNameChat("");
    setAvatarChat();
    setCreateGroup(false);
    setOpenCreateChat(false);
  };

  const handleCloseTagUser = (e) => {
    e.preventDefault();
    setAddUser(false);
    setUserChat([]);
  };

  const handleAddUser = (friendId) => {
    if (!userChat.includes(friendId)) {
      setUserChat((userChat) => [...userChat, friendId]);
    } else {
      setUserChat((userChat) => userChat.slice(friendId, -1));
    }
  };

  if (isMobile) {
    return (
      <>
        {chatMobile ? (
          <div className="chat">
            <div className="rightChat">
              {Object.keys(memberChat).length !== 0 ? (
                <ChatBox
                  chat={memberChat[0]}
                  user={user}
                  setCurrentChat={setCurrentChat}
                  isMobile={isMobile}
                  setChatMobile={setChatMobile}
                />
              ) : Object.keys(profileUser).length !== 0 ? (
                <ChatBox
                  profileUser={profileUser}
                  user={user}
                  setCurrentChat={setCurrentChat}
                  isMobile={true}
                  setChatMobile={setChatMobile}
                />
              ) : (
                <ChatBox
                  chat={
                    Object.keys(updateChatCurrent).length !== 0
                      ? updateChatCurrent
                      : currentChat
                  }
                  user={user}
                  setCurrentChat={setCurrentChat}
                  isMobile={isMobile}
                  setChatMobile={setChatMobile}
                />
              )}
            </div>
            <CallVideo />
          </div>
        ) : (
          <div className="chat">
            <div className="leftChatMobile">
              <div className="headerLeft">
                <div className="title">Chat</div>
                <div className="featureChat">
                  <BsThreeDots
                    className="iconMore"
                    onClick={() => setOpenCreateChat(!openCreateChat)}
                  />

                  {openCreateChat && (
                    <div
                      className="createGroupChat"
                      onClick={() => setCreateGroup(true)}
                    >
                      Tạo nhóm chat
                    </div>
                  )}
                </div>
              </div>
              <div className="listFriendAndChats">
                {chat &&
                  chat.map((chatmess) => (
                    <div
                      key={chatmess._id}
                      className="setChat"
                      onClick={(e) => handleSetChat(e, chatmess)}
                    >
                      <Conversation chat={chatmess} key={chatmess._id} />
                    </div>
                  ))}
              </div>
              <CallVideo />
            </div>
            {/* <div className="rightChat">
          {Object.keys(memberChat).length !== 0 ? (
            <ChatBox
              chat={memberChat[0]}
              user={user}
              setCurrentChat={setCurrentChat}
            />
          ) : Object.keys(profileUser).length !== 0 ? (
            <ChatBox
              profileUser={profileUser}
              user={user}
              setCurrentChat={setCurrentChat}
            />
          ) : (
            <ChatBox
              chat={
                Object.keys(updateChatCurrent).length !== 0
                  ? updateChatCurrent
                  : currentChat
              }
              user={user}
              setCurrentChat={setCurrentChat}
            />
          )}
        </div> */}
            {createGroup && (
              <div className="formChat">
                <form className="groupChat">
                  <GrClose
                    className="closeTag"
                    onClick={() => setCreateGroup(false)}
                  />
                  <label className="nameGroup">Tên nhóm</label>
                  <input
                    type="text"
                    id="fname"
                    name="fname"
                    value={nameChat}
                    onChange={(e) => setNameChat(e.target.value)}
                  />
                  <label className="avatarGroup">Ảnh nhóm</label>
                  <input
                    type="file"
                    id="lname"
                    name="lname"
                    onChange={(e) => setAvatarChat(e.target.files[0])}
                  />

                  <label className="avatarGroup">Thêm thành viên</label>
                  <span onClick={() => setAddUser(true)}>Thêm</span>
                  <button onClick={handleCreateGroup}>Tạo nhóm</button>

                  {addUser && (
                    <div className="listFriend">
                      <GrClose
                        className="closeTag"
                        onClick={handleCloseTagUser}
                      />
                      <div className="titleFriend">Tất cả bạn bè</div>
                      <div className="friends">
                        {friends &&
                          friends.map((friend) => (
                            <div className="friend" key={friend._id}>
                              <div>
                                <img src={friend?.avatar.url} alt="" />
                                <div className="name">{friend.name}</div>
                              </div>

                              <input
                                type="checkbox"
                                className="choseFriend"
                                onChange={() => handleAddUser(friend._id)}
                              />
                            </div>
                          ))}
                      </div>
                      <button onClick={() => setAddUser(false)}>Thêm</button>
                    </div>
                  )}
                </form>
              </div>
            )}
          </div>
        )}
      </>
    );
  }

  return (
    <div className="chat">
      <div className="leftChat">
        <div className="headerLeft">
          <div className="title">Chat</div>
          <div className="featureChat">
            <BsThreeDots
              className="iconMore"
              onClick={() => setOpenCreateChat(!openCreateChat)}
            />

            {openCreateChat && (
              <div
                className="createGroupChat"
                onClick={() => setCreateGroup(true)}
              >
                Tạo nhóm chat
              </div>
            )}
          </div>
        </div>
        <div className="listFriendAndChats">
          {chat &&
            chat.map((chatmess) => (
              <div
                key={chatmess._id}
                className="setChat"
                onClick={(e) => handleSetChat(e, chatmess)}
              >
                <Conversation chat={chatmess} key={chatmess._id} />
              </div>
            ))}
        </div>
      </div>
      <div className="rightChat">
        {Object.keys(memberChat).length !== 0 ? (
          <ChatBox
            chat={memberChat[0]}
            user={user}
            setCurrentChat={setCurrentChat}
            isMobile={false}
          />
        ) : Object.keys(profileUser).length !== 0 ? (
          <ChatBox
            profileUser={profileUser}
            user={user}
            setCurrentChat={setCurrentChat}
            isMobile={false}
          />
        ) : (
          <ChatBox
            chat={
              Object.keys(updateChatCurrent).length !== 0
                ? updateChatCurrent
                : currentChat
            }
            user={user}
            setCurrentChat={setCurrentChat}
            isMobile={false}
          />
        )}
      </div>
      {createGroup && (
        <div className="formChat">
          <form className="groupChat">
            <GrClose
              className="closeTag"
              onClick={() => setCreateGroup(false)}
            />
            <label className="nameGroup">Tên nhóm</label>
            <input
              type="text"
              id="fname"
              name="fname"
              value={nameChat}
              onChange={(e) => setNameChat(e.target.value)}
            />
            <label className="avatarGroup">Ảnh nhóm</label>
            <input
              type="file"
              id="lname"
              name="lname"
              onChange={(e) => setAvatarChat(e.target.files[0])}
            />

            <label className="avatarGroup">Thêm thành viên</label>
            <span onClick={() => setAddUser(true)}>Thêm</span>
            <button onClick={handleCreateGroup}>Tạo nhóm</button>

            {addUser && (
              <div className="listFriend">
                <GrClose className="closeTag" onClick={handleCloseTagUser} />
                <div className="titleFriend">Tất cả bạn bè</div>
                <div className="friends">
                  {friends &&
                    friends.map((friend) => (
                      <div className="friend" key={friend._id}>
                        <div>
                          <img src={friend?.avatar.url} alt="" />
                          <div className="name">{friend.name}</div>
                        </div>

                        <input
                          type="checkbox"
                          className="choseFriend"
                          onChange={() => handleAddUser(friend._id)}
                        />
                      </div>
                    ))}
                </div>
                <button onClick={() => setAddUser(false)}>Thêm</button>
              </div>
            )}
          </form>
        </div>
      )}
    </div>
  );
};

export default Chat;
