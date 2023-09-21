import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material";
import axios from "axios";
import React from "react";
import { TaskState } from "../context/AuthProvider";

const DeleteTaskModal = ({
  allTasks,
  setAllTasks,
  taskId,
  opend,
  setOpend,
}) => {
  const { token } = TaskState();

  const deleteTask = async () => {
    if (taskId) {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const { data } = await axios.delete(
          `https://tempo-13s6.onrender.com/api/task/${taskId}`,
          config
        );
        console.log(data.message);
        const updatedTask = allTasks.filter((t) => t._id !== taskId);
        setAllTasks(updatedTask);
        setOpend(false);
      } catch (error) {
        console.log("Error while deleting a task");
      }
    }
  };

  const handleClose = () => {
    setOpend(false);
  };

  return (
    <>
      <Dialog open={opend} onClose={handleClose}>
        <DialogTitle> {"Delete this task"}</DialogTitle>

        <DialogActions>
          <Button onClick={handleClose}>Back</Button>
          <Button onClick={deleteTask}>Delete</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DeleteTaskModal;
