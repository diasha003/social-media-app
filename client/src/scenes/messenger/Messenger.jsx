import { Box, Container, Grid } from "@mui/material";
import { useSelector } from "react-redux";
import { UserMessengerEntries } from "../widgets/UserMessengerEntries";
import { Messages } from "../widgets/Messages";
import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const Messenger = () => {
  const token = useSelector((state) => state.token);
  const [conversant, setСonversant] = useState(null);
  const [conversations, setConversations] = useState([]);
  const { state } = useLocation();
  const newConservant = state && state.user;

  //console.log(state);

  const getConversation = (conversations, conservantId) => {
    for (let i = 0; i < conversations.length; i++) {
      let conservation = conversations[i];
      if (conversations[i].recipient._id === conservantId) {
        return conservation;
      }
    }
  };

  const getConversations = async () => {
    const result = await axios.get(
      `http://localhost:3001/messages`,

      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    let conversations = result.data;

    console.log(conversations);

    if (newConservant) {
      setСonversant(newConservant);
      if (!getConversation(conversations, newConservant._id)) {
        const newConversation = {
          _id: newConservant._id,
          recipient: newConservant,
          new: true,

          messages: [],
        };
        conversations = [...conversations, newConversation];
      }
    }
    setConversations(conversations);
    //console.log(conversations);
  };

  useEffect(() => {
    getConversations();
  }, []);

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
            <UserMessengerEntries
              conversant={conversant}
              conversations={conversations}
              setСonversant={setСonversant}
            ></UserMessengerEntries>
          </Grid>
          <Grid
            item
            xs={7}
            sx={{
              backgroundColor: "#eaeaea",
              height: "100%",
            }}
          >
            <Messages
              conversant={conversant}
              conversations={conversations}
              setСonversant={setСonversant}
              setConversations={setConversations}
              getConversation={getConversation}
            ></Messages>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Messenger;
