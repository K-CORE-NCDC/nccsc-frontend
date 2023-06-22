import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getCookie } from "../getCookie";
import { useHistory } from "react-router-dom";
import { login, SetCookie } from "../../actions/api_actions";
import HeaderComponent from "../Common/HeaderComponent/HeaderComponent";
import NCCLogo from "../../styles/images/logo02.svg"
import loginIcon1 from "../../styles/images/loginForm-icon01.svg"
import loginIcon2 from "../../styles/images/loginForm-icon02.svg"

const LoginComponent = () => {
  const [userFormData, setUserFormData] = useState({
    userId: "",
    password: "",
  });
  let history = useHistory();
  const dispatch = useDispatch();
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState([]);

  const updateUserNamePassword = (e) => {
    setUserFormData((previousState) => ({
      ...previousState,
      [e.target.name]: e.target.value,
    }));
  };

  const loginFailure = () => {
    setHasError(true);
    setErrorMessage([
      <p key="error" className="LoginErrorText">
        Invalid username/Password
      </p>,
      <h1 className="LoginErrorText" key="CountToEnterCredentials">
        {" "}
        If an error in consecutive password input (5 times) occurs, the account is locked.
      </h1>,
    ]);
  };


  useEffect(() => {

    setHasError(false);
    if (getCookie('is_login')) {
      history.push('/userdata')
    }
    else if (getCookie('is_login') === null) {
    }
    else {
      loginFailure();
    }
  }, [getCookie('is_login')])

  const formSubmitAction = (e) => {
    if (userFormData && userFormData.userId === '') {
      setHasError(true);
      setErrorMessage([
        <p key="error" className="LoginErrorText">
          User ID cant be Empty
        </p>,
        <h1 className="LoginErrorText" key="CountToEnterCredentials">
          {" "}
          If an error in consecutive password input (5 times) occurs, the account is locked.
        </h1>,
      ]);
    }
    else if (userFormData && userFormData.password === '') {
      setHasError(true);
      setErrorMessage([
        <p key="error" className="LoginErrorText">
          Password cant be Empty
        </p>,
        <h1 className="LoginErrorText" key="CountToEnterCredentials">
          {" "}
          If an error in consecutive password input (5 times) occurs, the account is locked.
        </h1>,
      ]);
    }
    else {
      dispatch(login("POST", userFormData));
      setHasError(false);
    }
  };

  return (
    <div>
      <HeaderComponent
        title="회원가입"
        breadCrumbs={{
          key1: 'value1',
          key2: 'value2',
          key3: 'value3'
        }}
        type="single"
      />
      <article id="subContents" className="subContents">
        <div className="section ptn">
          <div className="auto">
            <div className="loginWrap">
              <img src={NCCLogo} alt="" />
              <p className="main">
                <span className="colorSecondary">
                  <font style={{ verticalAlign: 'inherit' }}></font>
                </span>
                <font style={{ verticalAlign: 'inherit' }}>
                  <span className="colorPrimary">
                    <font style={{ verticalAlign: 'inherit' }}>Welcome</font>
                  </span>
                  <font style={{ verticalAlign: 'inherit' }}> to </font>
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
                    Welcome to the National Cancer Data Center website.{' '}
                  </font>
                </font>
                <br />
                <font style={{ verticalAlign: 'inherit' }}>
                  <font style={{ verticalAlign: 'inherit' }}>
                    Please enter the information below to log in.
                  </font>
                </font>
              </p>


              <form className="loginForm" id="frm" method="post">

                {/*  error messages */}
                {errorMessage && (
                  <div className="LoginErrorText">
                    {errorMessage}
                  </div>
                )}
                {/* Input Username */}
                <div className="inputText">
                  <input className={hasError == true ? 'LoginErrorInput' : ""} type="text" value={userFormData.userId} onChange={updateUserNamePassword} id="userId" name="userId" placeholder="Please enter your ID." autoComplete="off" />
                </div>

                {/* Input Password */}
                <div className="inputText">
                  <input className={hasError ? 'LoginErrorInput' : ""} type="password" id="password" name="password" placeholder="Please enter a password." value={userFormData.password} onChange={updateUserNamePassword} />
                </div>


                {/* Remember Id */}
                <div className="idSave">
                  <div className="switcher">
                    <input type="checkbox" id="id_save" name="saveIdYn" value="1" />
                    <label htmlFor="id_save">
                      <span></span>
                    </label>
                    <font style={{ verticalAlign: 'inherit' }}>
                      <font style={{ verticalAlign: 'inherit' }}>Remember ID</font>
                    </font>
                  </div>
                </div>

                {/* Login Button  */}
                <button type="button" className="btn btnPrimary" id="loginBtn" onClick={formSubmitAction}>
                  <font style={{ verticalAlign: 'inherit' }}>
                    <font style={{ verticalAlign: 'inherit' }}>Log In</font>
                  </font>
                </button>

                {/* Find ID Button */}
                <div className="idPwSearch">
                  <Link to="/findid/" >
                    <img src={loginIcon1} alt="" />
                    <font style={{ verticalAlign: 'inherit' }}>
                      <font style={{ verticalAlign: 'inherit' }}>Find ID</font>
                    </font>
                  </Link>

                  {/* Find Password Button */}
                  <Link to="/findpassword/">
                    <img src={loginIcon2} alt="" />
                    <font style={{ verticalAlign: 'inherit' }}>
                      <font style={{ verticalAlign: 'inherit' }}>Find Password</font>
                    </font>
                  </Link>
                </div>

              </form>
            </div>
          </div>
        </div>
      </article>
    </div>

  );
};

export default LoginComponent;
