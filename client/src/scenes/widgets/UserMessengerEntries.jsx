import { Box, Divider, IconButton, Typography } from "@mui/material";
import SmsOutlinedIcon from "@mui/icons-material/SmsOutlined";

export const UserMessengerEntries = () => {
  return (
    <>
      <Box
        display="flex"
        flexDirection="column"
        sx={{ border: "2px solid #7d7e77" }}
      >
        <Box
          display="flex"
          alignItems="center"
          gap="0.5rem"
          sx={{ pl: 2, pt: 2, pb: 1 }}
        >
          <SmsOutlinedIcon sx={{ fontSize: "2.15rem" }}></SmsOutlinedIcon>

          <Typography variant="h7" sx={{ cursor: "pointer" }}>
            Your Conversations
          </Typography>
        </Box>

        <Divider sx={{ border: "1px solid #7d7e77" }} />

        <Box sx={{ height: "calc(100vh - 240px)" }}>
          <Box sx={{ height: "100%" }}>111</Box>
        </Box>
      </Box>
    </>
  );
};
