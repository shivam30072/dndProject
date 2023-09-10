const asyncHandler = require("express-async-handler");
const Task = require("../model/taskModel");

const createTask = asyncHandler(async (req, res) => {
  console.log("error");
  // const { title, desc } = req.body;
  // if (!title) {
  //   return res.sendStatus(400);
  // }
  // const task = await Task.create({ title, desc });
  // if (task) {
  //   return res.status(200).json(task);
  // }
  // res.status(400).json({ message: "Server Error" });
});

const getAllTask = asyncHandler(async (req, res) => {
  console.log(req.user.id, req.user.name);
  res.send("hello");
  // const allTasks = await Task.find({});
  // res.status(200).json({ allTasks, count: allTasks.length });
});

const updateTask = asyncHandler(async (req, res) => {
  // const taskId = req.params.id;
  // if (!taskId) {
  //   return res.status(400).json({ message: "Params not found error" });
  // }
  // const updatedTask = await Task.findByIdAndUpdate(taskId, req.body);
  // const allTasks = await Task.find({});
  // if (updatedTask) {
  //   return res.status(200).json(allTasks);
  // }
  // res.status(404).json({ message: "Task does not exist" });
});

const deleteTask = asyncHandler(async (req, res) => {
  // const taskId = req.params.id;
  // if (!taskId) {
  //   return res.status(400).json({ message: "Params not found error" });
  // }
  // const deletedTask = await Task.findByIdAndDelete(taskId);
  // if (deletedTask) {
  //   return res.status(200).json({ message: "Task deleted successfully" });
  // }
  // res.status(404).json({ message: "Task does not exist" });
});

module.exports = { createTask, getAllTask, updateTask, deleteTask };
