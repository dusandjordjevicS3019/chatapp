import { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import "./Login.css";
import Loader from "../../../components/Loader/Loader";

import fetchData from "../../../util/fetchData";
import { usersActions } from "../../../store/usersSlice";
import { authActions } from "../../../store/authSlice";
import { login } from "../../../util/auth";

const Login = ({ toSignupPage }) => {
  const [authFailed, setAuthFailed] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.users);

  useEffect(() => {
    const getAllData = async () => {
      const data = await fetchData("");

      const usersData = [];
      for (let key in data.users) {
        usersData.push({
          username: data.users[key].username,
          email: data.users[key].email,
          id: key,
        });
      }

      dispatch(usersActions.addUsers(usersData));
    };

    getAllData();
  }, []);

  const passwordInputRef = useRef();
  const emailInputRef = useRef();

  const formSubmitHandler = async (event) => {
    event.preventDefault();

    const passwordInputValue = passwordInputRef.current.value;
    const emailInputValue = emailInputRef.current.value;

    loginHandler(emailInputValue, passwordInputValue);
    emailInputRef.current.value = "";
    passwordInputRef.current.value = "";
  };

  const loginHandler = async (email, password) => {
    setIsAuthenticating(true);
    try {
      const userData = await login(email, password);
      users.forEach((user) => {
        if (user.email === userData.email) {
          userData.username = user.username;
          userData.id = user.id;
        }
      });
      dispatch(authActions.login(userData));
    } catch (error) {
      setAuthFailed(true);
    }
    setIsAuthenticating(false);
  };

  return (
    <div className='loginFormContainer'>
      <h1 className='loginFormContainer__heading'>Chat App</h1>

      <form onSubmit={formSubmitHandler} className='loginForm'>
        <input
          onClick={() => setAuthFailed(false)}
          ref={emailInputRef}
          type='text'
          id='email'
          placeholder='Enter your email'
          className='loginForm__input'
        />
        <input
          onClick={() => setAuthFailed(false)}
          ref={passwordInputRef}
          type='password'
          id='password'
          placeholder='Enter your password'
          className='loginForm__input'
        />
        <div className='errorMsgContainerLogin'>
          <p
            className={`errorMsgLogin ${
              !authFailed ? "" : "errorMsgLogin--show"
            }`}
          >
            Wrong credentials. Try again.
          </p>
        </div>

        {isAuthenticating ? (
          <Loader />
        ) : (
          <button
            onClick={() => setAuthFailed(false)}
            className='loginForm__submitBtn'
            type='submit'
          >
            Login
          </button>
        )}
      </form>

      <p className='signupBtn__container'>
        Not a member?
        <span className='signupBtn' onClick={toSignupPage}>
          Signup
        </span>
      </p>
    </div>
  );
};

export default Login;
