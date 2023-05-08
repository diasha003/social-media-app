import { Box, IconButton, Typography } from "@mui/material";
import Moment from "react-moment";
import FlexBetween from "./FlexBetween";
import UserImage from "./UserImage";
import PersonAddOutlinedIcon from "@mui/icons-material/PersonAddOutlined";
import PersonRemoveOutlinedIcon from "@mui/icons-material/PersonRemoveOutlined";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setFriends } from "../store/authSlice";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export const Friend = ({
  friendId,
  createdAt,
  name,
  userPicturePath,
  occupation,
  editing,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => {
    return state.token;
  });
  const friends = useSelector((state) => state.userFriends);

  const isFriend = friends.find((friend) => friend._id === friendId);

  const patchFriend = async () => {
    const res = await axios.patch(
      `http://localhost:3001/users/${_id}/${friendId}`,
      _id,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );

    //console.log(res.data);
    const result = res.data;
    dispatch(setFriends({ friends: result }));
  };

  return (
    <FlexBetween>
      <FlexBetween gap="1rem" pb="1rem">
        <UserImage size="50px" image={userPicturePath}></UserImage>

        <Box
          onClick={() => {
            navigate(`/profile/${friendId}`);
            navigate(0);
          }}
        >
          <Typography variant="h7" sx={{ cursor: "pointer" }}>
            {name}
          </Typography>

          {occupation ? (
            <Typography fontSize="12px">{occupation}</Typography>
          ) : (
            <Box display="flex" alignContent="center">
              <Typography fontSize="0.75rem">
                <Moment fromNow>{createdAt}</Moment>
              </Typography>

              {editing && (
                <Typography
                  fontSize="12px"
                  pl="4px"
                  sx={{ fontStyle: "italic" }}
                >
                  (Edited)
                </Typography>
              )}
            </Box>
          )}
        </Box>
      </FlexBetween>
      {friendId !== _id ? (
        <IconButton sx={{ color: "#000000" }} onClick={() => patchFriend()}>
          {isFriend ? (
            <PersonRemoveOutlinedIcon></PersonRemoveOutlinedIcon>
          ) : (
            <PersonAddOutlinedIcon></PersonAddOutlinedIcon>
          )}
        </IconButton>
      ) : (
        <></>
      )}
    </FlexBetween>
  );
};
