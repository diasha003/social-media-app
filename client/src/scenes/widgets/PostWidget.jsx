import {
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
} from "@mui/icons-material";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Box, CardMedia, IconButton, Typography } from "@mui/material";
import WidgetWrapper from "../../components/WidgetWrapper";
import { Friend } from "../../components/Friend";
import axios from "axios";
import { useEffect, useState } from "react";
import FlexBetween from "../../components/FlexBetween";
import { useDispatch, useSelector } from "react-redux";
import { setCountLike, setPost, setPosts } from "../../store/authSlice";
import { EditPost } from "./EditPost";
import { CommentsWidget } from "./CommentsWidget";

export const PostWidget = ({
  _id,
  postUserId,
  description,
  likes,

  createdAt,
  picturePath,
  name,
  userPicturePath,
  editing,
  isProfile = false,
}) => {
  useEffect(() => {}, []);
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const loggedInUserId = useSelector((state) => state.user._id);
  const [isComments, setIsComments] = useState(false);
  const isLiked = Boolean(likes[loggedInUserId]);
  const countLikes = Object.keys(likes).length;
  const loggedInUser = useSelector((state) => state.user._id);

  const [selectedPost, setSelectedPost] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEditClick = (description, picturePath, _id) => {
    setSelectedPost({
      description: description,
      picturePath: picturePath,
      _id: _id,
    });

    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setSelectedPost(null);
    setIsModalOpen(false);
  };

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
    dispatch(setCountLike({ userId: postUserId }));
  };

  const deletePost = async () => {
    const response = await axios.delete(
      `http://localhost:3001/posts/${_id}`,

      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    const newPosts = response.data;
    //console.log(newPosts);
    dispatch(setPosts({ posts: newPosts }));
  };

  return (
    <WidgetWrapper mb="1rem">
      <Friend
        friendId={postUserId}
        createdAt={createdAt}
        name={name}
        userPicturePath={userPicturePath}
        editing={editing}
      ></Friend>
      <Typography sx={{ mb: "10px", wordBreak: "break-word" }}>
        {description}
      </Typography>

      {picturePath && (
        <Box>
          <CardMedia
            component="img"
            height="600"
            src={`http://localhost:3001/assets/${picturePath}`}
          />
        </Box>
      )}

      <FlexBetween sx={{ mt: "3px" }}>
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
            <Typography>{}</Typography>
          </FlexBetween>
        </FlexBetween>
        {postUserId === loggedInUser ? (
          <FlexBetween gap="1rem">
            <IconButton
              sx={{ color: "#000000" }}
              onClick={() => handleEditClick(description, picturePath, _id)}
            >
              <EditOutlinedIcon></EditOutlinedIcon>
            </IconButton>
            <IconButton sx={{ color: "#000000" }} onClick={deletePost}>
              <DeleteOutlineOutlinedIcon></DeleteOutlineOutlinedIcon>
            </IconButton>
          </FlexBetween>
        ) : (
          <></>
        )}
      </FlexBetween>

      {isComments && (
        <Box mt="0.5rem">
          <CommentsWidget postId={_id}></CommentsWidget>
        </Box>
      )}

      {selectedPost && (
        <EditPost
          post={selectedPost}
          isOpen={isModalOpen}
          onClose={handleModalClose}
        />
      )}
    </WidgetWrapper>
  );
};
