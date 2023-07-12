import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { signin } from "../../actions/api_actions";
import config from "../../config";
import nameIcon from "../../styles/images/icon-text.svg";
import HeaderComponent from "../Common/HeaderComponent/HeaderComponent";

const SignupComponent = () => {
  const [userFormData, setUserFormData] = useState({
    emailId: "",
  });
  let history = useHistory();
  const [errorMessage, setErrorMessage] = useState([]);
  const title = { id: "Signup", defaultMessage: "Sing Up" }

  const breadCrumbs = {
    '/signup/': [
      { id: 'Signup', defaultMessage: 'Sign Up', to: '/signup/' }
    ],
  };

  const updateEmailId = (e) => {
    setUserFormData((previousState) => ({
      ...previousState,
      [e.target.name]: e.target.value,
    }));
  };

  const registerSuccess = (data) => {
    history.push('/login')
  }

  const registerFailure = () => {
    setErrorMessage([
      <p key="error" className="p-1 font-bold text-3xl text-red-500 italic">
        Invalid username/Password
      </p>,
      <h1 className="p-1 font-bold text-3xl text-red-500 italic" key="CountToEnterCredentials">
        {" "}
        If an error in consecutive password input (5 times) occurs, the account
        is locked.
      </h1>,
    ]);
  };



  const formSubmitAction = (e) => {
    e.preventDefault();
    const headers = {}
    const url = `${config.auth}new-registration/`;
    // let x = axios({ method: "POST", url: url, data: userFormData, headers:headers });
    let data = signin("POST", userFormData)
    data.then((result) => {
      if (result.status === 200) {
        registerSuccess(data);
      }
      else {
        registerFailure();
      }
    }).catch((error) => {
      registerFailure();
    });
  };



  return (
    <>
      <HeaderComponent
        title={title}
        breadCrumbs={breadCrumbs['/signup/']}
        type="single"
      />
      <article id="subContents" className="subContents">
        <div>
          <div className="contentsTitle">
            <div className="auto">
              <h3 className="colorSecondary">
                <span className="colorPrimary">Sign</span>
                up
              </h3>
            </div>
          </div>
          <div className="ptn">
            <div className="auto">
              <div className="pwSearch tac">
                <p className="h5">
                  Please use the service after Signing Up
                </p>
                <form className="formBox" id="frm" method="post" name="frm">
                  {errorMessage && (
                    <div className="ErrorText">
                      {errorMessage}
                    </div>
                  )}

                  <dl>
                    <dt>
                      <img src={nameIcon} alt="" />
                      Email Id
                    </dt>
                    <dd>
                      <div className="inputText">
                        <input type="text" className="w100" id="emailId" name="emailId" placeholder="Please enter your Email Id." autoComplete="off" value={userFormData.emailId}
                          onChange={updateEmailId} />
                      </div>
                    </dd>
                  </dl>
                </form>
              </div>
              <div className="bottomBtns">
                <div className="flex">
                  <button onClick={formSubmitAction} className="btn btnPrimary">
                    <span>Sign Up</span>
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
