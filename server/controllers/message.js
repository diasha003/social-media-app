import Message from "../models/Message.js";

export const getConversations = async (req, res) => {
  try {
    const { userId } = req.body;
    const comments = await Message.find({ sender: userId })
      .populate("conversation")
      .sort({
        createdAt: -1,
      });

    res.status(200).json({});
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};
