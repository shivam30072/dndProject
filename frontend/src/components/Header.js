import { Box } from "@mui/material";
import React from "react";

const Header = ({ text = "" }) => {
  let bg;
  if (text === "to-do") {
    bg = "#7dd3fc";
  } else if (text === "in-progress") {
    bg = "#86efac";
  } else {
    bg = "#fca5a5";
  }
  return (
    <Box
      width={"100%"}
      textTransform={"uppercase"}
      borderRadius={2}
      py={1.4}
      textAlign={"center"}
      bgcolor={bg}
      className={`w-full ${bg} uppercase rounded-md p-2 text-center `}
    >
      {text}
    </Box>
  );
};

export default Header;
