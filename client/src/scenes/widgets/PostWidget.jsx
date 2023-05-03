import {
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
} from "@mui/icons-material";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

import {
  Box,
  CardMedia,
  Divider,
  IconButton,
  Typography,
  Modal,
  Button,
  TextField,
} from "@mui/material";
import Dropzone from "react-dropzone";

import WidgetWrapper from "../../components/WidgetWrapper";
import { Friend } from "../../components/Friend";
import axios from "axios";
import { useEffect, useState } from "react";
import FlexBetween from "../../components/FlexBetween";
import { useDispatch, useSelector } from "react-redux";
import { setPost } from "../../store/authSlice";
import { EditPost } from "./EditPost";

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
            <Typography>{comments.length}</Typography>
          </FlexBetween>
        </FlexBetween>
        {userId === loggedInUser ? (
          <FlexBetween gap="1rem">
            <IconButton
              sx={{ color: "#000000" }}
              onClick={() => handleEditClick(description, picturePath, _id)}
            >
              <EditOutlinedIcon></EditOutlinedIcon>
            </IconButton>
            <IconButton sx={{ color: "#000000" }}>
              <DeleteOutlineOutlinedIcon></DeleteOutlineOutlinedIcon>
            </IconButton>
          </FlexBetween>
        ) : (
          <></>
        )}
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
