import { useDispatch, useSelector } from "react-redux";
import { PostWidget } from "./PostWidget";
import { useEffect, useState } from "react";
import axios from "axios";
import { setPosts } from "../../store/authSlice";
import { EditPost } from "./EditPost";

export const PostsWidget = ({ userId, isProfile = false }) => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);
  const filteredPosts = useSelector((state) => state.filteredPosts);
  const token = useSelector((state) => state.token);

  const getAllPosts = async () => {
    const allPosts = await axios.get("http://localhost:3001/posts", {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    const allGetPosts = allPosts.data;

    dispatch(setPosts({ posts: allGetPosts.post }));

    //console.log(allGetPosts.post);
  };

  const getUserPosts = async () => {
    const allUserPosts = await axios.get(
      `http://localhost:3001/posts/${userId}/posts`,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    const allGetPosts = allUserPosts.data;

    dispatch(setPosts({ posts: allGetPosts }));

    //console.log(allGetPosts.post);
  };

  useEffect(() => {
    if (isProfile) {
      getUserPosts();
    } else {
      getAllPosts();
    }
    //console.log(posts);
  }, []);

  return (
    <>
      {filteredPosts && filteredPosts.length !== 0
        ? filteredPosts.map(
            ({
              _id,
              userId,
              description,
              firstName,
              lastName,
              userPicturePath,
              picturePath,
              likes,
              comments,
              createdAt,
              updatedAt,
              editing,
            }) => (
              <>
                <PostWidget
                  key={_id}
                  _id={_id}
                  postUserId={userId}
                  description={description}
                  likes={likes}
                  comments={comments}
                  createdAt={createdAt}
                  name={`${firstName} ${lastName}`}
                  userPicturePath={userPicturePath}
                  picturePath={picturePath}
                  updatedAt={updatedAt}
                  editing={editing}
                  isProfile={isProfile}
                ></PostWidget>
              </>
            )
          )
        : posts.length !== 0 &&
          posts.map(
            ({
              _id,
              userId,
              description,
              firstName,
              lastName,
              userPicturePath,
              picturePath,
              likes,
              comments,
              createdAt,
              updatedAt,
              editing,
            }) => (
              <>
                <PostWidget
                  key={_id}
                  _id={_id}
                  postUserId={userId}
                  description={description}
                  likes={likes}
                  comments={comments}
                  createdAt={createdAt}
                  name={`${firstName} ${lastName}`}
                  userPicturePath={userPicturePath}
                  picturePath={picturePath}
                  updatedAt={updatedAt}
                  editing={editing}
                  isProfile={isProfile}
                ></PostWidget>
              </>
            )
          )}
    </>
  );
};
