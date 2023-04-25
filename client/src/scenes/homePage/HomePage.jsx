import { Box } from "@mui/material";
import UserImage from "../../components/UserImage";
import NavBar from "../navBar/NavBar";
import WidgetWrapper from "../../components/WidgetWrapper";
import UserWidget from "../widgets/UserWidget";
import { useSelector } from "react-redux";
import { MyPostWidget } from "../widgets/MyPostWidget";

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
      <Box flexBasis="42%">
        <MyPostWidget userId={_id} picturePath={picturePath}></MyPostWidget>
      </Box>
      <Box flexBasis="22%" sx={{ background: "#cdf9db" }}>
        3
      </Box>
    </Box>
  );
};

export default HomePage;
