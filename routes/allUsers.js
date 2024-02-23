const express = require("express");
const { db } = require("../configs/db");
const { User } = require("../models/userModel");
const axios = require("axios");

const userRouter = express.Router();

userRouter.get("/users", async (req, res) => {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    const users = await response.json();
    res.json(users);
  } catch (error) {
    console.error("Error fetching users from the API:", error.message);
    res.status(500).json({ error: "Error fetching users from the API" });
  }
});

userRouter.get("/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;

    try {
      const user = await User.findOne({ id: userId });
      const userExists = user !== null;

      res.json({ user, userExists });
    } catch (error) {
      console.error("Error checking user existence:", error);
      res.status(500).json({ error: "Failed to check user existence" });
    }
  } catch (error) {
    console.error("Error fetching user from API:", error);
    res.status(500).json({ error: "Failed to fetch user from API" });
  }
});

userRouter.post("/addUser", async (req, res) => {
  const userData = req.body;

  try {
    // Check if user already exists in the database
    const isExistingUser = await User.findOne({ email: userData.email });

    if (isExistingUser) {
      res.json({ message: "User already exists", showOpenButton: true });
    } else {
      const newUser = new User(userData);
      await newUser.save();
      res.json({ message: "User added successfully", showOpenButton: false });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = { userRouter };
