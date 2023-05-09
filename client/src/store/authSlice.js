import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    darkMode: false,
    user: null,
    userFriends: [],
    friendFriends: [],
    token: null,
    posts: [],
    countLike: 0,
    filteredPosts: [],
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
      state.userFriends = [];
      state.friendFriends = [];
    },
    setFriends(state, action) {
      state.userFriends = action.payload.friends;
    },
    setFriendFriends(state, action) {
      state.friendFriends = action.payload.friends;
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
    setFilteredPosts(state, action) {
      const filteredPosts = state.posts.filter((post) =>
        post.description.includes(action.payload)
      );

      state.filteredPosts = filteredPosts;
    },
    setFilteredClear(state, action) {
      state.filteredPosts = [];
    },
    setCountLike(state, action) {
      //console.log(action.payload);
      let allCount = 0;
      state.posts.map((post) => {
        if (post.userId === action.payload.userId) {
          allCount += Object.keys(post.likes).length;
        }
      });
      state.countLike = allCount;
      console.log(state.countLike);
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
  setCountLike,
  setFriendFriends,
  setFilteredPosts,
  setFilteredClear,
} = authSlice.actions;
export default authSlice.reducer;
