import mongoose from "mongoose";

const PostSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    userPicturePath: {
      type: String,
    },
    picturePath: {
      type: String,
      default: "",
    },
    likes: {
      type: Map,
      of: String,
    },
    commentCount: {
      type: Number,
      default: 0,
    },
    editing: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("post", PostSchema);
