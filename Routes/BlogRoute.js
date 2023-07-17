import express from "express";
const router = express.Router();
import { createBlog, getAllBlog, getSingleBlog } from "../Controllers/BlogController.js"
// import multer from "multer";
// import path, { dirname } from "path";
// import { fileURLToPath } from "url";
// const fileName = fileURLToPath(import.meta.url);
// const __dirname = dirname(fileName);

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, path.join(__dirname, "../public/uploads/lead"));
//     },
//     filename: function (req, file, cb) {
//       cb(
//         null,
//         file.originalname + "-" + Date.now() + path.extname(file.originalname)
//       );
//     },
//   });
  
//   function checkFileType(file, cb) {
//     const filetypes = /jpg|jpeg|png/;
//     const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
//     const mimetype = filetypes.test(file.mimetype);
  
//     if (extname && mimetype) {
//       return cb(null, true);
//     } else {
//       cb("Images and pdf only!"); // custom this message to fit your needs
//     }
//   }
  
//   const upload = multer({
//     storage,
//     fileFilter: function (req, file, cb) {
//       checkFileType(file, cb);
//     },
//   });

router.post("/createblog", createBlog);
router.get("/getallblogs", getAllBlog);
router.get("/getsingleblog", getSingleBlog);

export default router;