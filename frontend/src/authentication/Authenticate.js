import {
  Alert,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import axios from "axios";
import { TaskState } from "../context/AuthProvider";
import { BASE_URL } from "../utils";

const Authenticate = () => {
  const [open, setOpen] = useState(true);
  const [toast, setToast] = useState(false);
  const [message, setMessage] = useState("");
  const [type, setType] = useState("");
  const [loginSignup, setLoginSignup] = useState("signup");
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    loginToken: "",
  });
  const { name, email, password, confirmPassword, loginToken } = userData;
  const { setIsLoggedIn } = TaskState();

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

  const apiCallForAuthentication = async () => {
    let userInfo;
    if (loginSignup === "signup") {
      userInfo = {
        name,
        email,
        password,
      };
    } else {
      userInfo = {
        email,
        password,
        token: loginToken,
      };
    }
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post(
        `${BASE_URL}/api/user/${loginSignup}`,
        userInfo,
        config
      );
      if (loginSignup === "login") {
        localStorage.setItem("userDetails", JSON.stringify(data));
        localStorage.setItem("loggedIn", true);
        setIsLoggedIn(true);
        setOpen(false);
        window.location.reload();
      } else {
        setToast(true);
        setMessage(data?.message);
        setType(data?.type);
        setLoginSignup("login");
      }
    } catch (error) {
      setToast(true);
      setMessage(error?.response?.data?.message);
      setType(error?.response?.data?.type);
      console.log("error occured", error);
    }
  };

  const handleSubmit = () => {
    if (loginSignup === "signup") {
      if (!name || !email || !password || !confirmPassword) {
        alert("all fields are mandatory");
        return;
      }

      if (password !== confirmPassword) {
        alert("Password and Confirm Password should be same");
        return;
      }
      apiCallForAuthentication();
    } else {
      if (!email || !password) {
        alert("Both fields are mandatory");
        return;
      }
      apiCallForAuthentication();
      console.log("User Logged in");
    }
    setUserData({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      loginToken: "",
    });
  };

  return (
    <>
      <Dialog
        open={open}
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
              value={name}
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
            value={email}
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
            value={password}
            margin="dense"
            name="password"
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            onChange={handleInputChange}
          />
          {loginSignup === "login" && (
            <>
              <TextField
                sx={{ marginTop: 2 }}
                value={loginToken}
                margin="dense"
                name="loginToken"
                label="Token"
                type="password"
                variant="outlined"
                fullWidth
                onChange={handleInputChange}
              />
              <Typography>
                If email is verified enter "12345678" in token field
              </Typography>
            </>
          )}
          {loginSignup === "signup" && (
            <TextField
              sx={{ marginTop: 2 }}
              value={confirmPassword}
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
      </Dialog>
      <Snackbar
        open={toast}
        autoHideDuration={3000}
        onClose={() => {
          setToast(false);
        }}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          variant="filled"
          onClose={() => {
            setToast(false);
          }}
          severity={type}
          sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default Authenticate;
