import "./App.css";
import Container from "./dnd/Container";
import Authenticate from "./authentication/Authenticate";
import { Box } from "@mui/material";
import { useState } from "react";

function App() {
  const [loggedIn, setLoggedIn] = useState(
    localStorage.getItem("loggedIn") || false
  );
  return (
    <>{loggedIn ? <Container /> : <Authenticate setLoggedIn={setLoggedIn} />}</>
  );
}

export default App;
