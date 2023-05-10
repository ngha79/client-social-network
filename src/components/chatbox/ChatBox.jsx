import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./chatbox.scss";
import InputEmoji from "react-input-emoji";
import { BsFillImageFill, BsTelephoneFill, BsThreeDots } from "react-icons/bs";
import { BiCloset, BiLike, BiLogOut, BiUserMinus } from "react-icons/bi";
import {
  AiFillBackward,
  AiFillInfoCircle,
  AiOutlineArrowLeft,
  AiOutlineClose,
  AiOutlineUserAdd,
} from "react-icons/ai";
import { HiUserGroup, HiUser } from "react-icons/hi";
import { MdGroupOff } from "react-icons/md";
import { RiUserShared2Line } from "react-icons/ri";
import { GrClose } from "react-icons/gr";
import moment_tz from "moment-timezone";
import moment from "moment";
import "moment/locale/vi";
import TextareaAutosize from "react-textarea-autosize";
import {
  createMessage,
  deleteMessage,
  likeMessage,
  receiverMessage,
  removeLikeMessage,
  messageDelete,
  sendMessageLike,
  sendMessageUnLike,
  kickMemberChat,
  addMemberChat,
  outChat,
  passLeaderChat,
  deleteChat,
  getAllChat,
  updateChat,
  resetNewChat,
  getMessages,
  updateChatSend,
  updateKickUserAndDropGroup,
  updateAddMember,
  deleteChatCurrent,
  updateChatAfterKick,
  updateChatAfterAddMember,
  exitChatCurrent,
  addGroup,
} from "../../features/chat/chatSlice";
import { socket } from "../../utils/socket";
import { Link, useLocation } from "react-router-dom";

