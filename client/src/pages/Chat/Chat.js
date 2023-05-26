import React, { useState } from "react";
import "./Chat.css";
import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";

import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../store/authSlice";
import Lobby from "../../components/Lobby/Lobby";
import ChatComponent from "../../components/ChatComponent/ChatComponent";
import LogoutButton from "../../components/LogoutButton/LogoutButton";

const Chat = () => {
  const dispatch = useDispatch();

  const [connection, setConnection] = useState();
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);

  const joinRoom = async (user, room) => {
    try {
      const connection = new HubConnectionBuilder()
        .withUrl("https://localhost:44374/chat")
        .configureLogging(LogLevel.Information)
        .build();

      connection.on("ReceiveMessage", (user, message, time) => {
        setMessages((messages) => [...messages, { user, message, time }]);
      });

      connection.on("UsersInRoom", (users) => {
        setUsers(users);
      });

      connection.onclose((e) => {
        setConnection();
        setMessages([]);
        setUsers([]);
      });

      await connection.start();
      await connection.invoke("JoinRoom", { user, room });
      setConnection(connection);
    } catch (e) {
      console.log(e);
    }
  };

  const sendMessage = async (message) => {
    try {
      const time = timeFormating();

      await connection.invoke("SendMessage", message, time);
    } catch (e) {
      console.log(e);
    }
  };

  const closeConnection = async () => {
    try {
      await connection.stop();
    } catch (e) {
      console.log(e);
    }
  };

  const leaveRoom = async () => {
    try {
      await connection.invoke("LeaveRoom");
    } catch (e) {
      console.log(e);
    }
  };

  const timeFormating = () => {
    const today = new Date();
    let hours = today.getHours().toString();
    let minutes = today.getMinutes().toString();

    if (hours.length === 1) {
      hours = "0" + hours;
    }

    if (minutes.length === 1) {
      minutes = "0" + minutes;
    }

    return hours + ":" + minutes;
  };

  // const logoutHandler = () => {
  //   dispatch(authActions.logout());
  // };

  return (
    <div className='chatContainer'>
      {!connection ? (
        <Lobby onJoinRoom={joinRoom} />
      ) : (
        <ChatComponent
          sendMessage={sendMessage}
          closeConnection={closeConnection}
          users={users}
          messages={messages}
          leaveRoom={leaveRoom}
        />
      )}
    </div>
  );
};

export default Chat;
