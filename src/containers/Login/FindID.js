import React, { useState, useRef } from 'react'
import {
  findID,
} from "../../actions/api_actions";
import nameIcon from "../../styles/images/icon-text.svg"
import { useHistory } from "react-router-dom";
import Swal from 'sweetalert2'
import { FormattedMessage } from "react-intl";
function FindID() {

  const EmailId = useRef(null);
  const [isError, setIsError] = useState(false)
  const [errorMessage, setErrorMessage] = useState([]);
  let history = useHistory();


  const findIdSuccess = () => {
    // id is FindIdSuccess
    Swal.fire({
      title: 'Success',
      text: "ID Sent to Your Email",
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

  const findIdFailure = (status) => {

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

  let findIdfunction = () => {
    let email_id = EmailId.current.value
    setIsError(false)

    if (email_id === "") {
      setErrorMessage([
        <p key="error" className="ErrorText">
          <FormattedMessage id='EmailNotEmpty' defaultMessage="Email Id cant be empty" />
        </p>
      ]);
      setIsError(true)
    }
    else {
      setIsError(false)
      let data = findID("POST", { 'email_id': email_id })
      data.then((result) => {
        if ('data' in result && 'status' in result.data && result.data.status === "ID Sent to Your Email") {
          findIdSuccess();
        }
        else if ('data' in result && 'status' in result.data && result.data.status === "Email Not Registered") {
          findIdFailure("EmailNotRegistered");
        }
        else if ('data' in result && 'status' in result.data) {
          findIdFailure(result.data.status);
        }
      }).catch((error) => {
        findIdFailure('SomethingWentWrong');
      });
    };

  }


  let cancelfunction = () => {
    setIsError(false)
    EmailId.current.value = ""
  }

  return (
    <div>
      <div className="contentsTitle">
        <div className="auto">
          <h3 className="colorSecondary">
            <span className="colorPrimary"><FormattedMessage id='HeadFind' defaultMessage="Find" />&nbsp;</span>
            <FormattedMessage id='HeadID' defaultMessage="ID" />
          </h3>
        </div>
      </div>

      <div className="ptn">
        <div className="auto">
          <div className="pwSearch tac">
            <p className="h5">
              <FormattedMessage id='FindYourID' defaultMessage="Find Your ID" />
              <br />
              <FormattedMessage id='EnterInfo' defaultMessage="Please enter the information below." />
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
                  <FormattedMessage id='EmailId' defaultMessage='Email Id' />
                </dt>
                <dd>
                  <div className="inputText">
                    <FormattedMessage id="PleaseEnterYourEmailId" defaultMessage="Please enter your Emain ID">
                      {placeholder =>
                        <input ref={EmailId} type="text" className="w100" id="Email" name="Email" placeholder={placeholder} autoComplete="off" />
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
              <button onClick={findIdfunction} className="btn btnPrimary" >
                <FormattedMessage id='Submit_volcano' defaultMessage='Submit' />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}

export default FindID