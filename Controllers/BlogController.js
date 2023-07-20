import BlogModel from "../Models/BlogModel.js";

export const createBlog = async (req, res) => {
  try {
    const { username, title, shortDescription, detailsDescription } = req.body;

    if (!title || !shortDescription || !detailsDescription) {
      return res.status(422).json({
        status: false,
        message: "Please provide required field properly",
      });
    }

    const newBlog = new BlogModel({
      Username: username,
      Title: title,
      ShortDescription: shortDescription,
      DetailDescription: detailsDescription,
    });

    const savedBlog = await newBlog.save();

    if (savedBlog) {
      return res.status(201).json({
        status: true,
        message: "Blog successfully created",
        savedBlog,
      });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: false, message: "something went wrong", err: error });
  }
};

export const getAllBlog = async (req, res) => {
  try {
    let page = req.query.page || 1;
    const limit = 6;

    const totalCount = await BlogModel.find({}).countDocuments();
    const totalPages = Math.ceil(totalCount / limit);

const savedBlog = await BlogModel.find({})
      .skip((page - 1) * limit)
      .limit(limit).sort({PinnedPost: -1, createdAt : -1});

    if (savedBlog.length < 1) {
      return res
        .status(404)
        .json({ status: true, message: "No blog present in the database" });
    }

    const jsonData = JSON.stringify({
      status: true,
      message: "successfully fetched blog data",
      savedBlog,
      currentPage: page,
      totalPages: totalPages,
    });

    // Set the Content-Length header to the length of the JSON data
    res.setHeader('Content-Length', Buffer.byteLength(jsonData));

    // Send the JSON response
    res.setHeader('Content-Type', 'application/json');
    return res.status(201).send(jsonData);
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "something went wrong while fetching blogs",
      err: error,
    });
  }
};

export const getSingleBlog = async (req, res) => {
  try {
    const { blogId } = req.query;

    if (!blogId) {
      return res
        .status(422)
        .json({ status: false, message: "blog Id is not given for query" });
    }

    const singleBlog = await BlogModel.findById(blogId);

    if (!singleBlog) {
      return res
        .status(404)
        .json({ status: true, message: "No Blog fount with given id" });
    }

    return res
      .status(202)
      .json({
        status: true,
        message: "successfully fetched single blog",
        singleBlog,
      });
  } catch (error) {
    return res
      .status(500)
      .json({ status: false, message: "something went wrong", err: error });
  }
};
