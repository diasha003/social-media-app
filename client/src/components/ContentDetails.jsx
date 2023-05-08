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
  occupation,
  editing,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => {
    return state.token;
  });
  const friends = useSelector((state) => state.userFriends);

  return (
    <FlexBetween>
      <FlexBetween gap="0.5rem">
        <UserImage size="50px" image={userPicturePath}></UserImage>

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

            {editing && (
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
