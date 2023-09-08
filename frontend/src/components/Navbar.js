import React from "react";
import Taskform from "./Taskform";
import DeleteTaskModal from "./DeleteTaskModal";
import { Box, Button, Typography } from "@mui/material";

const Navbar = ({
  allTasks,
  setAllTasks,
  taskId,
  setTaskId,
  taskTitle,
  setTaskTitle,
  taskDesc,
  setTaskDesc,
  open,
  setOpen,
  opend,
  setOpend,
}) => {
  const handleClickOpen = () => {
    setOpen(true);
  };

  return (
    <Box
      minHeight={"10vh"}
      position={"fixed"}
      top={0}
      left={0}
      right={0}
      zIndex={10}
      bgcolor={"#2b3447"}
      display={"flex"}
      justifyContent={"space-between"}
      alignItems={"center"}
      px={2}
    >
      <Box>
        <Typography fontSize={25} color={"white"}>
          apnaBoard
        </Typography>
      </Box>
      <Box>
        <Button
          variant="contained"
          size="large"
          color="primary"
          onClick={handleClickOpen}
        >
          add+
        </Button>
        <Taskform
          open={open}
          setOpen={setOpen}
          setAllTasks={setAllTasks}
          allTasks={allTasks}
          taskId={taskId}
          setTaskId={setTaskId}
          taskTitle={taskTitle}
          setTaskTitle={setTaskTitle}
          taskDesc={taskDesc}
          setTaskDesc={setTaskDesc}
        />
        <DeleteTaskModal
          taskId={taskId}
          setAllTasks={setAllTasks}
          allTasks={allTasks}
          opend={opend}
          setOpend={setOpend}
        />
      </Box>
    </Box>
  );
};

export default Navbar;
