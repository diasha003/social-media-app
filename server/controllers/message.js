import mongoose from "mongoose";
import Conversation from "../models/Conversation.js";
import Message from "../models/Message.js";
import User from "../models/User.js";

export const sendMessage = async (req, res) => {
  try {
    const recipientId = req.params.id;
    const { content, userId } = req.body;

    //console.log(req.params);
    //console.log(req.body);

    let conversation = await Conversation.findOne({
      recipients: {
        $all: [userId, recipientId],
      },
    });

    if (!conversation) {
      conversation = await Conversation.create({
        recipients: [userId, recipientId],
      });
    }

    await Message.create({
      conversation: conversation._id,
      sender: userId,
      content: content,
    });

    conversation.lastMessageAt = Date.now();
    conversation.save();

    res.status(201).json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getConversations = async (req, res) => {
  try {
    const { userId } = req.user;
    //console.log(req.user.userId);

    let conversations = await Conversation.find({
      recipients: {
        $in: [userId],
      },
    });

    let conversationsNew = await Promise.all(
      conversations.map(async (conversation) => {
        //console.log(_id);
        const conversationCurrent = await Conversation.findById(
          conversation._id
        );
        const recipientIds = conversationCurrent.recipients;
        //console.log(recipientIds);
        for (let j = 0; j < 2; j++) {
          if (recipientIds[j] != userId) {
            const recipient = await User.find({ _id: recipientIds[j] });
            //console.log(recipient[0]);
            return { ...conversation.toObject(), recipient: recipient[0] };
          }
        }
      })
    );

    //console.log(conversationsNew);

    res.status(200).json(conversationsNew);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

export const getMessages = async (req, res) => {
  try {
    const conversationId = req.params.id;
    //const conversationId = "6458c090f4c303fc175250ec";

    const messages = await Message.find({
      conversation: conversationId,
    })
      .populate("sender", "-password")
      .sort("-updatedAt");

    res.status(200).json(messages);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};
