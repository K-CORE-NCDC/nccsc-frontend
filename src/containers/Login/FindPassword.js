import React, { useState, useRef } from 'react'
import {
  findPassword,
} from "../../actions/api_actions";
import nameIcon from "../../styles/images/icon-text.svg"
import idIcon from "../../styles/images/icon-user.svg"
import { useHistory } from "react-router-dom";
import Swal from 'sweetalert2'

function FindPassword() {

  const UserId = useRef(null);
  const RegistrationPin = useRef(null);
  const [isError, setIsError] = useState(false)
  const [errorMessage, setErrorMessage] = useState([]);
  let history = useHistory();


  const findPasswordSuccess = () => {

    Swal.fire({
      title: 'Success',
      text: "Password Reset Link is sent to your Email",
      icon: 'success',
      confirmButtonColor: '#003177',
      confirmButtonText: 'Ok',
      allowOutsideClick: false
    }).then((result) => {
      if (result.value) {
        history.push('/login')
      }
    })

  }



  const findPasswordFailure = (status) => {
    setErrorMessage([
      <p key="error" className="ErrorText">
        {status}
      </p>
    ]);
    setIsError(true)
  }

  let findPasswordfunction = () => {
    let user_id = UserId.current.value
    let registration_pin = RegistrationPin.current.value

    setIsError(false)

    if (user_id === "") {
      setErrorMessage([
        <p key="error" className="ErrorText">
          User ID cant be Empty
        </p>
      ]);
      setIsError(true)
    }

    else if (registration_pin === "") {
      setErrorMessage([
        <p className="ErrorText">
          Registration Pin cant be Empty
        </p>
      ]);
      setIsError(true)
    }

    else {
      setIsError(false)
      let data = findPassword("POST", { 'username': user_id, 'registration_pin': registration_pin })
      data.then((result) => {
        if ('data' in result && 'status' in result.data && result.data.status === "Password Reset Link is sent to your Email") {
          findPasswordSuccess();
        }
        else if('data' in result && 'status' in result.data) {
          findPasswordFailure(result.data.status);
        }
      }).catch((error) => {
        findPasswordFailure('Something went wrong');
      });
    };

  }


  let cancelfunction = () => {
    setIsError(false)
    UserId.current.value = ""
    RegistrationPin.current.value = ""
  }

  return (
    <div>
        <div className="contentsTitle">
          <div className="auto">
            <h3 className="colorSecondary">
              <span className="colorPrimary">Find</span>
              password
            </h3>
          </div>
        </div>
        <div className="ptn">
          <div className="auto">
            <div className="pwSearch tac">
              <p className="h5">
                Reset your password through Registration Pin authentication.<br />
                Please enter the information below.
              </p>
              <form className="formBox" id="frm" method="post" name="frm">
                {isError && errorMessage && (
                  <div className="ErrorText">
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
                    Unique Pin
                  </dt>
                  <dd>
                    <div className="inputText">
                      <input ref={RegistrationPin} type="text" className="w100" id="userId" name="userId" placeholder="Please enter your Registration ID." autoComplete="off" />
                    </div>
                  </dd>
                </dl>

              </form>
            </div>
            <div className="bottomBtns">
              <div className="flex">
                <button onClick={cancelfunction} className="btn btnGray bdBtn">
                  Reset
                </button>
                <button onClick={findPasswordfunction} className="btn btnPrimary" >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
    </div>

  )
}

export default FindPassword