import React, { useState, useEffect, useRef } from 'react'
import {
  findPassword,
  clearIDPasswordResetPASSWORD
} from "../../actions/api_actions";
import swal from 'sweetalert';
import { useSelector, useDispatch } from "react-redux";
import HeaderComponent from "../Common/HeaderComponent/HeaderComponent";
import nameIcon from "../../styles/images/icon-text.svg"
import idIcon from "../../styles/images/icon-user.svg"
function FindPassword() {

  const UserId = useRef(null);
  const RegistrationPin = useRef(null);
  const [isError, setIsError] = useState(false)
  const [status, setstatus] = useState("")
  const [errorMessage, setErrorMessage] = useState([]);
  const dispatch = useDispatch();

  const find_password = useSelector((data) => data.homeReducer.findPassword);

  let findPasswordfunction = () => {

    let user_id = UserId.current.value
    let registration_pin = RegistrationPin.current.value

    setIsError(false)

    if (user_id === "") {
      setstatus('Please Enter Your User ID');
      setErrorMessage([
        <p key="error" className="LoginErrorText">
          User ID cant be Empty
        </p>
      ]);
      setIsError(true)
    }

    else if (registration_pin === "") {
      setstatus('Please Enter Your User ID');
      setErrorMessage([
        <p className="LoginErrorText">
          Registration Pin cant be Empty
        </p>
      ]);
      setIsError(true)
    }

    else {
      dispatch(findPassword("POST", { 'username': user_id, 'registration_pin': registration_pin }));
      setIsError(false)
    }
  }

  let cancelfunction = () => {
    setIsError(false)
  }

  useEffect(() => {
    find_password && setstatus(find_password.status)
    if (status === "Password Reset Link is sent to your Email") {
      swal("Password Reset Link is sent to your Email", {
        closeOnClickOutside: false
      })
        .then((value) => {
          setTimeout(() => {
            window.location.href = '/login/'
          }, 2000)
        });
    }
    else {
      setErrorMessage([
        <p key="error" className="LoginErrorText">
          Invalid UserName or Registration Pin
        </p>
      ]);
    }
  }, [find_password, status])

  useEffect(() => {
    return () => {
      dispatch(clearIDPasswordResetPASSWORD());
    };
  }, []);

  return (
    <div>
      <HeaderComponent
        title="회원가입"
        breadCrumbs={{
          key1: 'value1'
        }}
        type="multi"
      />
      <article id="subContents" className="subContents">
        <div className="contentsTitle">
          <div className="auto">
            <h3 className="colorSecondary">
              <span className="colorPrimary">find</span>
              password
            </h3>
          </div>
        </div>
        <div className="section ptn">
          <div className="auto">
            <div className="pwSearch tac">
              <p className="h5">
                Reset your password through Registration Pin authentication.<br />
                Please enter the information below.
              </p>
              <form className="formBox" id="frm" method="post" name="frm">
                {isError && errorMessage && (
                  <div className="LoginErrorText">
                    {errorMessage}
                  </div>
                )}
                <dl>
                  <dt>
                    <img src={nameIcon} alt="" />
                    User Id
                  </dt>
                  <dd>
                    <div className="inputText">
                      <input ref={UserId} type="text" className="w100" id="userName" name="userName" placeholder="Please enter your name." autoComplete="off" />
                    </div>
                  </dd>
                </dl>
                <dl>
                  <dt>
                    <img src={idIcon} alt="" />
                    Register Id
                  </dt>
                  <dd>
                    <div className="inputText">
                      <input ref={RegistrationPin} type="text" className="w100" id="userId" name="userId" placeholder="Please enter your ID." autoComplete="off" />
                    </div>
                  </dd>
                </dl>
              </form>
            </div>
            <div className="bottomBtns">
              <div className="flex">
                <button onClick={cancelfunction} className="btn btnGray bdBtn">
                  cancellation
                </button>
                <button onClick={findPasswordfunction} className="btn btnPrimary" >
                  submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </article>
    </div>

  )
}

export default FindPassword