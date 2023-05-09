import { Box, IconButton, Typography } from "@mui/material";
import Moment from "react-moment";
import FlexBetween from "./FlexBetween";
import UserImage from "./UserImage";
import PersonAddOutlinedIcon from "@mui/icons-material/PersonAddOutlined";
import PersonRemoveOutlinedIcon from "@mui/icons-material/PersonRemoveOutlined";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setFriendFriends, setFriends } from "../store/authSlice";
import { useNavigate, useParams } from "react-router-dom";

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
  const userFriends = useSelector((state) => state.userFriends);

  const isFriend = userFriends.find((friend) => friend._id === friendId);

  const { userId } = useParams();

  const patchFriend = async () => {
    //console.log("!!! ", userId);
    const res = await axios.patch(
      `http://localhost:3001/users/${_id}/${friendId}`,
      { friendId: friendId },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );

    const result = res.data;
    //console.log(result);
    dispatch(setFriends({ friends: result.formattedFriends }));
    if (userId) {
      userId === friendId &&
        dispatch(setFriendFriends({ friends: result.formattedFriendFriends }));
    }
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
