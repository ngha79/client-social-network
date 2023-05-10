import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import postsService from "./postService";

const initialState = {
  posts: [],
  post: [],
  comments: [],
  profileUser: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

export const getAllPost = createAsyncThunk(
  "posts/getAll",
  async (formData, thunkAPI) => {
    try {
      return await postsService.getAllPost(formData);
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

export const createPost = createAsyncThunk(
  "posts/createPost",
  async (data, thunkAPI) => {
    try {
      return await postsService.createPost(data);
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

export const deletePost = createAsyncThunk(
  "posts/deletePost",
  async (postid, thunkAPI) => {
    try {
      return await postsService.deletePost(postid);
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

export const likePost = createAsyncThunk(
  "posts/likePost",
  async (data, thunkAPI) => {
    try {
      const post = await postsService.likePost(data);
      return post.post;
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

export const unlikePost = createAsyncThunk(
  "posts/unlikePost",
  async (data, thunkAPI) => {
    try {
      const post = await postsService.unlikePost(data);
      return post.post;
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
  "posts/commentPost",
  async (data, thunkAPI) => {
    try {
      return await postsService.commentPost(data);
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

export const removeCommentPost = createAsyncThunk(
  "posts/removeCommentPost",
  async (data, thunkAPI) => {
    try {
      return await postsService.removeCommentPost(data);
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

export const getAllComments = createAsyncThunk(
  "posts/getAllComment",
  async (data, thunkAPI) => {
    try {
      return await postsService.getAllComments(data);
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

export const likeComment = createAsyncThunk(
  "posts/likeComment",
  async (commentId, thunkAPI) => {
    try {
      return await postsService.likeComment(commentId);
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

export const rmLikeComment = createAsyncThunk(
  "posts/rmLikeComment",
  async (commentId, thunkAPI) => {
    try {
      return await postsService.rmLikeComment(commentId);
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

export const addReplyComment = createAsyncThunk(
  "posts/addReplyComment",
  async (formData, thunkAPI) => {
    try {
      return await postsService.addReplyComment(formData);
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

export const deleteReplyComment = createAsyncThunk(
  "posts/deleteReplyComment",
  async (data, thunkAPI) => {
    try {
      return await postsService.deleteReplyComment(data);
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

export const likeReplyComment = createAsyncThunk(
  "posts/likeReplyComment",
  async (data, thunkAPI) => {
    try {
      return await postsService.likeReplyComment(data);
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

export const removeLikeReplyComment = createAsyncThunk(
  "posts/removeLikeReplyComment",
  async (data, thunkAPI) => {
    try {
      return await postsService.removeLikeReplyComment(data);
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

export const getUserById = createAsyncThunk(
  "auth/getUserById",
  async (id, thunkAPI) => {
    try {
      return await postsService.getUserById(id);
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

export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    setPosts: (state, action) => {
      let mergedColors = [
        ...state.posts,
        ...action.payload.posts.filter((c) => !state.posts.includes(c)),
      ];

      state.posts = mergedColors;
    },
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
    resetProfile: (state) => {
      state.profileUser = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllPost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllPost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.posts = action.payload;
        state.isSuccess = true;
      })
      .addCase(getAllPost.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.posts = null;
        state.message = action.payload;
      })
      .addCase(createPost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.posts.unshift(action.payload);
        state.isSuccess = true;
      })
      .addCase(createPost.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deletePost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.posts = state.posts.filter(
          (post) => post._id !== action.payload._id
        );
        state.isSuccess = true;
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(likePost.fulfilled, (state, action) => {
        const updatePosts = state.posts.map((post) => {
          if (post._id === action.payload._id) {
            return action.payload;
          }
          return post;
        });
        state.posts = updatePosts;
      })
      .addCase(unlikePost.fulfilled, (state, action) => {
        const updatePosts = state.posts.map((post) => {
          if (post._id === action.payload._id) {
            return action.payload;
          }
          return post;
        });
        state.posts = updatePosts;
      })
      .addCase(getAllComments.fulfilled, (state, action) => {
        const updatePosts = state.posts.map((post) => {
          if (post._id === action.payload._id) {
            return action.payload;
          }
          return post;
        });
        state.posts = updatePosts;
      })
      .addCase(commentPost.fulfilled, (state, action) => {
        const updatePosts = state.posts.map((post) => {
          if (post._id === action.payload._id) {
            return action.payload;
          }
          return post;
        });
        state.posts = updatePosts;
      })
      .addCase(removeCommentPost.fulfilled, (state, action) => {
        const updatePosts = state.posts.map((post) => {
          if (post._id === action.payload._id) {
            return action.payload;
          }
          return post;
        });
        state.posts = updatePosts;
      })
      .addCase(likeComment.fulfilled, (state, action) => {
        const updatePosts = state.posts.map((post) => {
          if (post._id === action.payload.post._id) {
            post.comments.map((comment) => {
              if (comment._id === action.payload._id) {
                comment.like = action.payload.like;
              }
              return comment;
            });
          }
          return post;
        });
        state.posts = updatePosts;
      })
      .addCase(rmLikeComment.fulfilled, (state, action) => {
        const updatePosts = state.posts.map((post) => {
          if (post._id === action.payload.post._id) {
            post.comments.map((comment) => {
              if (comment._id === action.payload._id) {
                comment.like = action.payload.like;
              }
              return comment;
            });
          }
          return post;
        });
        state.posts = updatePosts;
      })
      .addCase(addReplyComment.fulfilled, (state, action) => {
        const updatePosts = state.posts.map((post) => {
          if (post._id === action.payload.post) {
            post.comments.map((comment) => {
              if (comment._id === action.payload._id) {
                comment.reply = action.payload.reply;
              }
              return comment;
            });
          }
          return post;
        });
        state.posts = updatePosts;
      })
      .addCase(deleteReplyComment.fulfilled, (state, action) => {
        const updatePosts = state.posts.map((post) => {
          if (post._id === action.payload.post) {
            post.comments.map((comment) => {
              if (comment._id === action.payload._id) {
                comment.reply = action.payload.reply;
              }
              return comment;
            });
          }
          return post;
        });
        state.posts = updatePosts;
      })
      .addCase(likeReplyComment.fulfilled, (state, action) => {
        const updatePosts = state.posts.map((post) => {
          if (post._id === action.payload.post) {
            post.comments.map((comment) => {
              if (comment._id === action.payload._id) {
                comment.reply = action.payload.reply;
              }
              return comment;
            });
          }
          return post;
        });
        state.posts = updatePosts;
      })
      .addCase(removeLikeReplyComment.fulfilled, (state, action) => {
        const updatePosts = state.posts.map((post) => {
          if (post._id === action.payload.post) {
            post.comments.map((comment) => {
              if (comment._id === action.payload._id) {
                comment.reply = action.payload.reply;
              }
              return comment;
            });
          }
          return post;
        });
        state.posts = updatePosts;
      })
      .addCase(getUserById.fulfilled, (state, action) => {
        state.profileUser = action.payload;
        const newPost = action.payload.posts.filter((newpost) => {
          if (!state.posts.some((post) => post._id === newpost._id)) {
            return newpost;
          }
        });
        action.payload.posts = newPost;
        const update = state.posts.concat(action.payload.posts);
        state.posts = update;
      });
  },
});

export const { reset, setPosts, resetProfile } = postsSlice.actions;
export default postsSlice.reducer;
