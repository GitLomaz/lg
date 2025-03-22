import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import REACT_APP_API_URL from "../../config";
import * as Yup from 'yup';
import './LoginModal.css';
import axios from 'axios';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

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

  const registerUser = async (values: any) => {
    setIsLoading(true)
    let URL = `${REACT_APP_API_URL}/auth/register`
    try {
      const response = await axios.post(URL, values);
      console.log(response)
    } catch (error: any) {
      const errorMessage = error.response.data.message
      console.error('Failed to create user:', errorMessage);
    } finally {
      setIsLoading(false)
    }
  }

  function resetAndClose() {
    setModalMode('login')
    onClose()
  }

  if (!isOpen) return <></>
  return (
    <div className="modal-backdrop" onClick={resetAndClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={resetAndClose}>&times;</button>
        {modalMode === 'login' ? 
          <>
          <div className="modal-header">Log In</div>
          <div className="modal-form">
            <Formik
              key={'login'}
              enableReinitialize
              initialValues={{ loginUsername: '', loginPassword: '' }}
              validationSchema={loginSchema}
              validateOnChange={false}
              validateOnBlur={false}
              onSubmit={(values) => {
                console.log(values);
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
                  <button type="submit">Login</button>
                </Form>
              )}
            </Formik>
            <div>Don't have an account? <span onClick={() => {if (!isLoading) {setModalMode('register')}}} className='register-click'>click here</span> to register</div>
          </div>
        </>:<>
          <div className="modal-header">Create Account</div>
          <div className="modal-form">
          <Formik
              key={'register'}
              enableReinitialize
              initialValues={{ username: '', email: '', password: '', confirmPassword: '' }}
              validationSchema={registerSchema}
              validateOnChange={false}
              validateOnBlur={false}
              onSubmit={(values) => registerUser(values)}
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
                  <button type="submit">Register</button>
                </Form>
              )}
            </Formik>
            <div>Already have an account? <span onClick={() => {if (!isLoading) {setModalMode('login')}}} className='register-click'>click here</span></div>
          </div>
        </>
        }
      </div>
    </div>
  )
};

export default LoginModal;