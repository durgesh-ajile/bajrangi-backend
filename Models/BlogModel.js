import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    Username: {
      type: String,
      default: "Anonymous",
    },
    Title: {
      type: String,
      required: true,
    },
    ShortDescription: {
      type: String,
      required: true,
    },
    DetailDescription: {
      type: String,
      required: true,
    },
    PinnedPost: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true,
  }
);

const BlogModel = mongoose.model("Blog", blogSchema);

export default BlogModel;
