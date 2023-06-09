import React, { useState, useEffect } from 'react'
import { EyeIcon, EyeOffIcon } from "@heroicons/react/outline";
import {
  useParams
} from "react-router-dom";

import {
  changePassword,
  clearIDPasswordResetPASSWORD
} from "../../actions/api_actions";
import swal from 'sweetalert';
import { useSelector, useDispatch } from "react-redux";

function SetPassword() {
  const [status, setstatus] = useState("")
  const [visibility, setvisibility] = useState(false);
  const [errorClass, setErrorClass] = useState("");
  const dispatch = useDispatch();
  const { token } = useParams();
  const change_password_status = useSelector((data) => data.homeReducer.changePasswordStatus);
  let changePasswordfunction = () => {
    
    let new_password = document.getElementById('NewPassword').value
    let confirm_password = document.getElementById('ConfirmNewPassword').value
    if (new_password === "" || confirm_password === "") {
      setErrorClass("border-red-500");
      setstatus('Please Enter Password');
    }
    else if (new_password !== confirm_password) {
      setErrorClass("border-red-500");
      setstatus('Password and confirm password must match');
    }
    else {
      dispatch(changePassword("POST", { 'new_password': new_password, 'confirm_password': confirm_password, 'token': token }));
    }

  }

  useEffect(() => {
    change_password_status && setstatus(change_password_status.status)
    if (status === "Password Updated Successfully") {
      swal("Password Updated Successfully.", {
        closeOnClickOutside: false
      })
        .then((value) => {
          setTimeout(() => {
            dispatch(clearIDPasswordResetPASSWORD());
            window.location.href = '/login/'
          }, 2000)
        });
    }
  }, [change_password_status, status])


  return (
    <div>
      <section className="mt-10 flex flex-col items-center justify-center">
        <div>
          <span className="text-7xl font-bold text-gray-800">Set Password</span>
        </div>
        <div className="my-32">

          <div className="grid grid-cols-3 border-b-2 border-gray-600 pt-12 pb-12">
            <div className="pt-6 pl-48 pr-8 col-span-1">
              <h1 className="font-bold">Password</h1>
            </div>
            <div>
              <div className="mb-4 pr-45 col-span-2 relative">
                <div>
                  <input
                    type={visibility ? "input" : "password"}
                    id="NewPassword"
                    name="newpassword"
                    className={`shadow appearance-none border rounded-lg w-full py-8 px-5 text-gray-700 leading-tight focus:border-blue-500  w-28 ${errorClass}`}
                    placeholder="Please Enter a password "

                  >
                  </input>
                  <span className="absolute cursor-pointer left-96 top-4" > {visibility ? <EyeIcon className="h-14 w-12 inline text-main-white" onClick={() => setvisibility(visibility => !visibility)}></EyeIcon> : <EyeOffIcon className="h-14 w-12 inline text-main-white" onClick={() => setvisibility(visibility => !visibility)}></EyeOffIcon>}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-3 border-b-2 border-gray-600 pt-12 pb-12">
            <div className="pt-6 pl-48 pr-8 col-span-1">
              <h1 className="font-bold">Confirm-Password</h1>
            </div>
            <div>
              <div className="mb-4 pr-45 col-span-2 relative">
                <div>
                  <input
                    type={visibility ? "input" : "password"}
                    id="ConfirmNewPassword"
                    name="confirmnewpassword"
                    className={`shadow appearance-none border rounded-lg w-full py-8 px-5 text-gray-700 leading-tight focus:border-blue-500  w-28 ${errorClass}`}
                    placeholder="Please Enter a password "

                  >
                  </input>
                  <span className="absolute cursor-pointer left-96 top-4" > {visibility ? <EyeIcon className="h-14 w-12 inline text-main-white" onClick={() => setvisibility(visibility => !visibility)}></EyeIcon> : <EyeOffIcon className="h-14 w-12 inline text-main-white" onClick={() => setvisibility(visibility => !visibility)}></EyeOffIcon>}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-3 pt-12">
            <div className="w-full col-span-3">
              {status && (
                <div className="font-bold text-3xl text-red-500">
                  {status}
                </div>
              )}
              <button
                onClick={changePasswordfunction}
                className="bg-blue-500 hover:bg-blue-700 text-white h-28 font-bold py-2 px-4 border border-blue-700 w-full rounded"

              >
                <span>Set Password</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default SetPassword


