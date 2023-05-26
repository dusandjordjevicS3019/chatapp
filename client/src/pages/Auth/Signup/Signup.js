import { useRef, useState } from 'react'

import './Signup.css'
import Loader from '../../../components/Loader/Loader'
import { createUser } from '../../../util/auth'
import sendData from '../../../util/sendData'

const Signup = ({ toLoginPage }) => {
  const [formIsValid, setFormIsValid] = useState(false)
  const [usernameIsValid, setUsernameIsValid] = useState(null)
  const [passwordIsValid, setPasswordIsValid] = useState(null)
  const [passwordRepeatIsValid, setPasswordRepeatIsValid] = useState(null)
  const [emailIsValid, setEmailIsValid] = useState(null)
  const [isAuthenticating, setIsAuthenticating] = useState(false)
  const [userCreationFailed, setUserCreationFailed] = useState(false)

  const passwordInputRef = useRef()
  const passwordRepeatInputRef = useRef()
  const emailInputRef = useRef()
  const usernameInputRef = useRef()

  const formValidationHandler = () => {
    if (
      passwordInputRef.current.value.length >= 6 &&
      passwordRepeatInputRef.current.value === passwordInputRef.current.value &&
      emailInputRef.current.value.includes('@') &&
      usernameInputRef.current.value.length >= 6
    ) {
      setFormIsValid(true)
    } else {
      setFormIsValid(false)
    }
  }

  const passwordValidationHandler = () => {
    if (passwordInputRef.current.value.length < 6) {
      setPasswordIsValid(false)
    }
  }

  const passwordRepeatValidationHandler = () => {
    if (
      passwordRepeatInputRef.current.value !== passwordInputRef.current.value
    ) {
      setPasswordRepeatIsValid(false)
    }
  }

  const usernameValidationHandler = () => {
    if (usernameInputRef.current.value.length < 6) {
      setUsernameIsValid(false)
    }
  }

  const emailvalidationHandler = () => {
    if (!emailInputRef.current.value.includes('@')) {
      setEmailIsValid(false)
    }
  }

  const passwordInputHandler = () => {
    setPasswordIsValid(true)
    formValidationHandler()
  }
  const passwordRepeatInputHandler = () => {
    setPasswordRepeatIsValid(true)
    formValidationHandler()
  }
  const emailInputHandler = () => {
    setEmailIsValid(true)
    formValidationHandler()
  }
  const usernameInputHandler = () => {
    setUsernameIsValid(true)
    formValidationHandler()
  }

  const formSubmitHandler = async (event) => {
    event.preventDefault()

    const passwordInputValue = passwordInputRef.current.value
    const emailInputValue = emailInputRef.current.value
    const usernameInputValue = usernameInputRef.current.value

    if (!formIsValid) {
      return
    }

    const signupFormInfo = {
      username: usernameInputValue,
      password: passwordInputValue,
      email: emailInputValue,
    }

    signupHandler(
      signupFormInfo.email,
      signupFormInfo.password,
      signupFormInfo.username
    )

    emailInputRef.current.value = ''
    passwordInputRef.current.value = ''
    passwordRepeatInputRef.current.value = ''
    usernameInputRef.current.value = ''

    formValidationHandler()
  }

  const signupHandler = async (email, password, username) => {
    setIsAuthenticating(true)
    try {
      await createUser(email, password)
      await sendData('users', { email: email, username: username })
      toLoginPage()
    } catch (error) {
      setUserCreationFailed(true)
    }
    setIsAuthenticating(false)
  }

  return (
    <div className="signupFormContainer">
      <h1 className="signupFormContainer__heading">Signup</h1>

      <form onSubmit={formSubmitHandler} className="signupForm">
        <input
          onClick={() => setUserCreationFailed(false)}
          onChange={usernameInputHandler}
          onBlur={usernameValidationHandler}
          ref={usernameInputRef}
          type="text"
          id="username"
          placeholder="Enter a valid username"
          className={`signupForm__input ${
            usernameIsValid === false ? 'signupForm--invalidInput' : ''
          }`}
        />
        <div className="errorMsgContainer">
          <p
            className={`errorMsg ${
              usernameIsValid === false ? 'errorMsg--show' : ''
            }`}
          >
            Your username doesn't have enough characters
          </p>
        </div>
        <input
          onClick={() => setUserCreationFailed(false)}
          onChange={emailInputHandler}
          onBlur={emailvalidationHandler}
          ref={emailInputRef}
          type="text"
          id="email"
          placeholder="Enter a valid email address"
          className={`signupForm__input ${
            emailIsValid === false ? 'signupForm--invalidInput' : ''
          }`}
        />
        <div className="errorMsgContainer">
          <p
            className={`errorMsg ${
              emailIsValid === false ? 'errorMsg--show' : ''
            }`}
          >
            Your email address doesn't contain '@'
          </p>
        </div>
        <input
          onClick={() => setUserCreationFailed(false)}
          onChange={passwordInputHandler}
          onBlur={passwordValidationHandler}
          ref={passwordInputRef}
          type="password"
          id="password"
          placeholder="Enter a valid password"
          className={`signupForm__input ${
            passwordIsValid === false ? 'signupForm--invalidInput' : ''
          }`}
        />
        <div className="errorMsgContainer">
          <p
            className={`errorMsg ${
              passwordIsValid === false ? 'errorMsg--show' : ''
            }`}
          >
            Your password doesn't have enough characters
          </p>
        </div>
        <input
          onClick={() => setUserCreationFailed(false)}
          onChange={passwordRepeatInputHandler}
          onBlur={passwordRepeatValidationHandler}
          ref={passwordRepeatInputRef}
          type="password"
          id="passwordRepeat"
          placeholder="Repeat your password"
          className={`signupForm__input ${
            passwordRepeatIsValid === false ? 'signupForm--invalidInput' : ''
          }`}
        />
        <div className="errorMsgContainer">
          <p
            className={`errorMsg ${
              passwordRepeatIsValid === false ? 'errorMsg--show' : ''
            }`}
          >
            Your repeated password doesn't match
          </p>
        </div>

        {userCreationFailed && (
          <div className="errorMsgContainer">
            <p
              className={`errorMsg ${
                passwordRepeatIsValid === false ? 'errorMsg--show' : ''
              }`}
            >
              Something went wrong. Please try again later.
            </p>
          </div>
        )}

        {isAuthenticating ? (
          <Loader />
        ) : (
          <button
            className={
              formIsValid === true
                ? 'signupForm__submitBtn'
                : 'signupForm--disabledBtn'
            }
            type="submit"
          >
            Signup
          </button>
        )}
      </form>

      <p className="signupBtn__container">
        Back to
        <span className="signupBtn" onClick={toLoginPage}>
          Login
        </span>
      </p>
    </div>
  )
}

export default Signup
