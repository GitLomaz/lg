import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useFeatureFlagEnabled } from 'posthog-js/react'
import { useUserState } from '../../contexts/useUserState';
import SPA_REACT_APP_API_URL from "../../config";
import GoogleLoginButton from "../GoogleLoginButton"
import * as Yup from 'yup';
import './Modal.css';
import http from '../../fetchConfig'
import posthog from 'posthog-js';

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
  const flagEnabled = useFeatureFlagEnabled('alternitive-login-text')

  const registerUser = async (values: any, setFieldError: any) => {
    setIsLoading(true)
    let URL = `${SPA_REACT_APP_API_URL}/auth/register`
    try {
      const response = await http.post(URL, values);
      if (!response?.data) {
        setFieldError("email", GENERIC_ERROR);
        return
      }
      switch (response.code) {
        case 'USERNAME_TAKEN':
          setFieldError("username", response.data);
          break;
        case 'EMAIL_TAKEN':
          setFieldError("email", response.data);
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
      const response = await http.post(URL, payload);
      if (!response?.data) {
        setFieldError("loginUsername", GENERIC_ERROR);
        return
      }
      switch (response.code) {
        case 'LOGIN_FAILED':
          setFieldError("loginUsername", response.data);
          break;
        case 'ACCOUNT_UNVERIFIED':
          setModalMode('unverified')
          break;
        case 'LOGIN_SUCCESSFUL':
          posthog.identify()
          completeLogin(response.data.username, response.data.image)
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
    <div className="fixed top-0 left-0 w-full h-full bg-black/50 flex justify-center items-center z-[1000]" onClick={resetAndClose}>
      <div className="bg-background text-white p-3 rounded-lg border-2 border-border shadow-lg w-[90%] max-w-[500px] text-center relative" onClick={(e) => e.stopPropagation()}>
        <button className="absolute top-2.5 right-4 bg-transparent border-none text-lg cursor-pointer text-white hover:text-red-600" onClick={resetAndClose}>&times;</button>
        {(() => {
        switch (modalMode) {
          case "login":
            return <>
            <div className="text-2xl">{flagEnabled ? "Log In" : "Sign In"}</div>
            <div className="modal-form w-80 p-5 mx-auto">
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
                      <label className="block text-left my-2.5 mb-1 font-bold">Username or Email Address</label>
                      <Field name="loginUsername" type="text" className="w-full p-2.5 border border-[#ccc] rounded-md text-base outline-none" />
                      <div id="loginUsernameError" className="h-6">
                        <ErrorMessage name="loginUsername" component="div" className="text-red-600 text-xs" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-left my-2.5 mb-1 font-bold">Password</label>
                      <Field name="loginPassword" type="password" className="w-full p-2.5 border border-[#ccc] rounded-md text-base outline-none" />
                      <div className="h-6">
                        <ErrorMessage name="loginPassword" component="div" className="text-red-600 text-xs" />
                      </div>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" id="remember" className="mt-2 mr-1.5" />
                      <label htmlFor="remember" className="mt-2">Remember on this device</label>
                    </div>
                    <button className={`w-20 m-2 p-2.5 bg-[#007bff] text-white border-none rounded-md text-base cursor-pointer transition-colors duration-300 hover:bg-border ${isLoading ? "cursor-default bg-[#586379]" : ""}`} type="submit">Sign In</button>
                  </Form>
                )}
              </Formik>
              <GoogleLoginButton loginFunction={completeLogin} ></GoogleLoginButton>
              <div>Don't have an account? <span onClick={() => {if (!isLoading) {setModalMode('register')}}} className='font-bold cursor-pointer'>click here</span> to register</div>
            </div>
          </>
          case "register":
            return <>
            <div className="text-2xl">Create Account</div>
            <div className="modal-form w-80 p-5 mx-auto">
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
                      <label className="block text-left my-2.5 mb-1 font-bold">Username</label>
                      <Field name="username" type="text" className="w-full p-2.5 border border-[#ccc] rounded-md text-base outline-none" />
                      <div id="usernameError" className="h-6">
                        <ErrorMessage name="username" component="div" className="text-red-600 text-xs" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-left my-2.5 mb-1 font-bold">Email Address</label>
                      <Field name="email" type="text" className="w-full p-2.5 border border-[#ccc] rounded-md text-base outline-none" />
                      <div className="h-6">
                        <ErrorMessage name="email" component="div" className="text-red-600 text-xs" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-left my-2.5 mb-1 font-bold">Password</label>
                      <Field name="password" type="password" className="w-full p-2.5 border border-[#ccc] rounded-md text-base outline-none" />
                      <div className="h-6">
                        <ErrorMessage name="password" component="div" className="text-red-600 text-xs" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-left my-2.5 mb-1 font-bold">Confirm Password</label>
                      <Field name="confirmPassword" type="password" className="w-full p-2.5 border border-[#ccc] rounded-md text-base outline-none" />
                      <div className="h-6">
                        <ErrorMessage name="confirmPassword" component="div" className="text-red-600 text-xs" />
                      </div>
                    </div>
                    <button className={`w-20 m-2 p-2.5 bg-[#007bff] text-white border-none rounded-md text-base cursor-pointer transition-colors duration-300 hover:bg-border ${isLoading ? "cursor-default bg-[#586379]" : ""}`} type="submit">Register</button>
                  </Form>
                )}
              </Formik>
              <div>Already have an account? <span onClick={() => {if (!isLoading) {setModalMode('login')}}} className='font-bold cursor-pointer'>click here</span></div>
            </div>
          </>;
          case "registered":
           return <div><div className="text-2xl">Thank you for registering!</div><br/>
            To complete your account setup, please check your inbox for a verification email and click the link to validate your email address. 
            If you don't see the email within a few minutes, be sure to check your spam or junk folder.<br/><br/>
            Need help? Feel free to contact our support team.</div>
          case "loggedin":
           return <div><div className="text-2xl">Login Successful</div></div>
          case "unverified":
           return <div><div className="text-2xl">Verification Required</div><br/>
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