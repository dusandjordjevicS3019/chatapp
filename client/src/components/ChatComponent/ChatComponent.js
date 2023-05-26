import React from "react";
import ConnectedUsers from "./ConnectedUsers";
import "./ChatForm.css";
import ChatForm from "./ChatForm";

const ChatComponent = ({
  sendMessage,
  messages,
  users,
  closeConnection,
  time,
}) => {
  return (
    <div className='chatInfoContainer'>
      <ConnectedUsers users={users} closeConnection={closeConnection} />
      <ChatForm sendMessage={sendMessage} messages={messages} />
    </div>
  );
};

export default ChatComponent;
