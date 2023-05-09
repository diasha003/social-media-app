import { useDispatch, useSelector } from "react-redux";
import { Friend } from "../../components/Friend";
import WidgetWrapper from "../../components/WidgetWrapper";
import axios from "axios";
import { useEffect } from "react";
import { setFriendFriends, setFriends } from "../../store/authSlice";
import { Box, List, Typography } from "@mui/material";
import { useParams } from "react-router-dom";

export const FriendListWidget = ({ user, isProfile = false }) => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const { userId } = useParams();
  const friends = useSelector((state) =>
    isProfile ? state.friendFriends : state.userFriends
  );

  // console.log("user ", friendId);

  const getFriends = async () => {
    const responce = await axios.get(
      `http://localhost:3001/users/${isProfile ? userId : user._id}/friends`,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    const allFriends = responce.data;

    isProfile
      ? dispatch(setFriendFriends({ friends: allFriends }))
      : dispatch(setFriends({ friends: allFriends }));
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
            {friends &&
              friends.map((friend) => (
                <>
                  <Friend
                    key={friend._id}
                    friendId={friend._id}
                    userId={user._id}
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
