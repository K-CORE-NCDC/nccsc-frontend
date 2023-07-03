import React, {  useState } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { login } from "../../actions/api_actions";
import HeaderComponent from "../Common/HeaderComponent/HeaderComponent";
import NCCLogo from "../../styles/images/logo02.svg"
import loginIcon1 from "../../styles/images/loginForm-icon01.svg"
import loginIcon2 from "../../styles/images/loginForm-icon02.svg"
import Swal from 'sweetalert2'

const LoginComponent = () => {
  const [userFormData, setUserFormData] = useState({
    userId: "",
    password: "",
  });
  let history = useHistory();
  const [errorMessage, setErrorMessage] = useState([]);
  const [isError, setIsError] = useState(false)
  const title = { id: "Login", defaultMessage: "Login" }

  const updateUserNamePassword = (e) => {
    setUserFormData((previousState) => ({
      ...previousState,
      [e.target.name]: e.target.value,
    }));
  };

  const loginSuccess = () => {

    Swal.fire({
      title: 'Success',
      text: "Login Success",
      icon: 'success',
      confirmButtonColor: '#003177',
      confirmButtonText: 'Ok',
      allowOutsideClick: false
    }).then((result) => {
      if (result.value) {
        history.push('/visualise-singledata/home/')
      }
    })

  }

  const loginFailure = () => {
    setIsError(true)
    setErrorMessage([
      <p key="error" className="ErrorText">
        Invalid username/Password
      </p>,
      <h1 className="ErrorText" key="CountToEnterCredentials">
        {" "}
        If an error in consecutive password input (5 times) occurs, the account is locked.
      </h1>,
    ]);
  };


 

  const formSubmitAction = (e) => {
    setIsError(false)

    if (userFormData && userFormData.userId === '') {
      setIsError(true)
      setErrorMessage([
        <p key="error" className="ErrorText">
          User ID cant be Empty
        </p>,
        <h1 className="ErrorText" key="CountToEnterCredentials">
          {" "}
          If an error in consecutive password input (5 times) occurs, the account is locked.
        </h1>,
      ]);
    }
    else if (userFormData && userFormData.password === '') {
      setIsError(true)
      setErrorMessage([
        <p key="error" className="ErrorText">
          Password cant be Empty
        </p>,
        <h1 className="ErrorText" key="CountToEnterCredentials">
          {" "}
          If an error in consecutive password input (5 times) occurs, the account is locked.
        </h1>,
      ]);
    }
    else {
      setIsError(false)
      let data = login("POST", userFormData)
      data.then((result) => {
        console.log(result);
        if ('data' in result && 'status' in result.data && result.data.status === "Login Successfull") {
          loginSuccess();
        }
        else if('data' in result && 'status' in result.data) {
          loginFailure(result.data.status);
        }
      }).catch((error) => {
        loginFailure('Login Failed, check Credentials');
      });
    }
  };

  const breadCrumbs = {
    '/login/': [
        { id: 'Login', defaultMessage: 'Login', to: '/login/' }
    ],
};

  return (
    <div>
      <HeaderComponent
        title={title}
        breadCrumbs={breadCrumbs['/login/']}
        type="single"
      />
      <article id="subContents" className="subContents">
        <div className=" ptn">
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
                {isError && errorMessage && (
                  <div className="ErrorText">
                    {errorMessage}
                  </div>
                )}
                {/* Input Username */}
                <div className="inputText">
                  <input className={isError == true ? 'ErrorInput' : ""} type="text" value={userFormData.userId} onChange={updateUserNamePassword} id="userId" name="userId" placeholder="Please enter your ID." autoComplete="off" />
                </div>

                {/* Input Password */}
                <div className="inputText">
                  <input className={isError ? 'ErrorInput' : ""} type="password" id="password" name="password" placeholder="Please enter a password." value={userFormData.password} onChange={updateUserNamePassword} />
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
