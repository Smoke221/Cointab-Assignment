const express = require("express");
const { userRouter } = require("./routes/allUsers");
const { connection } = require("./configs/db");
const { postRouter } = require("./routes/posts");

require("dotenv").config();
const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send(`
          <h1>Welcome to Cointab SE Assignment.</h1>
    `);
});

app.use("/", userRouter);
app.use("/posts", postRouter)

const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
  try {
    await connection;
    console.log("Connected to DB");
  } catch (err) {
    console.log(err.message);
  }
  console.log(`Server is running at port ${PORT}`);
});
