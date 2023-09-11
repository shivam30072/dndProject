const asyncHandler = require("express-async-handler");
const Task = require("../model/taskModel");
const User = require("../model/userModel");

const createTask = asyncHandler(async (req, res) => {
  const { title, desc } = req.body;

  const userId = req.user.id;

  if (!userId) {
    res.status(400).json({ message: "User not authenticated" });
    throw new Error("User not authenticated");
  }

  if (!title) {
    res.status(400).json({ message: "Title not Provided" });
    throw new Error("Title not Provided");
  }

  const user = await User.findOne({ _id: userId }).select("-password");

  const createdBy = user;

  const task = await Task.create({ title, desc, createdBy });
  if (task) {
    return res.status(200).json(task);
  }
  res.status(400).json({ message: "Server Error" });
});

const getAllTask = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  if (!userId) {
    res.status(400).json({ message: "User not authenticated" });
    throw new Error("User not authenticated");
  }
  const allTasks = await Task.find({ createdBy: userId }).sort("createdAt");
  res.status(200).json({ allTasks, count: allTasks.length });
});

const updateTask = asyncHandler(async (req, res) => {
  const taskId = req.params.id;
  const userId = req.user.id;
  const { title } = req.body;
  if (!userId) {
    res.status(400).json({ message: "User not authenticated" });
    throw new Error("User not authenticated");
  }

  if (!taskId) {
    res.status(400).json({ message: "Params not found error" });
    throw new Error("Params not found error");
  }

  if (!title) {
    res.status(400).json({ message: "Title not Provided" });
    throw new Error("Title not Provided");
  }

  const updatedTask = await Task.findByIdAndUpdate(
    { _id: taskId, createdBy: userId },
    req.body,
    {
      new: true,
    }
  );
  if (updatedTask) {
    res.status(200).json(updatedTask);
  } else {
    res.status(404).json({ message: "Task does not exist" });
  }
});

const deleteTask = asyncHandler(async (req, res) => {
  const taskId = req.params.id;
  const userId = req.user.id;
  if (!taskId) {
    return res.status(400).json({ message: "Params not found error" });
  }
  if (!userId) {
    res.status(400).json({ message: "User not authenticated" });
    throw new Error("User not authenticated");
  }
  const deletedTask = await Task.findByIdAndDelete({
    _id: taskId,
    createdBy: userId,
  });
  if (deletedTask) {
    return res.status(200).json({ message: "Task deleted successfully" });
  }
  res.status(404).json({ message: "Task does not exist" });
});

module.exports = { createTask, getAllTask, updateTask, deleteTask };
