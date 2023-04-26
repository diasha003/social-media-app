import { Box, Divider, IconButton, Typography } from "@mui/material";
import FlexBetween from "../../components/FlexBetween";
import WidgetWrapper from "../../components/WidgetWrapper";
import UserImage from "../../components/UserImage";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import {
  ManageAccountsOutlined,
  EditOutlined,
  LocationOnOutlined,
  WorkOutlineOutlined,
  LinkedInOutlined,
} from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

const UserWidget = ({ userId, picturePath }) => {
  const [user, setUser] = useState(null);
  const token = useSelector((state) => state.token);

  useEffect(() => {
    getUser();
    //console.log(picturePath);
  }, []);

  const getUser = async () => {
    const result = await axios.get(`http://localhost:3001/users/${userId}`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    //console.log(result.data);
    setUser(result.data);
  };

  if (!user) {
    return null;
  }

  const {
    firstName,
    lastName,
    location,
    occupation,
    viewedProfile,
    impressions,
    friends,
  } = user;

  return (
    <WidgetWrapper>
      <FlexBetween gap="1rem" pb="1rem">
        <FlexBetween gap="0.1rem">
          <UserImage image={picturePath} size="50px"></UserImage>
          <Box>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                color: "black",
              }}
            >
              {firstName} {lastName}
            </Typography>
            <Typography color="#00353F">{friends.length} friends</Typography>
          </Box>
        </FlexBetween>
        <IconButton sx={{ color: "#000000" }}>
          <ManageAccountsOutlined />
        </IconButton>
      </FlexBetween>

      <Divider></Divider>

      <Box py="1rem">
        <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
          <LocationOnOutlined fontSize="medium" />
          <Typography>{location}</Typography>
        </Box>
        <Box display="flex" alignItems="center" gap="1rem">
          <WorkOutlineOutlined fontSize="medium"></WorkOutlineOutlined>
          <Typography>{occupation}</Typography>
        </Box>
      </Box>

      <Divider></Divider>

      <Box py="1rem">
        <FlexBetween gap="1rem" mb="0.5rem">
          <Typography color="#00353F">Who's viewed your profile</Typography>
          <Typography color="#00353F" fontWeight="600">
            {viewedProfile}
          </Typography>
        </FlexBetween>
        <FlexBetween gap="1rem">
          <Typography color="#00353F">Impressions of your post</Typography>
          <Typography color="#00353F" fontWeight="600">
            {impressions}
          </Typography>
        </FlexBetween>
      </Box>

      <Divider></Divider>

      <Box p="1rem 0">
        <Typography fontSize="1rem" fontWeight="500" mb="1rem">
          Social Profiles
        </Typography>

        <FlexBetween gap="1rem" mb="0.5rem">
          <FlexBetween gap="1rem">
            <InstagramIcon></InstagramIcon>
            <Box>
              <Typography fontWeight="500" variant="h7">
                Instagram
              </Typography>
              <Typography color="#00353F">Social Network</Typography>
            </Box>
          </FlexBetween>
          <IconButton sx={{ color: "#000000" }}>
            <EditOutlined />
          </IconButton>
        </FlexBetween>

        <FlexBetween gap="1rem">
          <FlexBetween gap="1rem">
            <LinkedInIcon />
            <Box>
              <Typography fontWeight="500" variant="h7">
                Linkedin
              </Typography>
              <Typography color="#00353F">Network Platform</Typography>
            </Box>
          </FlexBetween>
          <IconButton sx={{ color: "#000000" }}>
            <EditOutlined />
          </IconButton>
        </FlexBetween>
      </Box>
    </WidgetWrapper>
  );
};

export default UserWidget;