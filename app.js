const express = require("express");
const { userRouter } = require("./routes/allUsers");
const db = require("./configs/db");


require("dotenv").config();
const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send(`
          <h1>Welcome to Cointab SE Assignment.</h1>
    `);
});

app.use("/", userRouter)

const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
  try {
    await db;
    console.log("Connected to DB");
  } catch (err) {
    console.log(err.message);
  }
  console.log(`Server is running at port ${PORT}`);
});
