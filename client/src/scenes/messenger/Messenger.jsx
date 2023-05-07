import { Box, Container, Grid } from "@mui/material";

import { useSelector } from "react-redux";
import WidgetWrapper from "../../components/WidgetWrapper";
import { UserMessengerEntries } from "../widgets/UserMessengerEntries";
import { Messages } from "../widgets/Messages";

const Messenger = () => {
  const user = useSelector((state) => state.user);

  return (
    <Container sx={{ padding: "2rem 3%" }}>
      <Box>
        <Grid container justifyContent="center" alignItems="stretch">
          <Grid
            item
            xs={4}
            sx={{
              backgroundColor: "#eaeaea",
              height: "100%",
            }}
          >
            <UserMessengerEntries></UserMessengerEntries>
          </Grid>
          <Grid
            item
            xs={7}
            sx={{
              backgroundColor: "#eaeaea",
              height: "100%",
            }}
          >
            <Messages></Messages>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Messenger;
