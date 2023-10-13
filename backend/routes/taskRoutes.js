const express = require("express");
const router = express.Router();

const {
  createTask,
  getAllTask,
  updateTask,
  deleteTask,
  searchTask,
} = require("../controllers/taskController");

router.route("/").post(createTask).get(getAllTask);
router.route("/:id").patch(updateTask).delete(deleteTask);
router.route("/search").get(searchTask);

module.exports = router;
