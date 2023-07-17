import express from "express";
import {
  createComment,
  getAllCommentForBlog,
} from "../Controllers/CommentController.js";
const router = express.Router();

router.post("/postcomment", createComment);
router.get("/getcommentforblog", getAllCommentForBlog);

export default router;
