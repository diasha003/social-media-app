import { useDispatch, useSelector } from "react-redux";
import FlexBetween from "../../components/FlexBetween";
import { Friend } from "../../components/Friend";
import WidgetWrapper from "../../components/WidgetWrapper";
import axios from "axios";
import { useEffect } from "react";
import { setFriends } from "../../store/authSlice";
import { Box, Typography } from "@mui/material";

export const FriendListWidget = ({ userId }) => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const friends = useSelector((state) => state.user.friends);

  const getFriends = async () => {
    const responce = await axios.get(
      `http://localhost:3001/users/${userId}/friends`,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    const allFriends = responce.data;
    dispatch(setFriends({ friends: allFriends }));
    //console.log(allFriends);
  };

  useEffect(() => {
    getFriends();
  }, []);

  return (
    <WidgetWrapper>
      <Typography variant="h6" fontWeight="700" sx={{ mb: "1.5rem" }}>
        Friend List
      </Typography>
      <Box display="flex" flexDirection="column" gap="1.5rem">
        {friends.map((friend) => (
          <Friend
            key={friend._id}
            friendId={friend._id}
            name={`${friend.firstName} ${friend.lastName}`}
            userPicturePath={friend.picturePath}
            occupation={friend.occupation}
          ></Friend>
        ))}
      </Box>
    </WidgetWrapper>
  );
};
