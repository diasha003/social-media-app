import { Box, Divider, Stack, Typography } from "@mui/material";
import FlexBetween from "../../components/FlexBetween";
import { ContentDetails } from "../../components/ContentDetails";
import UserImage from "../../components/UserImage";
import { useLocation, useNavigate } from "react-router-dom";
import { socket } from "../../helpers/socketHelper";

export const Messages = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const newConservant = state && state.user;

  console.log(state);

  const fake = () => {
    socket.emit(
      "send-message"
      //conversation.recipient._id,
      //user.username,
      //content
    );
  };

  return (
    <>
      <Box
        display="flex"
        flexDirection="column"
        sx={{
          borderTop: "2px solid #7d7e77",
          borderRight: "2px solid #7d7e77",
          borderBottom: "2px solid #7d7e77",
        }}
      >
        <Box
          display="flex"
          alignItems="center"
          gap="0.3rem"
          sx={{ pt: 1, pl: 1 }}
        >
          <UserImage size="50px"></UserImage>

          <Box
            onClick={() => {
              //navigate(`/profile/${}`);

              navigate(0);
            }}
          >
            <Typography variant="h7" sx={{ cursor: "pointer" }}>
              Fursevich Diana
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ border: "1px solid #7d7e77" }} />

        <Box sx={{ height: "calc(100vh - 240px)" }}>
          <Box sx={{ height: "100%" }}>111</Box>
        </Box>
      </Box>
    </>
  );
};

/*    <Stack
      sx={{ height: "100%" }}
      justifyContent="center"
      alignItems="center"
      spacing={2}
    >
      <AiFillMessage size={80} />
      <Typography variant="h5">PostIt Messenger</Typography>
      <Typography color="text.secondary">
        Privately message other users on PostIt
      </Typography>
    </Stack>*/

/* {messages.map((message, i) => (
              <Message
                conservant={props.conservant}
                message={message}
                key={i}
              />
            ))}*/
