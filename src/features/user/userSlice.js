import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import userService from "./userService";
import { socket } from "../../utils/socket";

const user = JSON.parse(localStorage.getItem("user"));

const initialState = {
  searchPeople: [],
  people: [],
  friends: [],
  sendInvite: [],
  invitedFriends: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

export const getUserByName = createAsyncThunk(
  "user/getUserByName",
  async (formData, thunkAPI) => {
    try {
      return await userService.getUserByName(formData);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getUserIsNotFriend = createAsyncThunk(
  "user/userIsNotfriend",
  async (data, thunkAPI) => {
    try {
      return await userService.getUserIsNotFriend(data);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const allFriend = createAsyncThunk(
  "user/allFriend",
  async (data, thunkAPI) => {
    try {
      return await userService.allFriend(data);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const allSendFriend = createAsyncThunk(
  "user/allSendFriend",
  async (data, thunkAPI) => {
    try {
      return await userService.allSendFriend(data);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const allInviteFriend = createAsyncThunk(
  "user/allInviteFriend",
  async (data, thunkAPI) => {
    try {
      return await userService.allInviteFriend(data);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const addFriend = createAsyncThunk(
  "user/addFriend",
  async (userId, thunkAPI) => {
    try {
      return await userService.addFriend(userId);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const acceptFriend = createAsyncThunk(
  "user/acceptFriend",
  async (userId, thunkAPI) => {
    try {
      return await userService.acceptFriend(userId);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const deleteFriend = createAsyncThunk(
  "user/deleteFriend",
  async (userId, thunkAPI) => {
    try {
      return await userService.deleteFriend(userId);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const deleteSendFriend = createAsyncThunk(
  "user/deleteSendFriend",
  async (userId, thunkAPI) => {
    try {
      return await userService.deleteSendFriend(userId);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const deleteInvitedFriend = createAsyncThunk(
  "user/deleteInvitedFriend",
  async (userId, thunkAPI) => {
    try {
      return await userService.deleteInvitedFriend(userId);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getInvitedFriend = createAsyncThunk(
  "user/getInvitedFriend",
  async (skip, thunkAPI) => {
    try {
      return await userService.getInvitedFriend(skip);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getSendFriend = createAsyncThunk(
  "user/getSendFriend",
  async (skip, thunkAPI) => {
    try {
      return await userService.getSendFriend(skip);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getMoreSuggestFriend = createAsyncThunk(
  "user/getMoreSuggestFriend",
  async (skip, thunkAPI) => {
    try {
      return await userService.getMoreSuggestFriend(skip);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = "";
    },
    addFriendInvited: (state, action) => {
      const newPeople = state.people.filter(
        (user) => user._id !== action.payload._id
      );
      state.people = newPeople;
      const newInvited = state.invitedFriends.filter(
        (user) => user._id !== action.payload._id
      );
      newInvited.push(action.payload);
      state.invitedFriends = newInvited;
    },
    acceptFriendInvited: (state, action) => {
      const newInvite = state.sendInvite.filter(
        (user) => user._id !== action.payload._id
      );
      state.sendInvite = newInvite;
      const newFriend = state.friends.filter(
        (user) => user._id !== action.payload._id
      );
      newFriend.push(action.payload);
      state.friends = newFriend;
    },
    unfriend: (state, action) => {
      const newFriends = state.friends.filter(
        (user) => user._id !== action.payload._id
      );
      state.friends = newFriends;
      const newPeople = state.people.filter(
        (user) => user._id !== action.payload._id
      );
      newPeople.push(action.payload);
      state.people = newPeople;
    },
    deleteSendInvitedFriend: (state, action) => {
      const newFriends = state.invitedFriends.filter(
        (user) => user._id !== action.payload._id
      );
      state.invitedFriends = newFriends;
      const newPeople = state.people.filter(
        (user) => user._id !== action.payload._id
      );
      newPeople.push(action.payload);
      state.people = newPeople;
    },
    refusedInvitedFriend: (state, action) => {
      const newFriends = state.sendInvite.filter(
        (user) => user._id !== action.payload._id
      );
      state.sendInvite = newFriends;
      const newPeople = state.people.filter(
        (user) => user._id !== action.payload._id
      );
      newPeople.push(action.payload);
      state.people = newPeople;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserByName.fulfilled, (state, action) => {
        state.searchPeople = action.payload;
      })
      .addCase(getUserIsNotFriend.fulfilled, (state, action) => {
        state.people = action.payload;
      })
      .addCase(allFriend.fulfilled, (state, action) => {
        state.friends = action.payload;
      })
      .addCase(allSendFriend.fulfilled, (state, action) => {
        state.sendInvite = action.payload;
      })
      .addCase(getInvitedFriend.fulfilled, (state, action) => {
        const friends = action.payload.map((friend) => {
          console.log(
            state.invitedFriends.some((user) => user._id === friend._id)
          );
          // if (!state.invitedFriends.some((user) => user._id === friend._id)) {
          //   state.invitedFriends.push(friend);
          // }
        });
        state.invitedFriends.push(...action.payload);
      })
      .addCase(getSendFriend.fulfilled, (state, action) => {
        state.sendInvite.push(...action.payload);
      })
      .addCase(getMoreSuggestFriend.fulfilled, (state, action) => {
        state.people.push(...action.payload);
      })
      .addCase(allInviteFriend.fulfilled, (state, action) => {
        state.invitedFriends = action.payload;
      })
      .addCase(addFriend.fulfilled, (state, action) => {
        const newPeople = state.people.filter(
          (user) => user._id !== action.payload._id
        );
        state.people = newPeople;
        state.sendInvite.push(action.payload);
        socket.emit("add friend", user.user, action.payload._id);
      })
      .addCase(acceptFriend.fulfilled, (state, action) => {
        const newInvite = state.invitedFriends.filter(
          (user) => user._id !== action.payload._id
        );
        state.invitedFriends = newInvite;
        state.friends.push(action.payload);
        socket.emit("accept friend", user.user, action.payload._id);
      })
      .addCase(deleteFriend.fulfilled, (state, action) => {
        const newFriends = state.friends.filter(
          (user) => user._id !== action.payload._id
        );
        state.friends = newFriends;
        state.people.push(action.payload);
        socket.emit("unfriend", user.user, action.payload._id);
      })
      .addCase(deleteSendFriend.fulfilled, (state, action) => {
        const newFriends = state.sendInvite.filter(
          (user) => user._id !== action.payload._id
        );
        state.sendInvite = newFriends;
        state.people.push(action.payload);
        socket.emit("delete send friend", user.user, action.payload._id);
      })
      .addCase(deleteInvitedFriend.fulfilled, (state, action) => {
        const newFriends = state.invitedFriends.filter(
          (user) => user._id !== action.payload._id
        );
        state.invitedFriends = newFriends;
        state.people.push(action.payload);
        socket.emit("refuse invited friend", user.user, action.payload._id);
      });
  },
});

export const {
  reset,
  addFriendInvited,
  acceptFriendInvited,
  unfriend,
  deleteSendInvitedFriend,
  refusedInvitedFriend,
} = userSlice.actions;
export default userSlice.reducer;
