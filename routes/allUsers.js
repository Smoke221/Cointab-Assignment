const express = require("express");
const { db } = require("../configs/db");

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

userRouter.post("/addUser", (req, res) => {
  const user = req.body;

  // Check if the user already exists in the database
  db.query("SELECT * FROM users WHERE id = ?", [user.id], (error, results) => {
    if (error) throw error;

    if (results.length > 0) {
      // User already exists, show "Open" button and hide "Add" button
      res.json({ status: "User already exists" });
    } else {
      // User does not exist, add to the database
      db.query("INSERT INTO users SET ?", user, (error, result) => {
        if (error) throw error;
        res.json({ status: "User added to the database" });
      });
    }
  });
});

module.exports = { userRouter };
