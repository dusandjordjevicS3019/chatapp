import React from "react";
import "./ChatForm.css";
import { chatActions } from "../../store/chatSlice";
import { useSelector, useDispatch } from "react-redux";

const ConnectedUsers = ({ users, closeConnection }) => {
  const dispatch = useDispatch();

  const groupName = useSelector((state) => state.chat.groupName);

  // dummy data
  const group = [
    {
      id: 1,
      users: "users",
    },
  ];

  const leaveChatHandler = () => {
    dispatch(chatActions.clearChat());
    dispatch(chatActions.setChatIsActive(false));
    closeConnection();
  };

  return (
    <div className='participants'>
      <p className='participants__title'>
        <span>
          {groupName ? "Group:" : "Participants:"}
          {groupName ? (
            <span className='participant'>{groupName}</span>
          ) : (
            users.map((user, index) => (
              <span className='participant' key={index}>
                {user}
              </span>
            ))
          )}
        </span>
        {users.length !== 0 && (
          <span onClick={leaveChatHandler} className='leaveBtn'>
            Leave
          </span>
        )}
      </p>
    </div>
  );
};

export default ConnectedUsers;
