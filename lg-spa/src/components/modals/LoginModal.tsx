import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useUserState } from '../../contexts/useUserState';
import SPA_REACT_APP_API_URL from "../../config";
import GoogleLoginButton from "../GoogleLoginButton"
import * as Yup from 'yup';
import './LoginModal.css';
import axios from '../../axiosConfig'

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const GENERIC_ERROR = "An unexpected error occurred. Please try again."

const loginSchema = Yup.object().shape({
  loginUsername: Yup.string().required('Email or Username is required'),
  loginPassword: Yup.string().required('Password is required'),
});

const registerSchema = Yup.object().shape({
  username: Yup.string()
    .required("Username is required")
    .min(3, "Username must be at least 3 characters")
    .max(20, "Username must not exceed 20 characters")
    .matches(/^[a-zA-Z0-9]+$/, "Username can only contain letters and numbers"),

  email: Yup.string()
    .required("Email is required")
    .email("Invalid email address"),

  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[0-9]/, "Password must contain at least one number")
    .matches(/[@$!%*?&]/, "Password must contain at least one special character"),

  confirmPassword: Yup.string()
    .required("Please confirm your password")
    .oneOf([Yup.ref("password")], "Passwords must match"),
});

const LoginModal: React.FC<ModalProps> = ( { isOpen, onClose } ) => {
  const [modalMode, setModalMode] = useState<string>('login')
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { user, setUser } = useUserState()

  const registerUser = async (values: any, setFieldError: any) => {
    setIsLoading(true)
    let URL = `${SPA_REACT_APP_API_URL}/auth/register`
    try {
      const response = await axios.post(URL, values);
      if (!response?.data?.data) {
        setFieldError("email", GENERIC_ERROR);
        return
      }
      switch (response.data.code) {
        case 'USERNAME_TAKEN':
          setFieldError("username", response.data.data);
          break;
        case 'EMAIL_TAKEN':
          setFieldError("email", response.data.data);
          break;
        case 'ACCOUNT_REGISTERED':
          setModalMode('registered')
          break;
        default:
          setFieldError("email", GENERIC_ERROR);
          break;
      }
    } catch (error: any) {
      setFieldError("email", GENERIC_ERROR);
    } finally {
      setIsLoading(false)
    }
  }

  const loginUser = async (values: any, setFieldError: any) => {
    const payload = {
      username: values.loginUsername,
      password: values.loginPassword
    }
    setIsLoading(true)
    let URL = `${SPA_REACT_APP_API_URL}/auth/login`
    try {
      const response = await axios.post(URL, payload);
      if (!response?.data?.data) {
        setFieldError("loginUsername", GENERIC_ERROR);
        return
      }
      switch (response.data.code) {
        case 'LOGIN_FAILED':
          setFieldError("loginUsername", response.data.data);
          break;
        case 'ACCOUNT_UNVERIFIED':
          setModalMode('unverified')
          break;
        case 'LOGIN_SUCCESSFUL':
          completeLogin(response.data.data.username, response.data.data.image)
          break;
        default:
          setFieldError("loginUsername", GENERIC_ERROR);
          break;
      }
    } catch (error: any) {
      setFieldError("loginUsername", GENERIC_ERROR);
    } finally {
      setIsLoading(false)
    }
  }

  const completeLogin = (username: string, image: string) => {
    setModalMode('loggedin')
    setUser({
      username: username,
      avatarUrl: image
    })
  }

  const resetAndClose = () => {
    setModalMode('login')
    onClose()
  }

  if (!isOpen) return <></>
  return (
    <div className="modal-backdrop" onClick={resetAndClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={resetAndClose}>&times;</button>
        {(() => {
        switch (modalMode) {
          case "login":
            return <>
            <div className="modal-header">Log In</div>
            <div className="modal-form">
              <Formik
                key={'login'}
                enableReinitialize
                initialValues={{ loginUsername: '', loginPassword: '' }}
                validationSchema={loginSchema}
                validateOnChange={false}
                validateOnBlur={false}
                onSubmit={(values, { setFieldError }) => { {if (!isLoading) {loginUser(values, setFieldError)}};
              }}
              >
                {() => (
                  <Form>
                    <div>
                      <label>Username or Email Address</label>
                      <Field name="loginUsername" type="text" />
                      <div id="loginUsernameError" className="error-message-container">
                        <ErrorMessage name="loginUsername" component="div" className="error-message" />
                      </div>
                    </div>
                    <div>
                      <label>Password</label>
                      <Field name="loginPassword" type="password" />
                      <div className="error-message-container">
                        <ErrorMessage name="loginPassword" component="div" className="error-message" />
                      </div>
                    </div>
                    <div className="remember-container">
                      <input type="checkbox" id="remember" />
                      <label htmlFor="remember">Remember on this device</label>
                    </div>
                    <button className={isLoading ? "disabled" : ""} type="submit">Sign In</button>
                  </Form>
                )}
              </Formik>
              <GoogleLoginButton loginFunction={completeLogin} ></GoogleLoginButton>
              <div>Don't have an account? <span onClick={() => {if (!isLoading) {setModalMode('register')}}} className='register-click'>click here</span> to register</div>
            </div>
          </>
          case "register":
            return <>
            <div className="modal-header">Create Account</div>
            <div className="modal-form">
            <Formik
              key={'register'}
              enableReinitialize
              initialValues={{ username: '', email: '', password: '', confirmPassword: '' }}
              validationSchema={registerSchema}
              validateOnChange={false}
              validateOnBlur={false}
              onSubmit={(values, { setFieldError }) => {if (!isLoading) {registerUser(values, setFieldError)}
            }}
            >
                {() => (
                  <Form>
                    <div>
                      <label>Username</label>
                      <Field name="username" type="text" />
                      <div id="usernameError" className="error-message-container">
                        <ErrorMessage name="username" component="div" className="error-message" />
                      </div>
                    </div>
                    <div>
                      <label>Email Address</label>
                      <Field name="email" type="text" />
                      <div className="error-message-container">
                        <ErrorMessage name="email" component="div" className="error-message" />
                      </div>
                    </div>
                    <div>
                      <label>Password</label>
                      <Field name="password" type="password" />
                      <div className="error-message-container">
                        <ErrorMessage name="password" component="div" className="error-message" />
                      </div>
                    </div>
                    <div>
                      <label>Confirm Password</label>
                      <Field name="confirmPassword" type="password" />
                      <div className="error-message-container">
                        <ErrorMessage name="confirmPassword" component="div" className="error-message" />
                      </div>
                    </div>
                    <button className={isLoading ? "disabled" : ""} type="submit">Register</button>
                  </Form>
                )}
              </Formik>
              <div>Already have an account? <span onClick={() => {if (!isLoading) {setModalMode('login')}}} className='register-click'>click here</span></div>
            </div>
          </>;
          case "registered":
           return <div><div className="modal-header">Thank you for registering!</div><br/>
            To complete your account setup, please check your inbox for a verification email and click the link to validate your email address. 
            If you don't see the email within a few minutes, be sure to check your spam or junk folder.<br/><br/>
            Need help? Feel free to contact our support team.</div>
          case "loggedin":
           return <div><div className="modal-header">Login Successful</div></div>
          case "unverified":
           return <div><div className="modal-header">Verification Required</div><br/>
            Your email has not been verified yet. Please check your inbox for a verification link before logging in.</div>
          default:
            return <div></div>;
        }
      })()}
      </div>
    </div>
  )
};

export default LoginModal;