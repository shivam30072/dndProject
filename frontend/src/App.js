import "./App.css";
import Container from "./dnd/Container";
import Authenticate from "./authentication/Authenticate";
import { useEffect, useState } from "react";
import { TaskState } from "./context/AuthProvider";

function App() {
  const { isLoggedIn } = TaskState();

  return <>{isLoggedIn ? <Container /> : <Authenticate />}</>;
}

export default App;
