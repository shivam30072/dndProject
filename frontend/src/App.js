import "./App.css";
import Container from "./dnd/Container";
import Authenticate from "./authentication/Authenticate";
import { Box } from "@mui/material";
// import background from "../public/dndphoto.png";

function App() {
  const authdetails = false;
  return (
    <>
      {authdetails ? (
        <Container />
      ) : (
        // <Box sx={{ minHeight: "100vh", backgroundImage: `url(/dndphoto.png)` }}>
        // {" "}
        <Authenticate />
        // </Box>
      )}
    </>
  );
}

export default App;
