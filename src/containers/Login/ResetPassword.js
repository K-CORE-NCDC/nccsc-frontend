import React, { useState } from 'react'
import { EyeIcon, EyeOffIcon } from "@heroicons/react/outline";
import { useHistory } from "react-router-dom";
import {
  useParams
} from "react-router-dom";

import {
  changePassword,
} from "../../actions/api_actions";
import Swal from 'sweetalert2';
import HeaderComponent from "../Common/HeaderComponent/HeaderComponent";
import NCCLogo from "../../styles/images/logo02.svg"

function ResetPassword() {
  let history = useHistory();
  const [errorMessage, setErrorMessage] = useState([]);
  const [isError, setIsError] = useState(false)
  const title = { id: "ResetPassword", defaultMessage: "Reset Password" }
  const { token } = useParams();
  const [userFormData, setUserFormData] = useState({
    password: "",
    cnfmpassword: "",
    uniqueKey:"",
    cp_type: "reset_password",
    token:token
  });
  
  const updateSetPassword = (e) => {
    setUserFormData((previousState) => ({
      ...previousState,
      [e.target.name]: e.target.value,
    }));
  };

  const setPasswordSuccess = () => {
    // id is PasswordUpdateSuccess
    Swal.fire({
      title: 'Success',
      text: "Password Reset Success, use your new Password to Login",
      icon: 'success',
      confirmButtonColor: '#003177',
      confirmButtonText: 'Ok',
      allowOutsideClick: false
    }).then((result) => {
      if (result.value) {
        history.push('/login/')
      }
    })

  }

  const setPasswordFailure = (status) => {
    setIsError(true)
    if (status === 'UserDoesntExist') {
      setErrorMessage([
        <p key="error" className="p-1 font-bold text-3xl text-red-500 italic">
          <FormattedMessage id={status} defaultMessage="User Doesn't Exist" />
        </p>,
      ]);
    }
    else if (status === 'PasswordResetLinkExpire') {
      setErrorMessage([
        <p key="error" className="p-1 font-bold text-3xl text-red-500 italic">
          <FormattedMessage id={status} defaultMessage="Password Set link expired, Please try again after sometime" />
        </p>,
      ]);
    }
    else if(status === 'SomethingWentWrong'){
      setErrorMessage([
        <p key="error" className="p-1 font-bold text-3xl text-red-500 italic">
          <FormattedMessage id={status} defaultMessage="Something went wrong, Please try again or Contact Us" />
        </p>,
      ]);
    }
    else if(status === 'UniqueKeyError'){
      setErrorMessage([
        <p key="error" className="p-1 font-bold text-3xl text-red-500 italic">
          <FormattedMessage id={status} defaultMessage="Unique Key is Incorrect, Please check" />
        </p>,
      ]);
    }
    else{
      setErrorMessage([
        <p key="error" className="ErrorText">
        {status}
      </p>,
    ]);
  }
  };

 const formSubmitAction = (e) => {
    setIsError(false)

    if (userFormData && userFormData.password === '') {
      setIsError(true)
      setErrorMessage([
        <p key="error" className="ErrorText">
          <FormattedMessage id="PasswordEmpty" defaultMessage="Password cant be Empty" />
        </p>,
      ]);
    }
    else if (userFormData && userFormData.cnfmpassword === '') {
      setIsError(true)
      setErrorMessage([
        <p key="error" className="ErrorText">
          <FormattedMessage id="PasswordEmpty" defaultMessage="Password cant be Empty" />
        </p>,
      ]);
    }
    else if (userFormData && userFormData.cnfmpassword !== '' && userFormData.password !== userFormData.cnfmpassword) {
      setIsError(true)
      setErrorMessage([
        <p key="error" className="ErrorText">
          <FormattedMessage id="PasswordsMatch" defaultMessage="Both Password and Confirm Password Should Match" />
        </p>,
      ]);
    }
    else {
      setIsError(false)
      let data = changePassword("POST", userFormData)
      data.then((result) => {
        if ('data' in result && 'status' in result.data && result.data.status === "Password Updated Successfully") {
          setPasswordSuccess();
        }
        else if ('data' in result && 'status' in result.data && result.data.status === "User Doesn't Exist") {
          setPasswordFailure("UserDoesntExist");
        }
        else if ('data' in result && 'status' in result.data && result.data.status === "Password Reset link expired") {
          setPasswordFailure("PasswordResetLinkExpire");
        }
        else if ('data' in result && 'status' in result.data && result.data.status === "Unique Key is Incorrect, Please check") {
          setPasswordFailure("UniqueKeyError");
        }
        else if ('data' in result && 'status' in result.data) {
          setPasswordFailure(result.data.status);
        }
      }).catch((error) => {
        setPasswordFailure('SomethingWentWrong');
      });
    }
  };


   const breadCrumbs = {
    '/reset-password/': [
      { id: 'resetpassword', defaultMessage: 'ResetPassword', to: '' }
    ],
  };



  return (
    <div>
      <HeaderComponent
        title={title}
        breadCrumbs={breadCrumbs['/set-password/']}
        type="single"
      />
      <article id="subContents" className="subContents">
        <div className="ptn">
          <div className="auto">
            <div className="loginWrap">
              <img src={NCCLogo} alt="" />
              <p className="main">
                <span className="colorSecondary">
                  <font style={{ verticalAlign: 'inherit' }}></font>
                </span>
                <font style={{ verticalAlign: 'inherit' }}>
                  <span className="colorPrimary">
                    <font style={{ verticalAlign: 'inherit' }}><FormattedMessage id="Welcome" defaultMessage="Welcome"/></font>
                  </span>
                  <font style={{ verticalAlign: 'inherit' }}> <FormattedMessage id="to" defaultMessage="to"/> </font>
                  <span className="colorSecondary">
                    <font style={{ verticalAlign: 'inherit' }}>NCDC .</font>
                  </span>
                </font>
                <span className="colorPrimary">
                  <font style={{ verticalAlign: 'inherit' }}></font>
                </span>
              </p>
              <p className="sub">
                <font style={{ verticalAlign: 'inherit' }}>
                  <font style={{ verticalAlign: 'inherit' }}>
                    <FormattedMessage id="WelcomeNcdc" defaultMessage="Welcome to the National Cancer Data Center website."/>
                    {' '}
                  </font>
                </font>
                <br />
                <font style={{ verticalAlign: 'inherit' }}>
                  <font style={{ verticalAlign: 'inherit' }}>
                  <FormattedMessage id="loginmessage" defaultMessage="Please enter the information below to log in."/>
                  </font>
                </font>
              </p>

              <form className="loginForm" id="frm" method="post">

                {/*  error messages */}
                {isError && errorMessage && (
                  <div className="ErrorText">
                    {errorMessage}
                  </div>
                )}

                {/* Input unique Key */}
                <div className="inputText">
                  <input type="text" value={userFormData.uniqueKey} onChange={updateSetPassword} id="uniqueKey" name="uniqueKey" placeholder="Please Enter the 4 digit Unique Key." autoComplete="off" />
                </div>

                {/* Input Password */}
                <div className="inputText">
                  <input className={isError == true ? 'ErrorInput' : ""} type="password" value={userFormData.password} onChange={updateSetPassword} id="password" name="password" placeholder="Please Enter New Password." autoComplete="off" />
                </div>

                {/* Input ConfirmPassword */}
                <div className="inputText">
                  <input className={isError ? 'ErrorInput' : ""} type="password" id="cnfmpassword" name="cnfmpassword" placeholder="Renter New Password." value={userFormData.cnfmpassword} onChange={updateSetPassword} />
                </div>


                {/* Set Password Button  */}
                <button type="button" className="btn btnPrimary" id="setPasswordBtn" onClick={formSubmitAction}>
                  <font style={{ verticalAlign: 'inherit' }}>
                    <font style={{ verticalAlign: 'inherit' }}>Reset Password</font>
                  </font>
                </button>

              </form>
            </div>
          </div>
        </div>
      </article>
    </div>
  )
}

export default ResetPassword