const ChatBox = ({
  chat,
  user,
  setCurrentChat,
  profileUser,
  isMobile,
  setChatMobile,
}) => {
  const {
    messages,
    messageAction,
    messageDel,
    messageLike,
    messageUnLike,
    updateChatCurrent,
    messageNewChat,
    addMember,
    deleteOrDropChat,
    kickMember,
    exitChat,
    passLeader,
    memberKick,
    memberAdd,
  } = useSelector((state) => state.chat);
  const { friends } = useSelector((state) => state.user);
  const [newMessage, setNewMessage] = useState("");
  const [delMessage, setDelMessage] = useState(null);
  const [openMore, setOpenMore] = useState(false);
  const [showMembers, setShowMembers] = useState(false);
  const [addUserChat, setAddUserChat] = useState(false);
  const [userChat, setUserChat] = useState([]);
  const [image, setImage] = useState([]);
  const [file, setFile] = useState();
  const dispatch = useDispatch();
  const imageRef = useRef();
  const scroll = useRef();
  const textareaInput = useRef(null);

  const handleAddImage = (e) => {
    if (e.target.files) {
      setImage(e.target.files[0]);
      const fileArray = URL.createObjectURL(e.target.files[0]);
      setFile(fileArray);
      URL.revokeObjectURL(e.target.files[0]);
    }
  };

  const handleChange = (e) => {
    setNewMessage(e.target.value);
  };

  const location = useLocation();

  useEffect(() => {
    if (chat) {
      dispatch(getMessages(chat._id));
    }
  }, [profileUser]);

  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleCreateMessage = (e) => {
    e.preventDefault();
    const formData = new FormData();
    if (newMessage.length === 0 && image.length === 0) return;
    if (newMessage) {
      formData.append("message", newMessage);
    }
    formData.append("senderId", user._id);
    if (chat) {
      formData.append("chat", chat._id);
    }
    if (profileUser) {
      formData.append("receiver", profileUser._id);
    }
    formData.append("image", image);

    dispatch(createMessage(formData));
    location.state = null;
    setNewMessage("");
    setFile();
    setImage([]);
  };

  useEffect(() => {
    socket.emit("addMessage", {
      msg: messageAction,
      chatId: messageAction.chat,
    });
  }, [messageAction]);

  useEffect(() => {
    socket.on("receiverMessage", (chat) => {
      dispatch(receiverMessage(chat.receiver));
    });

    socket.on("updateMessageDel", (chat) => {
      dispatch(messageDelete(chat.delete));
    });
    socket.on("updateMessageLike", (chat) => {
      dispatch(sendMessageLike(chat.like));
    });
    socket.on("updateMessageUnLike", (chat) => {
      dispatch(sendMessageUnLike(chat.unlike));
    });
    socket.on("passLeaderSend", (chat) => {
      console.log(chat);
      dispatch(updateChatSend(chat.updateChat));
    });
    socket.on("addMemberSend", (chat) => {
      if (chat.memberId.some((member) => member === user._id.toString())) {
        dispatch(updateChatAfterAddMember(chat.updateChat));
      } else {
        dispatch(updateAddMember(chat.updateChat));
      }
      dispatch(updateChat());
    });
    socket.on("deleteChatSend", (chat) => {
      console.log(chat);
      dispatch(deleteChatCurrent(chat.updateChat));
      setCurrentChat();
      dispatch(updateChat());
    });
    socket.on("kickMemberSend", (chat) => {
      if (chat.memberId === user._id.toString()) {
        dispatch(updateChatAfterKick(chat.updateChat));
        setCurrentChat();
      } else {
        dispatch(updateKickUserAndDropGroup(chat.updateChat));
      }
      dispatch(updateChat());
    });
    socket.on("exitChatSend", (chat) => {
      dispatch(exitChatCurrent(chat.updateChat));
      dispatch(updateChat());
    });
    socket.on("create group", (group) => {
      dispatch(addGroup(group));
    });
  }, []);

  const handleSetDeleteMessage = (e, messageId) => {
    e.preventDefault();
    if (delMessage) {
      setDelMessage("");
    } else {
      setDelMessage(messageId);
    }
  };

  useEffect(() => {
    socket.emit("delMessage", {
      msg: messageDel,
      chatId: messageDel.chat,
    });
  }, [messageDel]);

  const handleDeleteMessage = (e, messageId) => {
    e.preventDefault();
    dispatch(deleteMessage(messageId));
  };

  const handleLikeMessage = (e, message) => {
    e.preventDefault();

    if (message.likes.some((like) => like === user._id)) {
      dispatch(removeLikeMessage(message._id));
    } else {
      dispatch(likeMessage(message._id));
    }
  };

  // useEffect(() => {
  //   socket.emit("likeMessage", {
  //     msg: messageLike,
  //     chatId: messageLike.chat,
  //   });
  // }, [messageLike]);

  // useEffect(() => {
  //   socket.emit("unlikeMessage", {
  //     msg: messageUnLike,
  //     chatId: messageUnLike.chat,
  //   });
  // }, [messageUnLike]);

  // useEffect(() => {
  //   socket.emit("passLeader", {
  //     msg: passLeader,
  //     chatId: passLeader._id,
  //   });
  // }, [passLeader]);

  // useEffect(() => {
  //   socket.emit("kickMember", {
  //     msg: kickMember,
  //     chatId: kickMember._id,
  //     memberKick: memberKick,
  //   });
  // }, [kickMember]);

  // useEffect(() => {
  //   socket.emit("addMember", {
  //     msg: addMember,
  //     chatId: addMember._id,
  //     memberId: memberAdd,
  //   });
  // }, [addMember]);

  // useEffect(() => {
  //   socket.emit("deleteChat", {
  //     msg: deleteOrDropChat,
  //     chatId: deleteOrDropChat._id,
  //   });
  // }, [deleteOrDropChat]);

  // useEffect(() => {
  //   socket.emit("exitChat", {
  //     msg: exitChat,
  //     chatId: exitChat._id,
  //   });
  // }, [exitChat]);

  const allUser = chat?.members.filter((member) => member._id !== user._id);

  const handleKickMember = (e, memberId) => {
    e.preventDefault();
    dispatch(kickMemberChat({ chatId: chat._id, memberId }));
    dispatch(updateChat());
  };

  const handleAddMember = (e) => {
    e.preventDefault();
    dispatch(addMemberChat({ memberId: userChat, chatId: chat._id }));
    dispatch(updateChat());
    setUserChat([]);
  };

  const handleOutChat = (e) => {
    e.preventDefault();
    dispatch(outChat({ chatId: chat._id }));
    setCurrentChat(null);
  };

  const handlePassLeader = (e, memberId) => {
    e.preventDefault();
    dispatch(passLeaderChat({ chatId: chat._id, memberId }));
    dispatch(updateChat());
  };

  const handleDeleteChat = (e) => {
    e.preventDefault();
    dispatch(deleteChat({ chatId: chat._id }));
    setCurrentChat(null);
  };

  const handleSetAddUserChat = () => {
    setAddUserChat(!addUserChat);
    if (showMembers) {
      setShowMembers(!showMembers);
    }
  };

  const handleShowMember = () => {
    if (addUserChat) {
      setAddUserChat(!addUserChat);
    }
    setShowMembers(!showMembers);
  };

  const handleAddUser = (friendId) => {
    if (!userChat.includes(friendId)) {
      setUserChat((userChat) => [...userChat, friendId]);
    } else {
      setUserChat((userChat) => userChat.slice(friendId, -1));
    }
  };

  const handleSetDeleteImage = () => {
    setFile();
    setImage([]);
  };

  if (profileUser && !chat) {
    function setchat() {
      return () => setChatMobile(true);
    }
    setchat();
  }
  return (
    <div className="chatBox">
      {profileUser && !chat && (
        <>
          <div className="chat-content">
            <div className="chat-header">
              <div className="chat-list">
                <div className="back-mobile">
                  {isMobile && (
                    <AiOutlineArrowLeft
                      size={24}
                      className="mobile"
                      onClick={() => setChatMobile(false)}
                    />
                  )}
                  <div className="follower">
                    <img src={profileUser?.avatar?.url} alt="" />
                    <div className="name">
                      <span>{profileUser?.name}</span>
                    </div>
                  </div>
                </div>
                <div
                  className="feature-chat"
                  onClick={() => setOpenMore(!openMore)}
                >
                  <AiFillInfoCircle />
                </div>
              </div>
            </div>

            <div className="chatBody">
              <div className="chatBody">
                {messageNewChat &&
                  messageNewChat.map((mess, index) => (
                    <div
                      key={mess?._id}
                      className={
                        mess?.senderId._id === user._id
                          ? "showMessage owns"
                          : "showMessage"
                      }
                    >
                      {mess?.senderId._id !== user._id && (
                        <div className="infoUser">
                          <img src={mess?.senderId?.avatar?.url} alt="" />
                        </div>
                      )}
                      <div
                        ref={scroll}
                        className={
                          mess?.senderId._id === user._id
                            ? "message own"
                            : "message"
                        }
                        key={index}
                      >
                        {mess?.senderId._id !== user._id && (
                          <span className="nameUserSend">
                            {mess.senderId.name}
                          </span>
                        )}

                        {mess && mess.isDeleted ? (
                          <>
                            <div>Tin nhắn đã bị xóa</div>
                          </>
                        ) : (
                          <>
                            {mess?.image && (
                              <img src={mess?.image?.url} alt="" />
                            )}
                            <span className="content-message">
                              {mess.message}
                            </span>
                            <span className="time">
                              {moment(
                                moment_tz(mess.createdAt)
                                  .tz("Asia/Ho_Chi_Minh")
                                  .format()
                              ).fromNow()}
                            </span>
                            {mess.likes && mess.likes.length > 0 && (
                              <div className="totalLikeMessage">
                                <BiLike className="icon" />
                                <span>{mess.likes.length}</span>
                              </div>
                            )}
                            <div className="featureMessage">
                              {mess?.senderId._id === user._id && (
                                <BsThreeDots
                                  className="icon more"
                                  onClick={(e) =>
                                    handleSetDeleteMessage(e, mess._id)
                                  }
                                />
                              )}
                              <BiLike
                                className="icon"
                                onClick={(e) => handleLikeMessage(e, mess)}
                              />

                              {delMessage === mess._id && (
                                <span
                                  className="deleteMessage"
                                  onClick={(e) =>
                                    handleDeleteMessage(e, mess._id)
                                  }
                                >
                                  Xóa
                                </span>
                              )}
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
            <div className="chatSender">
              {file && (
                <div className="show-image">
                  {file && <img src={file} />}

                  {file && (
                    <GrClose
                      className="delete-image"
                      onClick={handleSetDeleteImage}
                    />
                  )}
                </div>
              )}
              <div className="send-message">
                <div
                  onClick={() => imageRef.current.click()}
                  className="upload-image"
                >
                  <BsFillImageFill />
                </div>

                <input
                  ref={textareaInput}
                  autoFocus
                  type="text"
                  onChange={handleChange}
                  value={newMessage}
                  className="input-message"
                />
                <div
                  className="send-button button"
                  onClick={(e) => handleCreateMessage(e)}
                >
                  Gửi
                </div>
                <input
                  type="file"
                  style={{ display: "none" }}
                  ref={imageRef}
                  onChange={handleAddImage}
                />
              </div>
            </div>
          </div>

          {openMore && (
            <div className="about-chat">
              <div className="info-chat">
                <div className="about">
                  <img src={profileUser.avatar.url} alt="" />
                  <span>{profileUser.name}</span>
                </div>
              </div>
              <div className="feature">
                <div className="about-member">
                  <Link to={`/profile/${profileUser._id}`}>
                    <div className="member icon">
                      <HiUser />
                    </div>
                  </Link>
                  <span>Xem trang cá nhân</span>
                </div>
              </div>
              {addUserChat && (
                <div className="listFriend">
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
                  <button onClick={handleAddMember}>Thêm</button>
                </div>
              )}
              {showMembers && (
                <div className="listMembers">
                  {chat.members &&
                    chat.members.map((member) => (
                      <div className="about-member" key={member._id}>
                        <div className="info-member">
                          <img src={member?.avatar?.url} alt="" />
                          <div className="isLeader">
                            <span className="name-member">{member.name}</span>
                            {chat.leader === member._id && (
                              <span className="leader">Trưởng nhóm</span>
                            )}
                          </div>
                        </div>
                        <div className="drop-chat">
                          {chat.leader === user._id &&
                          member._id !== user._id ? (
                            <>
                              <RiUserShared2Line
                                className="icon"
                                onClick={(e) => handlePassLeader(e, member._id)}
                              />
                              <BiUserMinus
                                className="icon-kick icon"
                                onClick={(e) => handleKickMember(e, member._id)}
                              />
                            </>
                          ) : (
                            <></>
                          )}
                        </div>
                      </div>
                    ))}
                </div>
              )}
              <AiOutlineClose
                className="close-info"
                size={32}
                onClick={() => setOpenMore(false)}
              />
            </div>
          )}
        </>
      )}
      {!profileUser && chat && (
        <>
          <div className="chat-content">
            <div className="chat-header">
              <div className="chat-list">
                <div className="back-mobile">
                  {isMobile && (
                    <AiOutlineArrowLeft
                      size={32}
                      className="mobile"
                      onClick={() => setChatMobile(false)}
                    />
                  )}
                  <div className="follower">
                    <img
                      src={chat.image ? chat.image : allUser[0]?.avatar?.url}
                      alt=""
                    />
                    <div className="name">
                      <span>{chat.name ? chat.name : allUser[0].name}</span>
                    </div>
                  </div>
                </div>
                <div className="left-header">
                  <div
                    className="video-call"
                    onClick={() =>
                      window.open(
                        `http://localhost:3000/conversation/${chat._id}`,
                        "_blank"
                      )
                    }
                  >
                    <BsTelephoneFill />
                  </div>
                  <div
                    className="feature-chat"
                    onClick={() => setOpenMore(!openMore)}
                  >
                    <AiFillInfoCircle />
                  </div>
                </div>
              </div>
            </div>

            <div className="chatBody">
              {messages &&
                messages.map((mess, index) => (
                  <div
                    key={mess?._id}
                    className={
                      mess?.senderId._id === user._id
                        ? "showMessage owns"
                        : "showMessage"
                    }
                  >
                    {mess?.senderId._id !== user._id && (
                      <div className="infoUser">
                        <img src={mess?.senderId?.avatar?.url} alt="" />
                      </div>
                    )}
                    <div
                      ref={scroll}
                      className={
                        mess?.senderId._id === user._id
                          ? "message own"
                          : "message"
                      }
                      key={index}
                    >
                      {mess?.senderId._id !== user._id && (
                        <span className="nameUserSend">
                          {mess.senderId.name}
                        </span>
                      )}

                      {mess && mess.isDeleted ? (
                        <>
                          <div>Tin nhắn đã bị xóa</div>
                        </>
                      ) : (
                        <>
                          {mess?.image && <img src={mess?.image?.url} alt="" />}
                          <span className="content-message">
                            {mess.message}
                          </span>
                          <span className="time">
                            {moment(
                              moment_tz(mess.createdAt)
                                .tz("Asia/Ho_Chi_Minh")
                                .format()
                            ).fromNow()}
                          </span>
                          {mess.likes && mess.likes.length > 0 && (
                            <div className="totalLikeMessage">
                              <BiLike className="icon" />
                              <span>{mess.likes.length}</span>
                            </div>
                          )}
                          <div className="featureMessage">
                            {mess?.senderId._id === user._id && (
                              <BsThreeDots
                                className="icon more"
                                onClick={(e) =>
                                  handleSetDeleteMessage(e, mess._id)
                                }
                              />
                            )}
                            <BiLike
                              className="icon"
                              onClick={(e) => handleLikeMessage(e, mess)}
                            />

                            {delMessage === mess._id && (
                              <span
                                className="deleteMessage"
                                onClick={(e) =>
                                  handleDeleteMessage(e, mess._id)
                                }
                              >
                                Xóa
                              </span>
                            )}
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                ))}
            </div>
            <div className="chatSender">
              {file && (
                <div className="show-image">
                  {file && <img src={file} />}

                  {file && (
                    <GrClose
                      className="delete-image"
                      onClick={handleSetDeleteImage}
                    />
                  )}
                </div>
              )}
              <div className="send-message">
                <div
                  onClick={() => imageRef.current.click()}
                  className="upload-image"
                >
                  <BsFillImageFill />
                </div>

                <input
                  ref={textareaInput}
                  type="text"
                  onChange={handleChange}
                  value={newMessage}
                  className="input-message"
                />
                <div
                  className="send-button button"
                  onClick={(e) => handleCreateMessage(e)}
                >
                  Gửi
                </div>
                <input
                  type="file"
                  style={{ display: "none" }}
                  ref={imageRef}
                  onChange={handleAddImage}
                />
              </div>
            </div>
          </div>
          {openMore && (
            <div className="about-chat">
              <div className="info-chat">
                <div className="about">
                  <img
                    src={chat.image ? chat.image : allUser[0].avatar.url}
                    alt=""
                  />
                  <span>{chat.name ? chat.name : allUser[0].name}</span>
                </div>
              </div>
              <div className="feature">
                {!chat.leader && (
                  <div className="about-member">
                    <Link to={`/profile/${allUser[0]._id}`}>
                      <div className="member icon">
                        <HiUser />
                      </div>
                    </Link>
                    <span>Xem trang cá nhân</span>
                  </div>
                )}
                {chat.leader && (
                  <div className="about-member">
                    <div className="member icon" onClick={handleShowMember}>
                      <HiUserGroup />
                    </div>
                    <span>Tất cả thành viên</span>
                  </div>
                )}

                {chat.leader && (
                  <div className="about-member">
                    <div className="member icon" onClick={handleSetAddUserChat}>
                      <AiOutlineUserAdd />
                    </div>
                    <span>Thêm thành viên</span>
                  </div>
                )}

                {chat.leader && chat.leader !== user._id && (
                  <div className="about-out">
                    <div
                      className="out-group icon"
                      onClick={(e) => handleOutChat(e)}
                    >
                      <BiLogOut />
                    </div>
                    <span>Thoát</span>
                  </div>
                )}

                {chat.leader === user._id && (
                  <div className="about-out">
                    <div className="out-group icon" onClick={handleDeleteChat}>
                      <MdGroupOff />
                    </div>
                    <span>Giải tán nhóm</span>
                  </div>
                )}
              </div>
              {addUserChat && (
                <div className="listFriend">
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
                  <button onClick={handleAddMember}>Thêm</button>
                </div>
              )}
              {showMembers && (
                <div className="listMembers">
                  {chat.members &&
                    chat.members.map((member) => (
                      <div className="about-member" key={member._id}>
                        <div className="info-member">
                          <img src={member?.avatar?.url} alt="" />
                          <div className="isLeader">
                            <span className="name-member">{member.name}</span>
                            {chat.leader === member._id && (
                              <span className="leader">Trưởng nhóm</span>
                            )}
                          </div>
                        </div>
                        <div className="drop-chat">
                          {chat.leader === user._id &&
                          member._id !== user._id ? (
                            <>
                              <RiUserShared2Line
                                className="icon"
                                onClick={(e) => handlePassLeader(e, member._id)}
                              />
                              <BiUserMinus
                                className="icon-kick icon"
                                onClick={(e) => handleKickMember(e, member._id)}
                              />
                            </>
                          ) : (
                            <></>
                          )}
                        </div>
                      </div>
                    ))}
                </div>
              )}
              <AiOutlineClose
                className="close-info"
                size={32}
                onClick={() => setOpenMore(false)}
              />
            </div>
          )}
        </>
      )}
      {!profileUser && !chat && (
        <div className="empty-message">Nhấn để bắt đầu cuộc hội thoại....</div>
      )}
    </div>
  );
};

export default ChatBox;
