import { Box, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Moment from "react-moment";
import FlexBetween from "./FlexBetween";
import UserImage from "./UserImage";

export const ContentDetails = ({
  friendId,
  createdAt,
  name,
  userPicturePath,

  edited,
  size = "50px",
}) => {
  const theme = useTheme();

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
          <Typography
            variant="h7"
            color={theme.palette.text.primary}
            sx={{ cursor: "pointer" }}
          >
            {name}
          </Typography>
          <Box display="flex" alignContent="center">
            <Typography fontSize="0.75rem" color={theme.palette.text.primary}>
              {createdAt && <Moment fromNow>{createdAt}</Moment>}
            </Typography>

            {edited && (
              <Typography
                fontSize="12px"
                pl="4px"
                color={theme.palette.text.primary}
                sx={{ fontStyle: "italic" }}
              >
                (Edited)
              </Typography>
            )}
          </Box>
        </Box>
      </FlexBetween>
    </FlexBetween>
  );
};
