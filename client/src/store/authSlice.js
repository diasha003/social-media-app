import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    darkMode: false,
    user: null,
    userFriends: [],
    token: null,
    posts: [],
  },
  reducers: {
    setMode(state, action) {
      state.darkMode = !state.darkMode;
    },
    setLogin(state, action) {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setUpdateUser(state, action) {
      state.user = action.payload.user;
    },
    setLogout(state, action) {
      state.user = null;
      state.token = null;
    },
    setFriends(state, action) {
      state.userFriends = action.payload.friends;
    },
    setPosts(state, action) {
      /*console.log(state.posts);
      state.posts = [...state.posts, action.payload.posts];*/
      state.posts = action.payload.posts;
    },
    setPost(state, action) {
      const updatePosts = state.posts.map((post) => {
        if (post._id === action.payload.post._id) return action.payload.post;
        return post;
      });
      state.posts = updatePosts;
    },
  },
});

export const {
  setMode,
  setLogin,
  setLogout,
  setFriends,
  setPosts,
  setPost,
  setUpdateUser,
} = authSlice.actions;
export default authSlice.reducer;
