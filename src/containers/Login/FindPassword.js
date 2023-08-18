import React, { useState, useRef } from 'react'
import {
  findPassword,
} from "../../actions/api_actions";
import nameIcon from "../../styles/images/icon-text.svg"
import idIcon from "../../styles/images/icon-user.svg"
import { useHistory } from "react-router-dom";
import Swal from 'sweetalert2'
import { FormattedMessage } from "react-intl";
function FindPassword() {

  const UserId = useRef(null);
  const RegistrationPin = useRef(null);
  const [isError, setIsError] = useState(false)
  const [errorMessage, setErrorMessage] = useState([]);
  let history = useHistory();


  const findPasswordSuccess = () => {
    // id is PasswordResetLink 
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
    if (status === 'EmailNotRegistered') {
      setErrorMessage([
        <p key="error" className="p-1 font-bold text-3xl text-red-500 italic">
          <FormattedMessage id={status} defaultMessage="Email is Not Registered" />
        </p>,
      ]);
    }
    else if (status === 'SomethingWentWrong') {
      setErrorMessage([
        <p key="error" className="p-1 font-bold text-3xl text-red-500 italic">
          <FormattedMessage id={status} defaultMessage="Something went wrong, Please try again or Contact Us" />
        </p>,
      ]);
    }
    else {
      setErrorMessage([
        <p key="error" className="ErrorText">
          {status}
        </p>
      ]);
    }
    setIsError(true)
  }

  let findPasswordfunction = () => {
    let user_id = UserId.current.value
    let registration_pin = RegistrationPin.current.value

    setIsError(false)

    if (user_id === "") {
      setErrorMessage([
        <p key="error" className="ErrorText">
          <FormattedMessage id='UserIdNotEmpty' defaultMessage="User ID cant be Empty" />
        </p>
      ]);
      setIsError(true)
    }

    else if (registration_pin === "") {
      setErrorMessage([
        <p className="ErrorText">
          <FormattedMessage id='UniquePinNotEmpty' defaultMessage="Registration Pin cant be Empty" />
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
        else if ('data' in result && 'status' in result.data && result.data.status === "Email Not Registered") {
          findPasswordFailure("EmailNotRegistered");
        }
        else if ('data' in result && 'status' in result.data) {
          findPasswordFailure(result.data.status);
        }
      }).catch((error) => {
        findPasswordFailure('SomethingWentWrong');
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
            <span className="colorPrimary"><FormattedMessage id='HeadPassword' defaultMessage="Find" />&nbsp;</span> 
            <FormattedMessage id='HeadID' defaultMessage="Password" />
          </h3>
        </div>
      </div>
      <div className="ptn">
        <div className="auto">
          <div className="pwSearch tac">
            <p className="h5">

              <FormattedMessage id='FindPasswordmsg1' defaultMessage='Reset your password through Registration Pin authentication.' />
              <br />
              <FormattedMessage id='FindPasswordmsg2' defaultMessage='Please enter the information below.' />
            </p>
            <form className="formBox" id="frm" method="post" name="frm">
              {isError && errorMessage && (
                <div className="ErrorText">
                  {errorMessage}
                </div>
              )}

              <dl>
                <dt style={{ width: "180px" }}>
                  <img src={nameIcon} alt="" />
                  <FormattedMessage id='UserId' defaultMessage='User Id' />
                </dt>
                <dd>
                  <div className="inputText">
                    <FormattedMessage id="PleaseEnterYourUserId" defaultMessage="Please enter your User Id">
                      {placeholder =>
                        <input ref={UserId} type="text" className="w100" id="userName" name="userName" placeholder={placeholder} autoComplete="off" />
                      }
                    </FormattedMessage>

                  </div>
                </dd>
              </dl>
              <dl>
                <dt style={{ width: "180px" }}>
                  <img src={idIcon} alt="" />
                  <FormattedMessage id='RegistrationPin' defaultMessage='Registration Pin' />
                </dt>
                <dd>
                  <div className="inputText">
                    <FormattedMessage id="PleaseEnterYourRegistrationPin" defaultMessage="Please enter your Registration Pin">
                      {placeholder =>
                        <input ref={RegistrationPin} type="text" className="w100" id="userId" name="userId" placeholder={placeholder} autoComplete="off" />
                      }
                    </FormattedMessage>

                  </div>
                </dd>
              </dl>

            </form>
          </div>
          <div className="bottomBtns">
            <div className="flex">
              <button onClick={cancelfunction} className="btn btnGray bdBtn">
                <FormattedMessage id='Reset_volcano' defaultMessage='Reset' />
              </button>
              <button onClick={findPasswordfunction} className="btn btnPrimary" >
                <FormattedMessage id='Submit_volcano' defaultMessage='Submit' />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}

export default FindPassword