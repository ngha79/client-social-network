import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import userService from "./userService";

const initialState = {
  people: [],
  friends: [],
  sendInvite: [],
  invitedFriends: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

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
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserIsNotFriend.fulfilled, (state, action) => {
        state.people = action.payload;
      })
      .addCase(allFriend.fulfilled, (state, action) => {
        state.friends = action.payload;
      })
      .addCase(allSendFriend.fulfilled, (state, action) => {
        state.sendInvite = action.payload;
      })
      .addCase(allInviteFriend.fulfilled, (state, action) => {
        state.invitedFriends = action.payload;
      })
      .addCase(addFriend.fulfilled, (state, action) => {
        const newPeople = state.people.filter(
          (user) => user._id !== action.payload._id
        );
        state.people = newPeople;
        const newFriends = state.sendInvite.concat(action.payload);
        state.sendInvite = newFriends;
      })
      .addCase(acceptFriend.fulfilled, (state, action) => {
        const newInvite = state.invitedFriends.filter(
          (user) => user._id !== action.payload._id
        );
        state.invitedFriends = newInvite;
        const newFriends = state.friends.concat(action.payload);
        state.friends = newFriends;
      })
      .addCase(deleteFriend.fulfilled, (state, action) => {
        const newFriends = state.friends.filter(
          (user) => user._id !== action.payload._id
        );
        state.friends = newFriends;
      })
      .addCase(deleteSendFriend.fulfilled, (state, action) => {
        const newFriends = state.sendInvite.filter(
          (user) => user._id !== action.payload._id
        );
        state.sendInvite = newFriends;
      })
      .addCase(deleteInvitedFriend.fulfilled, (state, action) => {
        const newFriends = state.invitedFriends.filter(
          (user) => user._id !== action.payload._id
        );
        state.invitedFriends = newFriends;
      });
  },
});

export const { reset } = userSlice.actions;
export default userSlice.reducer;
