import React, { useState, useEffect } from 'react'
import { EyeIcon, EyeOffIcon } from "@heroicons/react/outline";
import {
    useParams
} from "react-router-dom";

import {
    changePassword
} from "../../actions/api_actions";
import { useSelector, useDispatch } from "react-redux";

function ResetPassword() {
    const [status, setstatus] = useState("")
    const [visibility, setvisibility] = useState(false);
    const dispatch = useDispatch();
    const { token } = useParams();
    console.log(token, "front end");
    let changePasswordfunction = () => {
        let new_password = document.getElementById('NewPassword').value
        let confirm_password = document.getElementById('ConfirmNewPassword').value
        if (new_password === "" || confirm_password == "") {
            setstatus('Please Enter Password');
        }
        else if (new_password !== confirm_password) {
            setstatus('Password and confirm password must match');
        }
        else {
            dispatch(changePassword("POST", { 'new_password': new_password, 'confirm_password': confirm_password, 'token': token }));
        }
    }

    return (
        <div>

            <div className='m-5'>

                <h1 className='text-center text-7xl font-sans'>Reset Password</h1>
                <div className="mt-10 flex flex-col items-center ">
                    <label className='mx-5  text-4xl' htmlFor="newPassword">New Password</label>
                    <div className="mb-3 pt-0 relative">
                        <input
                            type={visibility ? "input" : "password"}
                            id="NewPassword"
                            name="newpassword"
                            className="px-4 py-4 text-blueGray-600 relative bg-white rounded border border-gray-400 outline-none focus:outline-none focus:ring"
                        />
                        <span className="absolute cursor-pointer left-80 top-2" > {visibility ? <EyeIcon className="h-14 w-12 inline text-main-white" onClick={() => setvisibility(visibility => !visibility)}></EyeIcon> : <EyeOffIcon className="h-14 w-12 inline text-main-white" onClick={() => setvisibility(visibility => !visibility)}></EyeOffIcon>}</span>

                    </div>
                    <label className='mx-5  text-4xl' htmlFor="confirmnewpassword">Confirm Password</label>
                    <div className="mb-3 pt-0 relative">
                        <input
                            type={visibility ? "input" : "password"}
                            id="ConfirmNewPassword"
                            name="confirmnewpassword"
                            className="px-4 py-4 text-blueGray-600 relative bg-white rounded border border-gray-400 outline-none focus:outline-none focus:ring"
                        />
                        <span className="absolute cursor-pointer left-80 top-2" > {visibility ? <EyeIcon className="h-14 w-12 inline text-main-white" onClick={() => setvisibility(visibility => !visibility)}></EyeIcon> : <EyeOffIcon className="h-14 w-12 inline text-main-white" onClick={() => setvisibility(visibility => !visibility)}></EyeOffIcon>}</span>

                    </div>
                    {status && <p className=''>{status}</p>}
                    <div className='rounded-sm'>
                        <button type='submit' className='text-white font-bold py-6 px-6 rounded bg-NccBlue-700 mt-8' onClick={changePasswordfunction}>Reset Password</button>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default ResetPassword