import React, { useState, useRef } from 'react'
import {
  findID,
} from "../../actions/api_actions";
import nameIcon from "../../styles/images/icon-text.svg"
import { useHistory } from "react-router-dom";
import Swal from 'sweetalert2'
function FindID() {

  const EmailId = useRef(null);
  const [isError, setIsError] = useState(false)
  const [errorMessage, setErrorMessage] = useState([]);
  let history = useHistory();


  const findIdSuccess = () => {

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
    setErrorMessage([
      <p key="error" className="ErrorText">
        {status}
      </p>
    ]);
    setIsError(true)
  }

  let findIdfunction = () => {
    let email_id = EmailId.current.value
    setIsError(false)

    if (email_id === "") {
      setErrorMessage([
        <p key="error" className="ErrorText">
          Email ID cant be Empty
        </p>
      ]);
      setIsError(true)
    }
    else {
      setIsError(false)
      let data = findID("POST", { 'email_id': email_id })
      data.then((result) => {
        console.log(result);
        if ('data' in result && 'status' in result.data && result.data.status === "ID Sent to Your Email") {
          findIdSuccess();
        }
        else if('data' in result && 'status' in result.data) {
          findIdFailure(result.data.status);
        }
      }).catch((error) => {
        findIdFailure('Something went wrong');
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
              <span className="colorPrimary">Find</span>
              ID
            </h3>
          </div>
        </div>
        
        <div className="ptn">
          <div className="auto">
            <div className="pwSearch tac">
              <p className="h5">
                Find your ID.<br />
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
                    Email Id
                  </dt>
                  <dd>
                    <div className="inputText">
                      <input ref={EmailId} type="text" className="w100" id="Email" name="Email" placeholder="Please enter your Email Id." autoComplete="off" />
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
                <button onClick={findIdfunction} className="btn btnPrimary" >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
    </div>

  )
}

export default FindID