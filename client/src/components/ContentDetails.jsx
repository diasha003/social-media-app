import { Box, IconButton, Typography } from "@mui/material";
import Moment from "react-moment";
import FlexBetween from "./FlexBetween";
import UserImage from "./UserImage";

import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setFriends } from "../store/authSlice";
import { useNavigate } from "react-router-dom";

export const ContentDetails = ({
  friendId,
  createdAt,
  name,
  userPicturePath,

  edited,
  size = "50px",
}) => {
  return (
    <FlexBetween>
      <FlexBetween gap="0.5rem">
        <UserImage size={size} image={userPicturePath}></UserImage>

        <Box
        /*onClick={() => {
            navigate(`/profile/${friendId}`);
            navigate(0);
          }}*/
        >
          <Typography variant="h7" sx={{ cursor: "pointer" }}>
            {name}
          </Typography>
          <Box display="flex" alignContent="center">
            <Typography fontSize="0.75rem">
              {createdAt && <Moment fromNow>{createdAt}</Moment>}
            </Typography>

            {edited && (
              <Typography fontSize="12px" pl="4px" sx={{ fontStyle: "italic" }}>
                (Edited)
              </Typography>
            )}
          </Box>
        </Box>
      </FlexBetween>
    </FlexBetween>
  );
};
