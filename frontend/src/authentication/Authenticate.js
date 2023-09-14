import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";

const Authenticate = () => {
  const [open, setOpen] = useState(true);
  const [loginSignup, setLoginSignup] = useState("signup");
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChangeForm = () => {
    if (loginSignup === "signup") {
      setLoginSignup("login");
    } else {
      setLoginSignup("signup");
    }
  };
  const handleInputChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const apiCallForAuthentication = (
    name,
    email = "",
    password = "",
    confirmPassword
  ) => {
    if (loginSignup === "signup") {
      console.log({ name, email, password, confirmPassword });
    } else {
      console.log(userData.email, userData.password);
    }
  };

  const handleSubmit = () => {
    const { name, email, password, confirmPassword } = userData;
    if (loginSignup === "signup") {
      if (!name || !email || !password || !confirmPassword) {
        alert("all fields are mandatory");
        return;
      }
      apiCallForAuthentication(name, email, password, confirmPassword);
    } else {
      if (!email || !password) {
        alert("Both fields are mandatory");
        return;
      }
      console.log({ email, password });
      apiCallForAuthentication();
    }
    setUserData({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
  };

  return (
    <Dialog
      open={true}
      sx={{
        minHeight: "100vh",
        bgcolor: "#e5e6e6",
      }}
    >
      <DialogTitle sx={{}}>
        {" "}
        {loginSignup === "signup" ? "Sign Up" : "Login"}
      </DialogTitle>
      <DialogContent sx={{}}>
        {loginSignup === "signup" && (
          <TextField
            value={userData.name}
            autoFocus
            margin="dense"
            name="name"
            label="Name"
            type="text"
            fullWidth
            variant="outlined"
            onChange={handleInputChange}
          />
        )}
        <TextField
          sx={{ marginTop: 2 }}
          value={userData.email}
          margin="dense"
          name="email"
          label="Email"
          type="text"
          variant="outlined"
          fullWidth
          onChange={handleInputChange}
        />
        <TextField
          sx={{ marginTop: 2 }}
          value={userData.password}
          margin="dense"
          name="password"
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          onChange={handleInputChange}
        />
        {loginSignup === "signup" && (
          <TextField
            sx={{ marginTop: 2 }}
            value={userData.confirmPassword}
            margin="dense"
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            variant="outlined"
            fullWidth
            onChange={handleInputChange}
          />
        )}
        <Typography
          mt={0.5}
          ml={0.5}
          color={"#3cc8ff"}
          sx={{ cursor: "pointer" }}
          onClick={handleChangeForm}
        >
          {loginSignup === "signup" ? "Login" : "Sign Up"}
        </Typography>
        <Button
          sx={{
            marginTop: 2,
            paddingY: 1.5,
            borderRadius: 3,
            bgcolor: "#570df8",
            "&:hover": { bgcolor: "#3936d8" },
          }}
          variant="contained"
          fullWidth
          onClick={handleSubmit}
        >
          {"Submit"}
        </Button>
      </DialogContent>
      {/* <DialogActions>
          <Button sx={{ bgcolor: "#e5e6e6" }} onClick={handleClose}>
            Close
          </Button>
        </DialogActions> */}
    </Dialog>
  );
};

export default Authenticate;
