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

  const handleClose = () => {
    setOpen(false);
    setTaskId("");
    setTaskTitle("");
    setTaskDesc("");
  };

  //editing task
  const editTask = useCallback(async () => {
    const editedtaskdetails = {
      title,
      desc,
    };
    try {
      const { data } = await axios.patch(
        `/api/task/${taskId}`,
        editedtaskdetails
      );

      setAllTasks(data);
    } catch (error) {
      console.log("Error while editing task", error);
    }
  }, [taskId, title, desc]);

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
      const { data } = await axios.post("/api/task", taskDetails);
      setAllTasks([...allTasks, data]);
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
        <DialogTitle>
          {" "}
          {taskId ? `Task Id #${taskId}` : "Task Form"}
        </DialogTitle>
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
            autoFocus
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
