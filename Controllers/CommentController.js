import CommentModel from "../Models/CommentModel.js";

export const createComment = async (req, res) => {
  try {
    const { blogId, username, comment } = req.body;

    if (!blogId || !comment) {
      return res.status(422).json({
        status: false,
        message: "Please provide all the required field properly",
      });
    }

    const newComment = new CommentModel({
      BlogId: blogId,
      Username: username,
      Comment: comment,
    });

    const savedComment = await newComment.save();

    if (savedComment) {
      return res.status(201).json({
        status: true,
        message: "Comment added successfully",
        savedComment,
      });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ status: false, message: "something went wrong", err: error });
  }
};

export const getAllCommentForBlog = async (req, res) => {
  try {
    const { blogId } = req.query;

    if (!blogId) {
      return res
        .status(422)
        .json({
          status: false,
          message: "Blog id is not given for retriving comment",
        });
    }

    const savedCommentForBlog = await CommentModel.find({
      BlogId: blogId,
    }).populate("BlogId");

    if (savedCommentForBlog.length < 1) {
      return res
        .status(404)
        .json({ status: true, message: "This blog has no comment" });
    }

    return res
      .status(202)
      .json({
        status: true,
        message: "successfully fetched comment for this blogs",
        savedCommentForBlog
      });
  } catch (error) {
    return res
      .status(500)
      .json({ status: false, message: "something went wrong" });
  }
};
