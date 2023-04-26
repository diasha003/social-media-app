import {
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  ShareOutlined,
  Troubleshoot,
} from "@mui/icons-material";

import { Box, CardMedia, Divider, IconButton, Typography } from "@mui/material";
import WidgetWrapper from "../../components/WidgetWrapper";

import { Friend } from "../../components/Friend";
import axios from "axios";
import { useEffect, useState } from "react";
import FlexBetween from "../../components/FlexBetween";
import { useDispatch, useSelector } from "react-redux";
import { setPost } from "../../store/authSlice";

export const PostWidget = ({
  _id,
  userId,
  description,
  likes,
  comments,
  createdAt,
  picturePath,
  name,
  userPicturePath,
}) => {
  useEffect(() => {}, []);
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const loggedInUserId = useSelector((state) => state.user._id);
  const [isComments, setIsComments] = useState(false);
  const isLiked = Boolean(likes[loggedInUserId]);
  const countLikes = Object.keys(likes).length;

  //console.log(comments);

  const patchLike = async () => {
    const response = await axios.patch(
      `http://localhost:3001/posts/${_id}/like`,
      { loggedInUserId: loggedInUserId },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );

    const updatedPost = response.data;
    dispatch(setPost({ post: updatedPost }));
  };

  return (
    <WidgetWrapper mt="1rem">
      <Friend
        friendId={userId}
        createdAt={createdAt}
        name={name}
        userPicturePath={userPicturePath}
      ></Friend>
      <Typography sx={{ mb: "10px", wordBreak: "break-word" }}>
        {description}
      </Typography>

      {picturePath && (
        <Box>
          <CardMedia
            component="img"
            height="550"
            src={`http://localhost:3001/assets/${picturePath}`}
          />
        </Box>
      )}

      <FlexBetween>
        <FlexBetween gap="1rem">
          <FlexBetween gap="0.3rem">
            <IconButton sx={{ color: "#000000" }} onClick={patchLike}>
              {!isLiked ? (
                <FavoriteBorderOutlined></FavoriteBorderOutlined>
              ) : (
                <FavoriteOutlined></FavoriteOutlined>
              )}
            </IconButton>
            <Typography>{countLikes}</Typography>
          </FlexBetween>
          <FlexBetween gap="0.3rem">
            <IconButton
              sx={{ color: "#000000" }}
              onClick={() => setIsComments(!isComments)}
            >
              <ChatBubbleOutlineOutlined></ChatBubbleOutlineOutlined>
            </IconButton>
            <Typography>{comments.length}</Typography>
          </FlexBetween>
        </FlexBetween>
      </FlexBetween>

      {isComments && (
        <Box mt="0.5rem">
          <Box>
            <Divider />
            <Typography sx={{ m: "0.5rem 0", pl: "1rem" }}>comment</Typography>
          </Box>

          <Divider />
        </Box>
      )}
    </WidgetWrapper>
  );
};

/*

 <Box mt="0.5rem">
          {comments.map((comment, i) => (
            <Box key={`${name}-${i}`}>
              <Divider />
              <Typography sx={{ m: "0.5rem 0", pl: "1rem" }}>
                comment
              </Typography>
            </Box>
          ))}
          <Divider />
        </Box>
        */
