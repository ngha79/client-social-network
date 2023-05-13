import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import chatService from "./chatService";
import { socket } from "../../utils/socket";

const initialState = {
  chat: [],
  updateChatCurrent: {},
  messages: [],
  messageAction: {},
  group: {},
  messageDel: {},
  messageLike: {},
  messageUnLike: {},
  messageNewChat: [],
  memberChat: {},
  deleteOrDropChat: {},
  kickMember: {},
  addMember: {},
  exitChat: {},
  passLeader: {},
  memberKick: "",
  memberAdd: "",
  isGetChat: false,
  callVideo: false,
};

export const getAllChat = createAsyncThunk(
  "chat/getAllChat",
  async (data, thunkAPI) => {
    try {
      return await chatService.getAllChat(data);
    } catch (error) {
      const message =
        error.message ||
        error.response.message ||
        error.response ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const createChat = createAsyncThunk(
  "chat/createChat",
  async (formData, thunkAPI) => {
    try {
      return await chatService.createChat(formData);
    } catch (error) {
      const message =
        error.message ||
        error.response.message ||
        error.response ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getChatByMember = createAsyncThunk(
  "chat/getChatByMember",
  async (formData, thunkAPI) => {
    try {
      return await chatService.getChatByMember(formData);
    } catch (error) {
      const message =
        error.message ||
        error.response.message ||
        error.response ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getMessages = createAsyncThunk(
  "chat/getMessages",
  async (data, thunkAPI) => {
    try {
      const comment = await chatService.getMessages(data);
      return comment;
    } catch (error) {
      const message =
        error.message ||
        error.response.message ||
        error.response ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);
export const createMessage = createAsyncThunk(
  "chat/createMessage",
  async (data, thunkAPI) => {
    try {
      const comment = await chatService.createMessage(data);
      return comment;
    } catch (error) {
      const message =
        error.message ||
        error.response.message ||
        error.response ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const deleteMessage = createAsyncThunk(
  "chat/deleteMessage",
  async (messageId, thunkAPI) => {
    try {
      const comment = await chatService.deleteMessage(messageId);
      return comment;
    } catch (error) {
      const message =
        error.message ||
        error.response.message ||
        error.response ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);
export const likeMessage = createAsyncThunk(
  "chat/likeMessage",
  async (messageId, thunkAPI) => {
    try {
      const comment = await chatService.likeMessage(messageId);
      return comment;
    } catch (error) {
      const message =
        error.message ||
        error.response.message ||
        error.response ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);
export const removeLikeMessage = createAsyncThunk(
  "chat/removeLikeMessage",
  async (messageId, thunkAPI) => {
    try {
      const comment = await chatService.removeLikeMessage(messageId);
      return comment;
    } catch (error) {
      const message =
        error.message ||
        error.response.message ||
        error.response ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const kickMemberChat = createAsyncThunk(
  "chat/kickMemberChat",
  async (chatId, memberId, thunkAPI) => {
    try {
      const comment = await chatService.kickMemberChat(chatId, memberId);
      return comment;
    } catch (error) {
      const message =
        error.message ||
        error.response.message ||
        error.response ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const addMemberChat = createAsyncThunk(
  "chat/addMemberChat",
  async (formData, thunkAPI) => {
    try {
      return await chatService.addMemberChat(formData);
    } catch (error) {
      const message =
        error.message ||
        error.response.message ||
        error.response ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const outChat = createAsyncThunk(
  "chat/outChat",
  async (chatId, thunkAPI) => {
    try {
      const comment = await chatService.outChat(chatId);
      return comment;
    } catch (error) {
      const message =
        error.message ||
        error.response.message ||
        error.response ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const passLeaderChat = createAsyncThunk(
  "chat/passLeaderChat",
  async (chatId, memberId, thunkAPI) => {
    try {
      const comment = await chatService.passLeaderChat(chatId, memberId);
      return comment;
    } catch (error) {
      const message =
        error.message ||
        error.response.message ||
        error.response ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const deleteChat = createAsyncThunk(
  "chat/deleteChat",
  async (chatId, thunkAPI) => {
    try {
      const comment = await chatService.deleteChat(chatId);
      return comment;
    } catch (error) {
      const message =
        error.message ||
        error.response.message ||
        error.response ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    reset: (state) => {
      state.chat = [];
    },
    resetMemberChat: (state) => {
      state.memberChat = {};
    },
    allChat: (state) => {
      state.chat = state.chat;
    },
    resetNewChat: (state) => {
      state.messageNewChat = [];
    },
    updateChat: (state) => {
      state.updateChatCurrent = {};
    },
    receiverMessage: (state, action) => {
      const allMessages = state.messages.some(
        (message) => message._id === action.payload._id
      );
      if (!allMessages) {
        state.messages.push(action.payload);
      }
    },
    messageDelete: (state, action) => {
      const allMessages = state.messages.map((message) => {
        if (message._id === action.payload._id) {
          return action.payload;
        }
        return message;
      });
      state.messages = allMessages;
    },
    sendMessageLike: (state, action) => {
      const allMessages = state.messages.map((message) => {
        if (message._id === action.payload._id) {
          return action.payload;
        }
        return message;
      });
      state.messages = allMessages;
    },
    sendMessageUnLike: (state, action) => {
      const allMessages = state.messages.map((message) => {
        if (message._id === action.payload._id) {
          return action.payload;
        }
        return message;
      });
      state.messages = allMessages;
    },
    updateChatSend: (state, action) => {
      const allChats = state.chat.map((chat) => {
        if (chat._id === action.payload._id) {
          return action.payload;
        }
        return chat;
      });
      state.chat = allChats;
      state.updateChatCurrent = action.payload;
    },
    updateAddMember: (state, action) => {
      const allChats = state.chat.map((chat) => {
        if (chat._id === action.payload._id) {
          return action.payload;
        }
        return chat;
      });
      state.chat = allChats;
      state.updateChatCurrent = action.payload;
    },
    updateChatAfterAddMember: (state, action) => {
      state.chat.push(action.payload);
      state.updateChatCurrent = action.payload;
    },
    updateKickUserAndDropGroup: (state, action) => {
      const allChats = state.chat.map((chat) => {
        if (chat._id === action.payload._id) {
          return action.payload;
        }
        return chat;
      });
      state.chat = allChats;
      state.updateChatCurrent = action.payload;
    },
    updateChatAfterKick: (state, action) => {
      const allChats = state.chat.filter(
        (chat) => chat._id !== action.payload._id
      );
      state.chat = allChats;
      state.updateChatCurrent = {};
    },
    deleteChatCurrent: (state, action) => {
      const allChats = state.chat.filter(
        (chat) => chat._id !== action.payload._id
      );
      state.chat = allChats;
      state.updateChatCurrent = {};
    },

    exitChatCurrent: (state, action) => {
      const allChats = state.chat.map((chat) => {
        if (chat._id === action.payload._id) {
          return action.payload;
        }
        return chat;
      });
      state.chat = allChats;
      state.updateChatCurrent = action.payload;
    },
    addGroup: (state, action) => {
      state.chat.push(action.payload);
    },
    callVideoChat: (state, action) => {
      state.callVideo = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllChat.fulfilled, (state, action) => {
        state.chat = action.payload;
        state.isGetChat = true;
        socket.emit("join chats", action.payload);
      })
      .addCase(createChat.fulfilled, (state, action) => {
        socket.emit("create group chat", action.payload);
        socket.emit("join chat", action.payload._id);
        state.chat.push(action.payload);
      })
      .addCase(getMessages.fulfilled, (state, action) => {
        state.messages = action.payload.messages;
      })
      .addCase(getChatByMember.fulfilled, (state, action) => {
        state.memberChat = action.payload;
      })
      .addCase(createMessage.fulfilled, (state, action) => {
        if (action.payload.newChat) {
          state.chat.push(action.payload.newChat);
          state.messages.push(action.payload.newMessage);
          state.updateChatCurrent = action.payload.newChat;
          socket.emit("new chat from user", action.payload.newChat);
          socket.emit("joinRoom", { chatId: action.payload.newChat._id });
        } else {
          state.messages.push(action.payload.newMessage);
          state.messageNewChat = [];
        }
        socket.emit("addMessage", {
          msg: action.payload.newMessage,
          chatId: action.payload.newMessage.chat,
        });
      })
      .addCase(deleteMessage.fulfilled, (state, action) => {
        const update = state.messages.map((message) => {
          if (message._id === action.payload._id) {
            return action.payload;
          }
          return message;
        });
        state.messages = update;
        state.messageDel = action.payload;
      })
      .addCase(likeMessage.fulfilled, (state, action) => {
        const update = state.messages.map((message) => {
          if (message._id === action.payload._id) {
            return action.payload;
          }
          return message;
        });
        state.messages = update;
        socket.emit("likeMessage", {
          msg: action.payload,
          chatId: action.payload.chat,
        });
      })
      .addCase(removeLikeMessage.fulfilled, (state, action) => {
        const update = state.messages.map((message) => {
          if (message._id === action.payload._id) {
            return action.payload;
          }
          return message;
        });
        state.messages = update;
        socket.emit("unlikeMessage", {
          msg: action.payload,
          chatId: action.payload.chat,
        });
      })
      .addCase(kickMemberChat.fulfilled, (state, action) => {
        const update = state.chat.map((chat) => {
          if (chat._id === action.payload.chat._id) {
            return action.payload.chat;
          }
          return chat;
        });
        state.chat = update;
        state.updateChatCurrent = action.payload.chat;
        console.log(action.payload);
        socket.emit("kickMember", {
          msg: action.payload.chat,
          chatId: action.payload.chat._id,
          memberId: action.payload.memberId,
        });
      })
      .addCase(addMemberChat.fulfilled, (state, action) => {
        const update = state.chat.map((chat) => {
          if (chat._id === action.payload.chat._id) {
            return action.payload.chat;
          }
          return chat;
        });
        state.chat = update;
        state.updateChatCurrent = action.payload.chat;
        socket.emit("addMember", {
          msg: action.payload.chat,
          chatId: action.payload.chat._id,
          memberId: action.payload.memberId,
        });
      })
      .addCase(outChat.fulfilled, (state, action) => {
        const update = state.chat.filter(
          (chat) => chat._id !== action.payload._id
        );
        state.chat = update;
        state.updateChatCurrent = {};
        socket.emit("exitChat", {
          msg: action.payload,
          chatId: action.payload._id,
        });
      })
      .addCase(passLeaderChat.fulfilled, (state, action) => {
        const update = state.chat.map((chat) => {
          if (chat._id === action.payload._id) {
            return action.payload;
          }
          return chat;
        });
        state.chat = update;
        state.updateChatCurrent = action.payload;
        socket.emit("passLeader", {
          msg: action.payload,
          chatId: action.payload._id,
        });
      })
      .addCase(deleteChat.fulfilled, (state, action) => {
        const update = state.chat.filter(
          (chat) => chat._id !== action.payload._id
        );
        state.chat = update;
        state.updateChatCurrent = {};
        socket.emit("deleteChat", {
          msg: action.payload,
          chatId: action.payload._id,
        });
      });
  },
});

export const {
  reset,
  allChat,
  resetMemberChat,
  resetNewChat,
  updateAddMember,
  updateChat,
  updateChatSend,
  updateKickUserAndDropGroup,
  receiverMessage,
  messageDelete,
  sendMessageLike,
  sendMessageUnLike,
  deleteChatCurrent,
  updateChatAfterKick,
  exitChatCurrent,
  updateChatAfterAddMember,
  addGroup,
  callVideoChat,
} = chatSlice.actions;
export const allMessages = (state) => state.chat.messages;
export default chatSlice.reducer;
