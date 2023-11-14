import React, { useState, useContext } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { Link, useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';
import { login } from '../../actions/api_actions';
import loginIcon1 from '../../styles/images/loginForm-icon01.svg';
import loginIcon2 from '../../styles/images/loginForm-icon02.svg';
import KcoreFinalLogo from '../../assets/images/K-coreFinalLogo.png';
import HeaderComponent from '../Common/HeaderComponent/HeaderComponent';
import { Context } from '../../wrapper';

const LoginComponent = () => {
  const [userFormData, setUserFormData] = useState({
    userId: '',
    password: ''
  });
  let history = useHistory();
  const [errorMessage, setErrorMessage] = useState([]);
  const [isError, setIsError] = useState(false);
  const title = { id: 'Login', defaultMessage: 'Login' };
  const intl = useIntl();
  const context = useContext(Context);

  const updateUserNamePassword = (e) => {
    setUserFormData((previousState) => ({
      ...previousState,
      [e.target.name]: e.target.value
    }));
  };

  const loginSuccess = () => {
    // id is LoginSuccess
    Swal.fire({
      title: intl.formatMessage({ id: "Success", defaultMessage: 'Success' }),
      text: intl.formatMessage({ id: "LoginSuccess", defaultMessage: 'Login Success' }),
      icon: 'success',
      confirmButtonColor: '#003177',
      confirmButtonText: intl.formatMessage({ id: "Ok", defaultMessage: 'Ok' }),
      allowOutsideClick: false,
    }).then((result) => {
      if (result.value) {
        if (history?.location?.pathname === '/login/') {
          history.push('/');
        } else {
          history.goBack();
        }
      }
    });
  };

  const loginFailure = (status) => {
    setIsError(true);
    if (status === 'UserDoesntExist') {
      setErrorMessage([
        <p key="error" className="p-1 font-bold text-3xl text-red-500 italic">
          <FormattedMessage id={status} defaultMessage="User Doesn't Exist" />
        </p>
      ]);
    } else if (status === 'InvalidUsernamePass') {
      setErrorMessage([
        <p key="error" className="p-1 font-bold text-3xl text-red-500 italic">
          <FormattedMessage id={status} defaultMessage="Login Failed. Invalid Registration number and Password." />
        </p>
      ]);
    }
    else if (status === 'InActive') {
      setErrorMessage([
        <p key="error" className="p-1 font-bold text-3xl text-red-500 italic">
          <FormattedMessage id={status} defaultMessage="Account is Inactive" />
        </p>
      ]);
    }

    else {
      setErrorMessage([
        <p key="error" className="ErrorText">
          {status}
        </p>,
        <h1 className="ErrorText" key="CountToEnterCredentials">
          {' '}
          <FormattedMessage
            id="login5try"
            defaultMessage="If an error in consecutive password input (5 times) occurs, the account is locked."
          />
        </h1>
      ]);
    }
  };

  const formSubmitAction = () => {
    setIsError(false);

    if (userFormData && userFormData.userId === '') {
      setIsError(true);
      setErrorMessage([
        <p key="error" className="ErrorText">
          <FormattedMessage id="UserRegistrationEmpty" defaultMessage="User registration number can't be Empty." />
        </p>
      ]);
    } else if (userFormData && userFormData.password === '') {
      setIsError(true);
      setErrorMessage([
        <p key="error" className="ErrorText">
          <FormattedMessage id="PasswordEmpty" defaultMessage="Password can't be Empty" />
        </p>
      ]);
    } else {
      setIsError(false);
      let data = login('POST', userFormData);
      data
        .then((result) => {
          if (
            'data' in result &&
            'status' in result.data &&
            result.data.status === 'Success'
          ) {
            loginSuccess();
          } else if (
            'data' in result &&
            'status' in result.data &&
            result.data.status === "UserDoesntExist"
          ) {
            loginFailure('UserDoesntExist');
          } else if (
            'data' in result &&
            'status' in result.data &&
            result.data.status === 'LoginFailed'
          ) {
            loginFailure('InvalidUsernamePass');
          }
          else if (
            'data' in result &&
            'status' in result.data &&
            result.data.status === 'InActive'
          ) {
            loginFailure('InActive');
          }
          else if ('data' in result && 'status' in result.data) {
            loginFailure(result.data.status);
          }
        })
        .catch(() => {
          loginFailure('InvalidUsernamePass');
        });
    }
  };

  const breadCrumbs = {
    '/login/': [{ id: 'Login', defaultMessage: 'Login', to: '/login/' }]
  };

  return (
    <div>
      <HeaderComponent title={title} breadCrumbs={breadCrumbs['/login/']} type="single" />
      <article id="subContents" className="subContents">
        <div>

          <div className="contentsTitle">
            <div className="auto">
              <h1 className="logo MarginBottom5">
                <a>
                  <img src={KcoreFinalLogo} alt="logo" className="logo Block MAuto W10" />
                </a>
              </h1>
              <div className="MultiUploadTextCenter">
                <h1 className="main">
                  <font style={{ verticalAlign: 'inherit' }}>
                    <span className="colorPrimary">
                      <font style={{ verticalAlign: 'inherit' }}>
                        <FormattedMessage id="WelcomTo" defaultMessage="Welcome to" />
                      </font>
                    </span>
                    {' '}
                    {context.locale === 'en-US' &&
                      <span className="colorSecondary">
                        <font style={{ verticalAlign: 'inherit' }}>
                          <FormattedMessage id="K-Core Portal" defaultMessage="K-Core Portal" />
                        </font>
                      </span>
                    }
                  </font>
                  <span className="colorPrimary">
                    <font style={{ verticalAlign: 'inherit' }}></font>
                  </span>
                </h1>
                <h1 className="sub">
                  <font style={{ verticalAlign: 'inherit' }}>
                    <font style={{ verticalAlign: 'inherit' }}>
                      <FormattedMessage
                        id="loginmessage"
                        defaultMessage="Please enter the information below to log in."
                      />
                    </font>
                  </font>
                </h1>
              </div>
            </div>
          </div>

          <div className="ptn">
            <div className="auto">
              <div className="pwSearch tac">
                <form className="formBox" id="frm" method="post" name="frm">
                  {/*  error messages */}
                  {isError && errorMessage && <div className="ErrorText">{errorMessage}</div>}

                  {/* Input Username */}
                  <dl>
                    <dt style={{ width: "250px", display: "flex" }}>
                      <img src={loginIcon1} alt="" />
                      <FormattedMessage id="RegistrationNumber" defaultMessage="Registration Number" />
                    </dt>
                    <dd>
                      <div className="inputText">
                        <FormattedMessage id="PleaseEnterYourRegistrationNumber" defaultMessage="Please enter your Registration number.">
                          {(placeholder) => (
                            <input
                              className={isError === true ? 'ErrorInput' : ''}
                              type="text"
                              value={userFormData.userId}
                              onChange={updateUserNamePassword}
                              id="userId"
                              name="userId"
                              placeholder={placeholder}
                              autoComplete="off"
                            />
                          )}
                        </FormattedMessage>
                      </div>
                    </dd>
                  </dl>

                  {/* Input Password */}
                  <dl>
                    <dt style={{ width: "250px", display: "flex" }}>
                      <img src={loginIcon2} alt="" />
                      <FormattedMessage id="Password" defaultMessage="Password" />
                    </dt>
                    <dd>
                      <div className="inputText">
                        <FormattedMessage
                          id="PleaseEnterAPassword"
                          defaultMessage="Please enter a password"
                        >
                          {(placeholder) => (
                            <input
                              className={isError ? 'ErrorInput' : ''}
                              type="password"
                              id="password"
                              name="password"
                              placeholder={placeholder}
                              value={userFormData.password}
                              onChange={updateUserNamePassword}
                            />
                          )}
                        </FormattedMessage>
                      </div>
                    </dd>
                  </dl>



                  <div className="MarginTop10">
                    <div>
                      {/* Find ID Button */}
                      <div className="flex Gap5 idPwSearch">
                        <Link to="/findregistrationnumber/" id="FindRegistrationNumberLink">
                          <img src={loginIcon1} alt="" />
                          <font style={{ verticalAlign: 'inherit' }}>
                            <font style={{ verticalAlign: 'inherit' }}>
                              <FormattedMessage id="FindRegistrationNumber" defaultMessage="Find Registration Number" />
                            </font>
                          </font>
                        </Link>

                        {/* Find Password Button */}
                        <Link to="/findpassword/" id="FindPasswordLink">
                          <img src={loginIcon2} alt="" />
                          <font style={{ verticalAlign: 'inherit' }}>
                            <font style={{ verticalAlign: 'inherit' }}>
                              <FormattedMessage id="FindPassword" defaultMessage="Find Password" />
                            </font>
                          </font>
                        </Link>
                      </div>
                    </div>
                  </div>

                  <p style={{ marginTop: '10px' }}>
                    <FormattedMessage
                      id="loginGuide"
                      defaultMessage="The user should be responsible for using result."
                    />
                  </p>

                </form>

                <div className="bottomBtns MarginTop4">
                  <div className="flex">

                    <button
                      type="button"
                      className="btn btnPrimary"
                      id="LoginButton"
                      onClick={formSubmitAction}
                    >
                      <font style={{ verticalAlign: 'inherit' }}>
                        <font style={{ verticalAlign: 'inherit' }}>
                          <FormattedMessage id="Login" defaultMessage="Login" />
                        </font>
                      </font>
                    </button>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>

      </article >
    </div >
  );
};

export default LoginComponent;
