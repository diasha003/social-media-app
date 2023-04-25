import { Box } from "@mui/material";
import { styled } from "@mui/system";

export const UserImage = ({ image, size = "50px" }) => {
  return (
    <Box width={size} height={size}>
      <img
        src={`http://localhost:3001/assets/${image}`}
        width={size}
        height={size}
        style={{ borderRadius: "50%", objectFit: "cover" }}
        alt="user"
      ></img>
    </Box>
  );
};

export default UserImage;
