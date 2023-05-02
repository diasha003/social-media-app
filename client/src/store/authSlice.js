import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    darkMode: false,
    user: null,
    token: null,
    posts: [],
  },
  reducers: {
    setMode(state, action) {
      state.darkMode = !state.darkMode;
    },
    setLogin(state, action) {
      state.user = action.payload.user; //state - have access to initialState
      state.token = action.payload.token; //action - transfer from outside (action.payload)
    },
    setLogout(state, action) {
      state.user = null;
      state.token = null;
    },
    setFriends(state, action) {
      if (state.user) {
        state.user.friends = action.payload.friends;
      } else {
        console.error("user friends non-existent :(");
      }
    },
    setPosts(state, action) {
      //console.log(action.payload.posts);
      //state.posts = [];
      /*console.log(state.posts);
      state.posts = [...state.posts, action.payload.posts];*/
      state.posts = action.payload.posts;
    },
    setPost(state, action) {
      //console.log(action.payload.post);
      const updatePosts = state.posts.map((post) => {
        //console.log(post);
        if (post._id === action.payload.post._id) return action.payload.post;
        return post;
      });
      state.posts = updatePosts;
    },
  },
});

export const { setMode, setLogin, setLogout, setFriends, setPosts, setPost } =
  authSlice.actions;
export default authSlice.reducer;
