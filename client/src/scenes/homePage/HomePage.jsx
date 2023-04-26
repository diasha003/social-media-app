import { Box } from "@mui/material";
import UserImage from "../../components/UserImage";
import NavBar from "../navBar/NavBar";
import WidgetWrapper from "../../components/WidgetWrapper";
import UserWidget from "../widgets/UserWidget";
import { useSelector } from "react-redux";
import { MyPostWidget } from "../widgets/MyPostWidget";
import { PostWidget } from "../widgets/PostWidget";
import { PostsWidget } from "../widgets/PostsWidget";

const HomePage = () => {
  const { _id, picturePath } = useSelector((state) => state.user);

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      padding="2rem 3%"
      width="100%"
    >
      <Box flexBasis="22%">
        <UserWidget userId={_id} picturePath={picturePath}></UserWidget>
      </Box>
      <Box flexBasis="44%">
        <MyPostWidget userId={_id} picturePath={picturePath}></MyPostWidget>
        <PostsWidget></PostsWidget>
      </Box>
      <Box flexBasis="22%">
        <WidgetWrapper>3</WidgetWrapper>
      </Box>
    </Box>
  );
};

export default HomePage;
