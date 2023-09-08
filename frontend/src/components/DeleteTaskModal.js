import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material";
import axios from "axios";
import React from "react";

const DeleteTaskModal = ({
  allTasks,
  setAllTasks,
  taskId,
  opend,
  setOpend,
}) => {
  const deleteTask = async () => {
    console.log("clicked");
    if (taskId) {
      try {
        const { data } = await axios.delete(`/api/task/${taskId}`);
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
        <DialogTitle>
          {" "}
          {taskId ? `Delete Task with id #${taskId}` : "Delete this task"}
        </DialogTitle>

        <DialogActions>
          <Button onClick={handleClose}>Back</Button>
          <Button onClick={deleteTask}>Delete</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DeleteTaskModal;
