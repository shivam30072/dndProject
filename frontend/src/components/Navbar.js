import React, { useEffect, useState } from "react";
import Taskform from "./Taskform";
import DeleteTaskModal from "./DeleteTaskModal";
import Person2Icon from "@mui/icons-material/Person2";
import {
  Avatar,
  Box,
  Button,
  Menu,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { TaskState } from "../context/AuthProvider";
import axios from "axios";
import { BASE_URL } from "../utils";

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
  const [search, setSearch] = useState("");
  const dropDown = Boolean(anchorEl);

  const { setUserDetails, setToken, setIsLoggedIn, token } = TaskState();

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

  useEffect(() => {
    if (!search) {
      return;
    }

    let debounceHandler = null;

    async function searchTasks() {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const response = await axios.get(
          `${BASE_URL}/api/task/search?search=${search}`,
          config
        );
        const data = response.data?.allTasks;
        setAllTasks(data);
      } catch (error) {
        console.log("error occured", error);
      }
    }
    debounceHandler = setTimeout(() => {
      if (debounceHandler) {
        clearTimeout(debounceHandler);
      }
      searchTasks();
    }, 1000);

    return () => clearTimeout(debounceHandler);
  }, [search]);

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
        <Typography fontSize={{ xs: 14, sm: 18, md: 25 }} color={"white"}>
          Tempo
        </Typography>
      </Box>
      <TextField
        onChange={(e) => setSearch(e.target.value)}
        id="outlined-search"
        type="search"
        variant="outlined"
        placeholder="Search"
        InputProps={{ endAdornment: null }}
        sx={{
          border: "none",
          bgcolor: "white",
          outline: "none",
          borderRadius: "2rem",
          height: "2.8rem",
          width: { xs: "8rem", sm: "18rem", md: "28rem" },
          display: "flex",
          justifyContent: "center",
        }}
      />
      <Box display={"flex"} gap={{ xs: 0, md: 2.5 }}>
        <Button
          sx={{
            display: { xs: "none", md: "flex" },
            height: "2.5rem",
            width: { xs: "2rem", md: "5rem" },
            marginLeft: { xs: "1rem" },
            marginTop: "5px",
          }}
          variant="contained"
          color="primary"
          onClick={handleClickOpen}
        >
          add+
        </Button>
        <Button
          sx={{
            display: { xs: "flex", md: "none" },
            height: "2.5rem",
            width: "12px",
            marginLeft: { xs: "1rem" },
            marginTop: "5px",
          }}
          variant="contained"
          color="primary"
          onClick={handleClickOpen}
        >
          +
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
