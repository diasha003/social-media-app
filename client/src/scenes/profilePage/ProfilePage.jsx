import { Box } from "@mui/material";
import { UserWidget } from "../widgets/UserWidget";
import { PostsWidget } from "../widgets/PostsWidget";
import { FriendListWidget } from "../widgets/FriendListWidget";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

export const ProfilePage = () => {
  const [user, setUser] = useState(null);

  const { userId } = useParams();
  const token = useSelector((state) => state.token);

  const getUser = async () => {
    const result = await axios.patch(
      `http://localhost:3001/users/${userId}`,
      {},
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );

    setUser(result.data);
  };

  useEffect(() => {
    getUser();
  }, []);

  if (!user) return null;
  return (
    <Box>
      <Box
        width="100%"
        padding="2rem 6%"
        display="flex"
        gap="2rem"
        justifyContent="center"
      >
        <Box flexBasis="26%">
          <UserWidget userId={userId} picturePath={user.picturePath} />
          <Box m="2rem 0" />
          <FriendListWidget user={user} />
        </Box>
        <Box flexBasis="42%">
          <PostsWidget userId={userId} isProfile={true} />
        </Box>
      </Box>
    </Box>
  );
};
