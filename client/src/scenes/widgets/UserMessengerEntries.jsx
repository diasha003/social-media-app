import { Box, Divider, IconButton, List, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import SmsOutlinedIcon from "@mui/icons-material/SmsOutlined";
import { UserMessengerEntry } from "./UserMessengerEntry";

export const UserMessengerEntries = (props) => {
  const theme = useTheme();
  return (
    <>
      <Box
        display="flex"
        flexDirection="column"
        sx={{
          border: "2px solid #7d7e77",
          backgroundColor: theme.palette.background.alt,
        }}
      >
        <Box
          display="flex"
          alignItems="center"
          gap="0.5rem"
          sx={{ pl: 2, pt: 2, pb: 1 }}
        >
          <SmsOutlinedIcon
            sx={{ fontSize: "2.15rem", color: theme.palette.text.icon }}
          ></SmsOutlinedIcon>

          <Typography
            variant="h7"
            color={theme.palette.text.primary}
            sx={{ cursor: "pointer" }}
          >
            Your Conversations
          </Typography>
        </Box>

        <Divider sx={{ border: "1px solid #7d7e77" }} />

        <Box sx={{ height: "calc(100vh - 240px)" }} className="scroll">
          <Box sx={{ height: "100%" }}>
            <List sx={{ padding: 0, maxHeight: "100%", overflowY: "auto" }}>
              {props.conversations.map((conversation) => (
                <UserMessengerEntry
                  key={conversation._id}
                  conversant={props.conversant}
                  conversation={conversation}
                  setСonversant={props.setСonversant}
                ></UserMessengerEntry>
              ))}
            </List>
          </Box>
        </Box>
      </Box>
    </>
  );
};
