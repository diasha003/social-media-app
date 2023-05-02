import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },

    lastName: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },

    friends: {
      type: Array,
      default: [],
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 6,
    },
    picturePath: {
      type: String,
      default: "",
    },
    location: {
      type: String,
    },
    occupation: {
      type: String,
    },
    viewedProfile: {
      type: Number,
      default: 0,
    },

    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("User", UserSchema);

/*  followers: {
      type: Array,
      default: [],
    },
    followings: {
      type: Array,
      default: [],
    },*/
