import React, { useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { useHistory, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { changePassword } from '../../actions/api_actions';
import HeaderComponent from '../Common/HeaderComponent/HeaderComponent';
import KcoreFinalLogo from '../../assets/images/K-coreFinalLogo.png';

function SetPassword() {
  const intl = useIntl();
  const { token } = useParams();
  let history = useHistory();
  const [errorMessage, setErrorMessage] = useState([]);
  const [isError, setIsError] = useState(false);
  const title = { id: 'SetPassword', defaultMessage: 'Set Password' };
  const [userFormData, setUserFormData] = useState({
    password: '',
    cnfmpassword: '',
    token: token,
    cp_type: 'set_password'
  });

  const updateSetPassword = (e) => {
    setUserFormData((previousState) => ({
      ...previousState,
      [e.target.name]: e.target.value
    }));
  };

  const setPasswordSuccess = () => {
    Swal.fire({
      title: intl.formatMessage({ id: "PasswordSetSuccess0", defaultMessage: 'Password Set Success' }),
      text: intl.formatMessage({ id: "PasswordSetSuccess", defaultMessage: "You can use registration number after administrator's approval." }),
      icon: 'success',
      confirmButtonColor: '#003177',
      confirmButtonText: 'Ok',
      allowOutsideClick: false
    }).then((result) => {
      if (result.value) {
        history.push('/');
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
    } else if (status === 'PasswordSetLinkExpire') {
      setErrorMessage([
        <p key="error" className="p-1 font-bold text-3xl text-red-500 italic">
          <FormattedMessage
            id={status}
            defaultMessage="Password Set link expired, Please Register again"
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
            result.data.status === 'Success'
          ) {
            setPasswordSuccess();
          } else if (
            'data' in result &&
            'status' in result.data &&
            result.data.status === "UserDoesntExist"
          ) {
            setPasswordFailure('UserDoesntExist');
          } else if (
            'data' in result &&
            'status' in result.data &&
            result.data.status === 'PasswordSetLinkExpire'
          ) {
            setPasswordFailure('PasswordSetLinkExpire');
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
    '/set-password/': [{ id: 'set-password', defaultMessage: 'SetPassword', to: '' }]
  };

  return (
    <div>
      <HeaderComponent title={title} breadCrumbs={breadCrumbs['/set-password/']} type="single" />
      <article id="subContents" className="subContents">
        <div>

          <div className="contentsTitle">
            <div className="auto">
              <h1 className="logo MarginBottom5">
                <a>
                  <img src={KcoreFinalLogo} alt="kcore_logo" className="logo Block MAuto W10" />
                </a>
              </h1>
              <div className="MultiUploadTextCenter">
                <h1 className="main">
                  <font style={{ verticalAlign: 'inherit' }}>
                    <span>
                      <font style={{ verticalAlign: 'inherit' }}>
                        <FormattedMessage id="SignupWelcome" defaultMessage="Please set the password you want to use." />
                      </font>
                    </span>
                    {' '}
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

                  {/* Input Password */}
                  <dl>
                    <dt style={{ width: "250px", display: "flex" }}>
                      <FormattedMessage id="NewPassword" defaultMessage="New Password" />
                    </dt>
                    <dd>
                      <div className="inputText">
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
                    </dd>
                  </dl>

                  {/* Input ConfirmPassword */}
                  <dl>
                    <dt style={{ width: "250px", display: "flex" }}>
                      <FormattedMessage id="ConfirmPassword" defaultMessage="Confirm Password" />
                    </dt>
                    <dd>
                      <div className="inputText">
                        <FormattedMessage
                          id="PasswordConfirm2"
                          defaultMessage="Re-enter New Password."
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
                    </dd>
                  </dl>

                </form>
              </div>
              {/* Set Password Button  */}
              <div className="bottomBtns">
                <div className="flex">
                  <button id="setPasswordBtn" onClick={formSubmitAction} className="btn btnPrimary">
                    <span>
                      <FormattedMessage id="SetPassword" defaultMessage="Set Password" />
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

export default SetPassword;
