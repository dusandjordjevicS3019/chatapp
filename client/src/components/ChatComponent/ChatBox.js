import React, { useRef, useEffect } from "react";
import "./ChatForm.css";
import Message from "../../components/Message/Message";

const ChatBox = ({ messages }) => {
  const messageRef = useRef();
  useEffect(() => {
    if (messageRef && messageRef.current) {
      const { scrollHeight, clientHeight } = messageRef.current;
      messageRef.current.scrollTo({
        left: 0,
        top: scrollHeight - clientHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  return (
    <div ref={messageRef} className='messages'>
      {messages.map((msg, index) => (
        <Message
          key={index}
          message={msg.message}
          time={msg.time}
          user={msg.user}
        />
      ))}
    </div>
  );
};

export default ChatBox;
