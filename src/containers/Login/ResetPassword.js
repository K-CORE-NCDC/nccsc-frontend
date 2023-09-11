import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { useHistory, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { changePassword } from '../../actions/api_actions';
import NCCLogo from '../../styles/images/logo02.svg';
import HeaderComponent from '../Common/HeaderComponent/HeaderComponent';
import KcoreFinalLogo from '../../assets/images/K-coreFinalLogo.png';

function ResetPassword() {
  let history = useHistory();
  const [errorMessage, setErrorMessage] = useState([]);
  const [isError, setIsError] = useState(false);
  const title = { id: 'ResetPassword', defaultMessage: 'Reset Password' };
  const { token } = useParams();
  const [userFormData, setUserFormData] = useState({
    password: '',
    cnfmpassword: '',
    uniqueKey: '',
    cp_type: 'reset_password',
    token: token
  });

  const updateSetPassword = (e) => {
    setUserFormData((previousState) => ({
      ...previousState,
      [e.target.name]: e.target.value
    }));
  };

  const setPasswordSuccess = () => {
    Swal.fire({
      title: 'Success',
      text: 'Password Reset Success, use your new Password to Login',
      icon: 'success',
      confirmButtonColor: '#003177',
      confirmButtonText: 'Ok',
      allowOutsideClick: false
    }).then((result) => {
      if (result.value) {
        history.push('/login/');
      }
    });
  };

  const setPasswordFailure = (status) => {
    setIsError(true);
    if (status === 'UserDoesntExist') {
      setErrorMessage([
        <p key="error" className="p-1 font-bold text-3xl text-red-500 italic">
          <FormattedMessage id={status} defaultMessage="User Doesn't Exist" />
        </p>
      ]);
    } else if (status === 'PasswordResetLinkExpire') {
      setErrorMessage([
        <p key="error" className="p-1 font-bold text-3xl text-red-500 italic">
          <FormattedMessage
            id={status}
            defaultMessage="Password Set link expired, Please try again after sometime"
          />
        </p>
      ]);
    } else if (status === 'SomethingWentWrong') {
      setErrorMessage([
        <p key="error" className="p-1 font-bold text-3xl text-red-500 italic">
          <FormattedMessage
            id={status}
            defaultMessage="Something went wrong, Please try again or Contact Us"
          />
        </p>
      ]);
    } else if (status === 'UniqueKeyError') {
      setErrorMessage([
        <p key="error" className="p-1 font-bold text-3xl text-red-500 italic">
          <FormattedMessage id={status} defaultMessage="Unique Key is Incorrect, Please check" />
        </p>
      ]);
    } else {
      setErrorMessage([
        <p key="error" className="ErrorText">
          {status}
        </p>
      ]);
    }
  };

  const formSubmitAction = () => {
    setIsError(false);
    if (userFormData && userFormData.password === '') {
      setIsError(true);
      setErrorMessage([
        <p key="error" className="ErrorText">
          <FormattedMessage id="PasswordEmpty" defaultMessage="Password cant be Empty" />
        </p>
      ]);
    } else if (userFormData && userFormData.cnfmpassword === '') {
      setIsError(true);
      setErrorMessage([
        <p key="error" className="ErrorText">
          <FormattedMessage id="PasswordEmpty" defaultMessage="Password cant be Empty" />
        </p>
      ]);
    } else if (
      userFormData &&
      userFormData.cnfmpassword !== '' &&
      userFormData.password !== userFormData.cnfmpassword
    ) {
      setIsError(true);
      setErrorMessage([
        <p key="error" className="ErrorText">
          <FormattedMessage
            id="PasswordsMatch"
            defaultMessage="Both Password and Confirm Password Should Match"
          />
        </p>
      ]);
    } else {
      setIsError(false);
      let data = changePassword('POST', userFormData);
      data
        .then((result) => {
          if (
            'data' in result &&
            'status' in result.data &&
            result.data.status === 'Password Updated Successfully'
          ) {
            setPasswordSuccess();
          } else if (
            'data' in result &&
            'status' in result.data &&
            result.data.status === "User Doesn't Exist"
          ) {
            setPasswordFailure('UserDoesntExist');
          } else if (
            'data' in result &&
            'status' in result.data &&
            result.data.status === 'Password Reset link expired'
          ) {
            setPasswordFailure('PasswordResetLinkExpire');
          } else if (
            'data' in result &&
            'status' in result.data &&
            result.data.status === 'Unique Key is Incorrect, Please check'
          ) {
            setPasswordFailure('UniqueKeyError');
          } else if ('data' in result && 'status' in result.data) {
            setPasswordFailure(result.data.status);
          }
        })
        .catch(() => {
          setPasswordFailure('SomethingWentWrong');
        });
    }
  };

  const breadCrumbs = {
    '/resetpassword/': [{ id: 'ResetPassword', defaultMessage: 'Reset Password', to: '' }]
  };

  return (
    <div>
      <HeaderComponent title={title} breadCrumbs={breadCrumbs['/resetpassword/']} type="single" />
      <article id="subContents" className="subContents">
        <div>
          <div className="MarginBottom5">
            <h1 className="logo">
              <a>
                <img src={KcoreFinalLogo} alt="logo" className="logo Block MAuto W10" />
              </a>
            </h1>
          </div>

          <div className="ptn">
            <div className="auto">
              <div className="pwSearch tac">
                <p className="h5">
                  <FormattedMessage id="SignupWelcome" defaultMessage="Please set the password you want to use." />
                </p>

                <form className="formBox" id="frm" method="post">
                  {/*  error messages */}
                  {isError && errorMessage && <div className="ErrorText">{errorMessage}</div>}

                  {/* Input unique Key */}
                  <div className="inputText MarginBottom5">
                    <FormattedMessage
                      id="ResetEnterPin"
                      defaultMessage="Please enter your PIN number."
                    >
                      {(placeholder) => (
                        <input
                          type="text"
                          value={userFormData.uniqueKey}
                          onChange={updateSetPassword}
                          id="uniqueKey"
                          name="uniqueKey"
                          placeholder={placeholder}
                          autoComplete="off"
                        />
                      )}
                    </FormattedMessage>
                  </div>

                  {/* Input Password */}
                  <div className="inputText MarginBottom5">
                    <FormattedMessage
                      id="PasswordConfirm1"
                      defaultMessage="Please Enter New Password."
                    >
                      {(placeholder) => (
                        <input
                          className={isError == true ? 'ErrorInput' : ''}
                          type="password"
                          value={userFormData.password}
                          onChange={updateSetPassword}
                          id="password"
                          name="password"
                          placeholder={placeholder}
                          autoComplete="off"
                        />
                      )}
                    </FormattedMessage>
                  </div>

                  {/* Input ConfirmPassword */}
                  <div className="inputText">
                    <FormattedMessage
                      id="PasswordConfirm2"
                      defaultMessage="Renter New Password."
                    >
                      {(placeholder) => (
                        <input
                          className={isError ? 'ErrorInput' : ''}
                          type="password"
                          id="cnfmpassword"
                          name="cnfmpassword"
                          placeholder={placeholder}
                          value={userFormData.cnfmpassword}
                          onChange={updateSetPassword}
                        />
                      )}
                    </FormattedMessage>
                  </div>
                </form>

              </div>

              {/* Reset Password Button  */}
              <div className="bottomBtns" style={{marginTop:"20px"}}>
                <div className="flex">
                  <button id="setPasswordBtn" onClick={formSubmitAction} className="btn btnPrimary">
                    <span>
                      <FormattedMessage id="ResetPassword" defaultMessage="Reset Password" />
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}

export default ResetPassword;
