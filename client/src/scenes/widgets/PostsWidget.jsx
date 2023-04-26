import { useDispatch, useSelector } from "react-redux";
import { PostWidget } from "./PostWidget";
import { useEffect, useState } from "react";
import axios from "axios";
import { setPosts } from "../../store/authSlice";
import { useSearchParams } from "react-router-dom";

export const PostsWidget = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);
  const [infoUserPost, setInfoUserPost] = useState([]);
  //console.log(posts.length);
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

  useEffect(() => {
    getAllPosts();
    //console.log(posts);
  }, []);

  return (
    <>
      {posts.length === 0 ? (
        <></>
      ) : (
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
          }) => (
            <PostWidget
              key={_id}
              _id={_id}
              userId={userId}
              description={description}
              likes={likes}
              comments={comments}
              createdAt={createdAt}
              name={`${firstName} ${lastName}`}
              userPicturePath={userPicturePath}
              picturePath={picturePath}
            ></PostWidget>
          )
        )
      )}
    </>
  );
};
