import React, { useState } from "react";
import Taskform from "./Taskform";
import DeleteTaskModal from "./DeleteTaskModal";
import Person2Icon from "@mui/icons-material/Person2";
import { Avatar, Box, Button, Menu, MenuItem, Typography } from "@mui/material";
import { TaskState } from "../context/AuthProvider";

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
  const [anchorEl, setAnchorEl] = useState(null);
  const dropDown = Boolean(anchorEl);

  const { setUserDetails, setToken, setIsLoggedIn } = TaskState();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleDropDownOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleDropDownClose = () => {
    setAnchorEl(null);
  };

  const handleLogOut = () => {
    localStorage.clear();
    setUserDetails({});
    setToken(null);
    setIsLoggedIn(false);
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
          Tempo
        </Typography>
      </Box>
      <Box display={"flex"} gap={2.5}>
        <Button
          sx={{ height: "2.5rem", width: "5rem", marginTop: "5px" }}
          variant="contained"
          color="primary"
          onClick={handleClickOpen}
        >
          add+
        </Button>
        <Button
          id="demo-customized-button"
          aria-controls={dropDown ? "demo-customized-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={dropDown ? "true" : undefined}
          variant="contained"
          disableElevation
          onClick={handleDropDownOpen}
          sx={{
            bgcolor: "#2e3241",
            "&:hover": {
              bgcolor: "#2b3447",
            },
          }}
        >
          <Avatar>
            <Person2Icon />
          </Avatar>
        </Button>
        <Menu
          id="demo-customized-menu"
          MenuListProps={{
            "aria-labelledby": "demo-customized-button",
          }}
          anchorEl={anchorEl}
          open={dropDown}
          onClose={handleDropDownClose}
          sx={{ marginLeft: 1 }}
        >
          <MenuItem onClick={handleDropDownClose} disableRipple>
            Profile
          </MenuItem>
          <MenuItem onClick={handleLogOut} disableRipple>
            Log Out
          </MenuItem>
        </Menu>
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
