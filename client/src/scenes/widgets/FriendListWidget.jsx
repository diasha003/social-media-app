import { useDispatch, useSelector } from "react-redux";
import FlexBetween from "../../components/FlexBetween";
import { Friend } from "../../components/Friend";
import WidgetWrapper from "../../components/WidgetWrapper";
import axios from "axios";
import { useEffect } from "react";
import { setFriends } from "../../store/authSlice";
import { Box, List, Typography } from "@mui/material";

export const FriendListWidget = ({ user }) => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const friends = useSelector((state) => state.userFriends);

  const getFriends = async () => {
    const responce = await axios.get(
      `http://localhost:3001/users/${user._id}/friends`,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    const allFriends = responce.data;
    console.log(allFriends);
    dispatch(setFriends({ friends: allFriends }));
    //console.log(allFriends);
  };

  useEffect(() => {
    getFriends();
  }, [user]);

  return (
    <WidgetWrapper>
      <Typography variant="h6" fontWeight="700" sx={{ mb: "1.5rem" }}>
        Friend List
      </Typography>

      <Box sx={{ height: "calc(100vh - 390px)" }} className="scroll">
        <Box sx={{ height: "100%" }}>
          <List sx={{ padding: 0, maxHeight: "100%", overflowY: "auto" }}>
            {friends.map((friend) => (
              <>
                <Friend
                  key={friend._id}
                  friendId={friend._id}
                  name={`${friend.firstName} ${friend.lastName}`}
                  userPicturePath={friend.picturePath}
                  occupation={friend.occupation}
                ></Friend>
              </>
            ))}
          </List>
        </Box>
      </Box>
    </WidgetWrapper>
  );
};
