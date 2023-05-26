import React, { useRef } from "react";
import "./ChatForm.css";
import { IoMdSend } from "react-icons/io";
import ChatBox from "./ChatBox";

const ChatForm = ({ messages, sendMessage }) => {
  const messageInputRef = useRef();

  const messageFormHandler = (event) => {
    event.preventDefault();

    if (messageInputRef.current.value) {
      sendMessage(messageInputRef.current.value);
      messageInputRef.current.value = "";
    }
  };

  return (
    <>
      <ChatBox messages={messages} />
      <form className='formMessage'>
        <input
          ref={messageInputRef}
          placeholder='Type your message...'
          type='text'
          className='formMessage__input'
        />
        <button
          type='submit'
          onClick={messageFormHandler}
          className='formMessage__send'
        >
          <IoMdSend className='formMessage__icon' color='#000' size={30} />
        </button>
      </form>
    </>
  );
};

export default ChatForm;
