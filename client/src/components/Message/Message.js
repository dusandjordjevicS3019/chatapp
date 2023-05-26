import "./Message.css";
import { BsClock } from "react-icons/bs";

const Message = ({ message, time, user }) => {
  return (
    <div className='messageContainer'>
      <p className='message'>
        <span>{user}</span>
        <span>{message}</span>
        <span className='time'>
          {time}
          <BsClock className='clock' color='#fff' size={14} />
        </span>
      </p>
    </div>
  );
};

export default Message;
