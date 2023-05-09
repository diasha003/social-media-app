import { Box, Divider, Stack, Typography } from "@mui/material";
import UserImage from "../../components/UserImage";
import { useNavigate } from "react-router-dom";
import { socket } from "../../helpers/socketHelper";
import axios from "axios";
import { useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { Message } from "./Message";
import { SendMessage } from "./SendMessage";

export const Messages = (props) => {
  const user = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);

  //console.log(props);

  const conversation =
    props.conversations &&
    props.conversant &&
    props.getConversation(props.conversations, props.conversant._id);

  const conversationsRef = useRef(props.conversations);
  const conversantRef = useRef(props.conversant);
  const messagesRef = useRef(messages);
  useEffect(() => {
    conversationsRef.current = props.conversations;
    conversantRef.current = props.conversant;
    messagesRef.current = messages;
  });

  const setDirection = (messages) => {
    messages.forEach((element) => {
      //console.log(element);
      if (element.sender._id === user._id) {
        element.direction = "from";
      } else {
        element.direction = "to";
      }
    });
  };

  const fetchMessages = async () => {
    if (conversation) {
      if (conversation.new) {
        setMessages(conversation.messages);
        return;
      }

      const result = await axios.get(
        `http://localhost:3001/messages/${conversation._id}`,

        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      setDirection(result.data);
      console.log(result.data);
      setMessages(result.data);
    }
  };

  const handleSendMessage = async (content) => {
    const newMessage = { direction: "from", content };
    const newMessages = [newMessage, ...messages];

    if (conversation.new) {
      conversation.messages = [...conversation.messages, newMessage];
    }

    let newConversations = props.conversations.filter(
      (conversationCompare) => conversation._id !== conversationCompare._id
    );
    newConversations.unshift(conversation);

    props.setConversations(newConversations);

    setMessages(newMessages);

    const result = await axios.post(
      `http://localhost:3001/messages/${props.conversant._id}`,
      { content: content, userId: user._id },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );

    //console.log(props);
    socket.emit("send-message", props.conversant._id, user, content);
  };

  const handleReceiveMessage = (
    senderId,
    senderFirstName,
    senderLastName,
    senderPicture,
    content
  ) => {
    const newMessage = { direction: "to", content };
    const conversation = props.getConversation(
      conversationsRef.current,
      senderId
    );

    if (conversation) {
      let newMessages = [newMessage];
      if (messagesRef.current) {
        newMessages = [newMessage, ...messagesRef.current];
      }

      setMessages(newMessages);

      if (conversation.new) {
        conversation.messages = newMessages;
      }

      conversation.lastMessageAt = Date.now();

      let newConversations = conversationsRef.current.filter(
        (conversationCompare) => conversationCompare._id !== conversation._id
      );

      newConversations.unshift(conversation);
      props.setConversations(newConversations);
    } else {
      const newConversation = {
        _id: senderId,
        recipient: {
          _id: senderId,
          firstName: senderFirstName,
          lastName: senderLastName,
          picturePath: senderPicture,
        },
        new: true,
        messages: [newMessage],
        lastMessageAt: Date.now(),
      };

      props.setConversations([newConversation, ...conversationsRef.current]);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, [props.conversant]);

  useEffect(() => {
    socket.on("receive-message", handleReceiveMessage);
  });

  const style = {
    borderTop: "2px solid #7d7e77",
    borderRight: "2px solid #7d7e77",
    borderBottom: "2px solid #7d7e77",
  };

  return props.conversant ? (
    <Box display="flex" flexDirection="column" sx={style} className="scroll">
      {messages ? (
        <>
          <Box display="flex" alignItems="center" gap="0.3rem" sx={{ p: 1 }}>
            <UserImage size="42px" image={props.conversant.picturePath} />

            <Box
              onClick={() => {
                navigate(0);
              }}
            >
              <Typography variant="subtitle1" sx={{ cursor: "pointer" }}>
                {props.conversant.firstName} {props.conversant.lastName}
              </Typography>
            </Box>
          </Box>

          <Divider sx={{ border: "1px solid #7d7e77" }} />

          <Box sx={{ height: "calc(100vh - 312px)" }}>
            <Box sx={{ height: "100%" }}>
              <Stack
                sx={{ padding: 2, overflowY: "auto", maxHeight: "100%" }}
                direction="column-reverse"
              >
                {messages.map((message, i) => (
                  <Message
                    conversant={props.conversant}
                    message={message}
                    key={i}
                  />
                ))}
              </Stack>
            </Box>
          </Box>
          <SendMessage onSendMessage={handleSendMessage}></SendMessage>
        </>
      ) : (
        <></>
      )}
    </Box>
  ) : (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      sx={{ ...style, height: "calc(100vh - 177px)" }}
    >
      <Typography variant="h5">Connectify Messenger</Typography>
      <Typography color="text.secondary">
        Privately message other users on Connectify
      </Typography>
    </Box>
  );
};
