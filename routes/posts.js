const express = require("express");
const { User } = require("../models/userModel");
const { Post } = require("../models/postModel");
const excel = require("exceljs");
const axios = require("axios");

const postRouter = express.Router();

postRouter.get("/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const response = await axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);
    const posts = await response.data;

    const user = await User.findOne({ id: userId });

    res.json({ user, posts });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error", "message":error.message});
  }
});

postRouter.post("/addBulk/:userId", async (req, res) => {
  const userId = req.params.userId;
  const postsData = req.body;

  try {
    // Check if posts already exist in the database for the specific userId
    const existingPosts = await Post.find({ userId });

    if (existingPosts.length > 0) {
      res.json({ message: "Posts already exist", showDownloadButton: true });
    } else {
      const newPosts = postsData.map((post) => ({ userId, ...post }));
      await Post.insertMany(newPosts);
      res.json({
        message: "Posts added successfully",
        showDownloadButton: false,
      });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

postRouter.get("/download-in-excel/:userId", async (req, res) => {
  const userId = req.params.userId;

  try {
    const posts = await Post.find({ userId });

    const workbook = new excel.Workbook();
    const worksheet = workbook.addWorksheet("User Posts");

    worksheet.columns = [
      { header: "Title", key: "title", width: 30 },
      { header: "Body", key: "body", width: 60 },
    ];

    posts.forEach((post) => {
      worksheet.addRow({ title: post.title, body: post.body });
    });

    // Set up response headers for Excel download
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=user_posts.xlsx"
    );

    // Pipe the workbook to the response
    await workbook.xlsx.write(res);
    res.end();
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = { postRouter };
