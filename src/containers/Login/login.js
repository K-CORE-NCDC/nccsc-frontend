import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { Link, useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';
import { login } from '../../actions/api_actions';
import loginIcon1 from '../../styles/images/loginForm-icon01.svg';
import loginIcon2 from '../../styles/images/loginForm-icon02.svg';
import NCCLogo from '../../styles/images/logo02.svg';
import HeaderComponent from '../Common/HeaderComponent/HeaderComponent';

const LoginComponent = () => {
  const [userFormData, setUserFormData] = useState({
    userId: '',
    password: ''
  });
  let history = useHistory();
  const [errorMessage, setErrorMessage] = useState([]);
  const [isError, setIsError] = useState(false);
  const title = { id: 'Login', defaultMessage: 'Login' };

  const updateUserNamePassword = (e) => {
    setUserFormData((previousState) => ({
      ...previousState,
      [e.target.name]: e.target.value
    }));
  };

  const loginSuccess = () => {
    // id is LoginSuccess
    Swal.fire({
      title: 'Success',
      text: 'Login Success',
      icon: 'success',
      confirmButtonColor: '#003177',
      confirmButtonText: 'Ok',
      allowOutsideClick: false
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
          <FormattedMessage id={status} defaultMessage="Login Failed, Invalid username/Password" />
        </p>
      ]);
    } else {
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
          <FormattedMessage id="UserIdEmpty" defaultMessage="User ID cant be Empty" />
        </p>
      ]);
    } else if (userFormData && userFormData.password === '') {
      setIsError(true);
      setErrorMessage([
        <p key="error" className="ErrorText">
          <FormattedMessage id="PasswordEmpty" defaultMessage="Password cant be Empty" />
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
            result.data.status === 'Login Successfull'
          ) {
            loginSuccess();
          } else if (
            'data' in result &&
            'status' in result.data &&
            result.data.status === "User Doesn't Exist"
          ) {
            loginFailure('UserDoesntExist');
          } else if (
            'data' in result &&
            'status' in result.data &&
            result.data.status === 'Login Failed, Invalid username/Password'
          ) {
            loginFailure('InvalidUsernamePass');
          } else if ('data' in result && 'status' in result.data) {
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
                    <font style={{ verticalAlign: 'inherit' }}>
                      <FormattedMessage id=" " defaultMessage="Welcome" />
                    </font>
                  </span>

                  <font style={{ verticalAlign: 'inherit' }}>
                    {' '}
                    <FormattedMessage id=" " defaultMessage="to" />{' '}
                  </font>
                  <span className="colorSecondary">
                    <font style={{ verticalAlign: 'inherit' }}>
                      <FormattedMessage id="WelCome" defaultMessage="K-Core Portal" />
                    </font>
                  </span>
                </font>
                <span className="colorPrimary">
                  <font style={{ verticalAlign: 'inherit' }}></font>
                </span>
              </p>
              <p className="sub">
                <font style={{ verticalAlign: 'inherit' }}>
                  <font style={{ verticalAlign: 'inherit' }}>
                    <FormattedMessage
                      id="WelcomeNcdc"
                      defaultMessage="Welcome to K-Cancer Omics Research Portal."
                    />{' '}
                  </font>
                </font>
                <br />
                <font style={{ verticalAlign: 'inherit' }}>
                  <font style={{ verticalAlign: 'inherit' }}>
                    <FormattedMessage
                      id="loginmessage"
                      defaultMessage="Please enter the information below to log in."
                    />
                  </font>
                </font>
              </p>

              <form className="loginForm" id="frm" method="post">
                {/*  error messages */}
                {isError && errorMessage && <div className="ErrorText">{errorMessage}</div>}
                {/* Input Username */}
                <div className="inputText">
                  <FormattedMessage id="PleaseEnterYourID" defaultMessage="Please enter your ID.">
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

                {/* Input Password */}
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
                <button
                  type="button"
                  className="btn btnPrimary"
                  id="loginBtn"
                  onClick={formSubmitAction}
                >
                  <font style={{ verticalAlign: 'inherit' }}>
                    <font style={{ verticalAlign: 'inherit' }}>
                      <FormattedMessage id="Login" defaultMessage="Login" />
                    </font>
                  </font>
                </button>

                {/* Find ID Button */}
                <div className="idPwSearch">
                  <Link to="/findid/">
                    <img src={loginIcon1} alt="" />
                    <font style={{ verticalAlign: 'inherit' }}>
                      <font style={{ verticalAlign: 'inherit' }}>
                        <FormattedMessage id="FindID" defaultMessage="Find ID" />
                      </font>
                    </font>
                  </Link>

                  {/* Find Password Button */}
                  <Link to="/findpassword/">
                    <img src={loginIcon2} alt="" />
                    <font style={{ verticalAlign: 'inherit' }}>
                      <font style={{ verticalAlign: 'inherit' }}>
                        <FormattedMessage id="FindPassword" defaultMessage="Find Password" />
                      </font>
                    </font>
                  </Link>
                </div>
              </form>

              <p style={{ marginTop: '30px' }}>
                <FormattedMessage
                  id="loginGuide"
                  defaultMessage="The user should be responsible for using result."
                />
              </p>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
};

export default LoginComponent;
