import React from "react";
import { Button } from "@mui/material";

const LogoutButton = ({ onLogout, text }) => {
  return (
    <Button variant='contained' color='error' onClick={onLogout}>
      {text}
    </Button>
  );
};

export default LogoutButton;
