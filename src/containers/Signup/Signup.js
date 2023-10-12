import React, { useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';
import { signin } from '../../actions/api_actions';
import nameIcon from '../../styles/images/icon-text.svg';
import HeaderComponent from '../Common/HeaderComponent/HeaderComponent';
import KcoreFinalLogo from '../../assets/images/K-coreFinalLogo.png';
const SignupComponent = () => {
  const [userFormData, setUserFormData] = useState({
    emailId: ''
  });
  let history = useHistory();
  const intl = useIntl();
  const [errorMessage, setErrorMessage] = useState([]);
  const title = { id: 'Signup', defaultMessage: 'Sign Up' };

  const breadCrumbs = {
    '/signup/': [{ id: 'Signup', defaultMessage: 'Sign Up', to: '/signup/' }]
  };

  const updateEmailId = (e) => {
    setUserFormData((previousState) => ({
      ...previousState,
      [e.target.name]: e.target.value
    }));
  };

  const registerSuccess = () => {
    //Id is SignupSuccess
    Swal.fire({
      title: intl.formatMessage({ id: "EmailSentSuccess", defaultMessage: 'Email sent completed' }),
      text: intl.formatMessage({ id: "SignupMail", defaultMessage: "Registration number Sent to Your Email" }),
      icon: 'success',
      confirmButtonColor: '#003177',
      confirmButtonText: intl.formatMessage({ id: "Ok", defaultMessage: 'Ok' }),
      allowOutsideClick: false
    }).then((result) => {
      if (result.value) {
        history.push('/login');
      }
    });
  };

  const registerFailure = (status) => {
    if (status === 'SignupAlreadyExist') {
      setErrorMessage([
        <p key="error" className="p-1 font-bold text-3xl text-red-500 italic">
          <FormattedMessage id={status} defaultMessage="User already exists" />
        </p>
      ]);
    } else if (status === 'SignupEmailError') {
      setErrorMessage([
        <p key="error" className="p-1 font-bold text-3xl text-red-500 italic">
          <FormattedMessage id={status} defaultMessage="Error in sending mail" />
        </p>
      ]);
    } else if (status === 'SignupContact') {
      setErrorMessage([
        <p key="error" className="p-1 font-bold text-3xl text-red-500 italic">
          <FormattedMessage
            id={status}
            defaultMessage="Unable to complete Signup, please try again or Contact Us"
          />
        </p>
      ]);
    } else {
      setErrorMessage([
        <p key="error" className="p-1 font-bold text-3xl text-red-500 italic">
          {status}
        </p>
      ]);
    }
  };

  const formSubmitAction = (e) => {
    // e.preventDefault();
    if (userFormData['emailId']) {
      let data = signin('POST', userFormData);
      data
        .then((result) => {
          if (
            result.status === 200 &&
            'status' in result.data &&
            result.data.status === 'Registered Successfully'
          ) {
            registerSuccess(data);
          } else if (
            'data' in result &&
            'status' in result.data &&
            result.data.status === 'User already exists'
          ) {
            registerFailure('SignupAlreadyExist');
          } else if (
            'data' in result &&
            'status' in result.data &&
            result.data.status === 'Error in sending mail'
          ) {
            registerFailure('SignupEmailError');
          } else if ('data' in result && 'status' in result.data) {
            registerFailure(result.data.status);
          }
        })
        .catch(() => {
          registerFailure('SignupContact');
        });
    }
  };

  return (
    <>
      <HeaderComponent title={title} breadCrumbs={breadCrumbs['/signup/']} type="single" />
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
                  <FormattedMessage
                    id="SignupMsg1"
                    defaultMessage="Please use the service after Signing Up"
                  />
                </p>
                <form className="formBox" id="frm" method="post" name="frm">
                  {errorMessage && <div className="ErrorText">{errorMessage}</div>}

                  <p style={{ marginBottom: '30px', textAlign: 'center' }}>
                    <FormattedMessage
                      id="singUpGuide"
                      defaultMessage="An email containing the registration number, PIN number, and password setting link will be sent to the entered email address."
                    />
                  </p>

                  <dl>
                    <dt>
                      <img src={nameIcon} alt="" />
                      <FormattedMessage id="EmailId" defaultMessage="E-mail" />
                    </dt>
                    <dd>
                      <div className="inputText">
                        <FormattedMessage
                          id="PleaseEnterYourEmailId"
                          defaultMessage="Please enter your E-mail address"
                        >
                          {(placeholder) => (
                            <input
                              type="text"
                              className="w100"
                              id="emailId"
                              name="emailId"
                              placeholder={placeholder}
                              autoComplete="off"
                              value={userFormData.emailId}
                              onChange={updateEmailId}
                            />
                          )}
                        </FormattedMessage>
                      </div>
                    </dd>
                  </dl>
                </form>
              </div>
              <div className="bottomBtns">
                <div className="flex">
                  <button onClick={formSubmitAction} className="btn btnPrimary" id="SignUpButton">
                    <span>
                      <FormattedMessage id="Signup" defaultMessage="Sign up" />
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>
    </>
  );
};

export default SignupComponent;
