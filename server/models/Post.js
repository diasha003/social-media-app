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
    comments: {
      type: Array,
      default: [],
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

export default mongoose.model("Post", PostSchema);
