import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { TaskState } from "../context/AuthProvider";

const Taskform = ({
  setAllTasks,
  allTasks,
  taskId,
  setTaskId,
  taskTitle,
  setTaskTitle,
  taskDesc,
  setTaskDesc,
  open,
  setOpen,
}) => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  const { token } = TaskState();

  const handleClose = () => {
    setOpen(false);
    setTaskId("");
    setTaskTitle("");
    setTaskDesc("");
  };

  //API call for editing task
  const editTask = async () => {
    const editedtaskdetails = {
      title,
      desc,
    };
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.patch(
        `https://tempo-13s6.onrender.com/api/task/${taskId}`,
        editedtaskdetails,
        config
      );
      let updatedTask = allTasks.filter((t) => t._id !== data?._id);
      updatedTask.push(data);
      setAllTasks(updatedTask);
      setOpen(false);
      setTaskId("");
      setTaskTitle("");
      setTaskDesc("");
    } catch (error) {
      console.log("Error while editing task", error);
    }
  };

  // API for creating new task
  const handleSubmit = async () => {
    if (taskId) {
      editTask();
      return;
    }

    if (!title) {
      alert("title is required");
      return;
    }
    const taskDetails = {
      title,
      desc,
    };
    // post request for adding task
    try {
      console.log("token", token);
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.post(
        "https://tempo-13s6.onrender.com/api/task",
        taskDetails,
        config
      );
      setAllTasks([data, ...allTasks]);
      setOpen(false);
      setTaskTitle("");
      setTaskDesc("");
    } catch (error) {
      console.log("error", error);
    }

    setTitle("");
    setDesc("");
  };

  useEffect(() => {
    setTitle(taskTitle);
    setDesc(taskDesc);
  }, [taskDesc, taskTitle]);

  return (
    <>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle> {taskId ? `Edit this task` : "Task Form"}</DialogTitle>
        <DialogContent>
          <TextField
            value={title}
            autoFocus
            margin="dense"
            id="title"
            label="Title"
            type="text"
            fullWidth
            variant="outlined"
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
          <TextField
            multiline
            rows={4}
            sx={{ marginTop: 4 }}
            value={desc}
            margin="dense"
            id="description"
            label="Description"
            type="text"
            fullWidth
            variant="outlined"
            onChange={(e) => {
              setDesc(e.target.value);
            }}
          />
          <Button
            sx={{ marginTop: 4, paddingY: 1.5, borderRadius: 3 }}
            variant="contained"
            fullWidth
            onClick={() => {
              handleSubmit();
            }}
          >
            {taskId ? "Edit Task" : "Add Task"}
          </Button>
        </DialogContent>
        <DialogActions>
          <Button sx={{ bgcolor: "#e5e6e6" }} onClick={handleClose}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Taskform;
