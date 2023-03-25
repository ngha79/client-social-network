import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import commentsService from "./commentService";

const initialState = {
  comments: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

export const getAllComments = createAsyncThunk(
  "comments/getAll",
  async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await commentsService.getAllComments(token, data);
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

export const commentPost = createAsyncThunk(
  "comments/commentPost",
  async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      const comment = await commentsService.commentPost(token, data);
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

export const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    resetComment: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(commentPost.fulfilled, (state, action) => {
      // state.posts = {...state.posts, state.po}
      const updateComments = state.comments.map((comment) => {
        if (comment._id === action.payload._id) {
          return action.payload;
        }
        return comment;
      });
      state.comments = updateComments;
    });
  },
});

export const { resetComment } = commentsSlice.actions;
export default commentsSlice.reducer;
