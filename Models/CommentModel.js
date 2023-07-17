import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    BlogId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Blog",
    },
    Username: {
      type: String,
      default: "Anonymous",
    },
    Comment: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const CommentModel = mongoose.model("comment", commentSchema);

export default CommentModel;
