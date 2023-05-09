import { Box } from "@mui/material";
import { UserWidget } from "../widgets/UserWidget";
import { useSelector } from "react-redux";
import { MyPostWidget } from "../widgets/MyPostWidget";
import { PostsWidget } from "../widgets/PostsWidget";
import { FriendListWidget } from "../widgets/FriendListWidget";

const HomePage = () => {
  const user = useSelector((state) => state.user);

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      padding="2rem 3%"
      width="100%"
    >
      <Box flexBasis="22%">
        <UserWidget
          userId={user._id}
          picturePath={user.picturePath}
        ></UserWidget>
      </Box>
      <Box flexBasis="44%">
        <MyPostWidget
          userId={user._id}
          picturePath={user.picturePath}
        ></MyPostWidget>
        <PostsWidget></PostsWidget>
      </Box>
      <Box flexBasis="22%">
        <FriendListWidget user={user}></FriendListWidget>
      </Box>
    </Box>
  );
};

export default HomePage;
