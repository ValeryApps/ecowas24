import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetch_Posts, fetch_posts_by_id } from "../../api/postApi";

const initialState = {
  posts: [],
  status: "idle", //'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

export const fetPostsAsync = createAsyncThunk(
  "posts/fetPostsAsync",
  async () => {
    try {
      const data = await fetch_Posts();
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);
export const fetPostByIdAsync = createAsyncThunk(
  "posts/fetchPostById",
  async (postId) => {
    try {
      const data = await fetch_posts_by_id(postId);
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    createPost: (state, action) => {
      state.posts.splice(0, 0, action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetPostsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetPostsAsync.fulfilled, (state, action) => {
        state.posts = action.payload;
        state.status = "succeeded";
      })
      .addCase(fetPostsAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(fetPostByIdAsync.fulfilled, (state, action) => {
        state.posts.find((x) => x.slug === action.payload.slug);
      });
  },
});
export const selectAllPosts = (state) => state.posts;

export const { createPost } = postSlice.actions;
export default postSlice.reducer;
