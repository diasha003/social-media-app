import { Box, Divider, IconButton, Typography } from "@mui/material";
import FlexBetween from "../../components/FlexBetween";
import WidgetWrapper from "../../components/WidgetWrapper";
import UserImage from "../../components/UserImage";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import MapsUgcOutlinedIcon from "@mui/icons-material/MapsUgcOutlined";
import {
  ManageAccountsOutlined,
  EditOutlined,
  LocationOnOutlined,
  WorkOutlineOutlined,
  LinkedInOutlined,
} from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { EditUser } from "./EditUser";
import { useNavigate } from "react-router-dom";
import { setCountLike } from "../../store/authSlice";

export const UserWidget = ({ userId, picturePath, isProfile = false }) => {
  const [user, setUser] = useState(null);
  const [newUser, setNewUser] = useState(null);

  const token = useSelector((state) => state.token);
  const userIdLogin = useSelector((state) => state.user._id);
  const countLike = useSelector((state) => state.countLike);
  const countFriends = useSelector((state) =>
    isProfile ? state.friendFriends.length : state.userFriends.length
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const theme = useTheme();

  const handleEditClick = () => {
    setSelectedUser({ userId });
    setIsModalOpen(true);
  };

  const handleModalClose = (userNew) => {
    setSelectedUser(null);
    setIsModalOpen(false);
    setNewUser(userNew);
    setUser(userNew);
  };

  const handleMessage = () => {
    navigate("/chat", { state: { user: user } });
  };

  useEffect(() => {
    getUser();
  }, [newUser]);

  const getUser = async () => {
    const result = await axios.get(`http://localhost:3001/users/${userId}`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });

    setUser(result.data.user);
    dispatch(setCountLike({ userId: userId }));
  };

  if (!user) {
    return null;
  }

  const { firstName, lastName, location, occupation, viewedProfile } = user;

  return (
    <WidgetWrapper>
      <FlexBetween gap="1rem" pb="1rem">
        <FlexBetween gap="0.2rem">
          <UserImage image={picturePath} size="50px"></UserImage>
          <Box>
            <Typography
              variant="h6"
              sx={{ fontWeight: 700, color: theme.palette.text.primary }}
            >
              {firstName} {lastName}
            </Typography>
            <Typography sx={{ color: theme.palette.text.primary }}>
              {countFriends} friends
            </Typography>
          </Box>
        </FlexBetween>
        {userId === userIdLogin ? (
          <IconButton
            sx={{ color: theme.palette.text.icon }}
            onClick={handleEditClick}
          >
            <ManageAccountsOutlined />
          </IconButton>
        ) : (
          <IconButton
            sx={{ color: theme.palette.text.icon }}
            onClick={handleMessage}
          >
            <MapsUgcOutlinedIcon />
          </IconButton>
        )}
      </FlexBetween>

      <Divider></Divider>

      <Box py="1rem">
        <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
          <LocationOnOutlined
            fontSize="medium"
            sx={{ color: theme.palette.text.icon }}
          />
          <Typography sx={{ color: theme.palette.text.primary }}>
            {location}
          </Typography>
        </Box>
        <Box display="flex" alignItems="center" gap="1rem">
          <WorkOutlineOutlined
            fontSize="medium"
            sx={{ color: theme.palette.text.icon }}
          ></WorkOutlineOutlined>
          <Typography sx={{ color: theme.palette.text.primary }}>
            {occupation}
          </Typography>
        </Box>
      </Box>

      <Divider></Divider>

      <Box py="1rem">
        <FlexBetween gap="1rem" mb="0.5rem">
          <Typography sx={{ color: theme.palette.text.primary }}>
            Who's viewed your profile
          </Typography>
          <Typography
            sx={{ color: theme.palette.text.primary }}
            fontWeight="600"
          >
            {viewedProfile}
          </Typography>
        </FlexBetween>
        <FlexBetween gap="1rem">
          <Typography sx={{ color: theme.palette.text.primary }}>
            Impressions of your post
          </Typography>
          <Typography
            sx={{ color: theme.palette.text.primary }}
            fontWeight="600"
          >
            {countLike}
          </Typography>
        </FlexBetween>
      </Box>

      {selectedUser && (
        <EditUser user={user} isOpen={isModalOpen} onClose={handleModalClose} />
      )}
    </WidgetWrapper>
  );
};

/*Box p="1rem 0">
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
      </Box>*/
