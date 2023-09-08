const mongoose = require("mongoose");

const taskSchema = mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: [true, "Title is required"],
    },
    desc: {
      type: String,
      trim: true,
      max: 50,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Task", taskSchema);
