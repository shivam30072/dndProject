require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const connectDB = require("./db/connect");
const taskRouter = require("./routes/taskRoutes");
const userRouter = require("./routes/userRoutes");
const authMiddleware = require("./middleware/authentication");

app.use(express.json());
app.use("/api/user", userRouter);
app.use("/api/task", authMiddleware, taskRouter);

//------------------------Deployment-----------------

const __dirname1 = path.resolve();
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname1, "/frontend/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname1, "frontend", "build", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("api running successfully");
  });
}
//------------------------Deployment-----------------

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
