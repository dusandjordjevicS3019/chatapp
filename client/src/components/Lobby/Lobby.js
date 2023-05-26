import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

import sendData from "../../util/sendData";

const Lobby = ({ onJoinRoom }) => {
  const [user, setUser] = useState();
  const [room, setRoom] = useState();

  const submitHandler = (event) => {
    event.preventDefault();
    onJoinRoom(user, room);
    sendData("room", { user, room });
  };

  const usernameChangeHandler = (e) => {
    setUser(e.target.value);
  };

  const roomChangeHandler = (e) => {
    setRoom(e.target.value);
  };

  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}></Avatar>
        <Typography component='h1' variant='h5'>
          Join chat room
        </Typography>
        <Box
          component='form'
          onSubmit={submitHandler}
          noValidate
          sx={{ mt: 1 }}
        >
          <TextField
            margin='normal'
            required
            fullWidth
            id='email'
            label='Username'
            name='username'
            autoComplete='email'
            autoFocus
            onChange={usernameChangeHandler}
          />
          <TextField
            margin='normal'
            required
            fullWidth
            name='room'
            label='Room'
            type='text'
            onChange={roomChangeHandler}
          />
          <Button
            type='submit'
            fullWidth
            variant='contained'
            sx={{ mt: 3, mb: 2, borderRadius: 10 }}
          >
            Join
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Lobby;
