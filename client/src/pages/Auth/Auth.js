import { useState } from 'react'

import './Auth.css'

import Login from './Login/Login'
import Signup from './Signup/Signup'

import loginImg from '../../assets/login.svg'

const Auth = () => {
  const [isLoggingIn, setIsLoggingIn] = useState(true)

  const toLoginPage = () => {
    setIsLoggingIn(true)
  }

  const toSignupPage = () => {
    setIsLoggingIn(false)
  }

  return (
    <div className="authContainer">
      {isLoggingIn ? (
        <Login toSignupPage={toSignupPage} />
      ) : (
        <Signup toLoginPage={toLoginPage} />
      )}
      <img className="auth__img" src={loginImg} alt="group chat" />
    </div>
  )
}

export default Auth
