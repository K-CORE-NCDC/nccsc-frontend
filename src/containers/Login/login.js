import React, { useState } from 'react';
import axios from 'axios'
import config from '../../config'
import { useHistory } from "react-router-dom";

const LoginComponent = () => {
    let history = useHistory();
    const [userFormData, setUserFormData] = useState({ username: "", password: "" })
    const [errorClass, setErrorClass] = useState("")
    const [errorMessage, setErrorMessage] = useState([])

    const updateUserNamePassword = (e) => {
        setUserFormData(previousState => ({ ...previousState, [e.target.name]: e.target.value }))
      }

    const loginFailure = () => {
        setErrorClass("border-red-500")
        setErrorMessage([<p key="error" className="text-red-500 text-xs italic">Invalid username/Password</p>])
        setUserFormData({ username: "", password: "" })
    }

    const loginSuccess = (data) => {
        localStorage.setItem('ncc_access_token', data.access);
        localStorage.setItem('ncc_refresh_token', data.refresh);
        history.push("/userdata")
    }


    const formSubmitAction = (e) => {
        console.log('formsubmit')
        e.preventDefault()
        const url = `${config.auth}api/token/`
        let x = axios({ method: 'POST', url: url, data: userFormData })
        x.then((response) => {
            const data = response.data
            const statusCode = response.status
            if(statusCode === 200){
                loginSuccess(data)
            }else{
                loginFailure()
            }
        }).catch((error) => {
            loginFailure()
        })

    }

    return (
        <div>
            <section className="mt-10 flex flex-col">
                <div className="flex flex-1 items-center justify-center">
                    <div className="rounded-lg sm:border-2 px-4 lg:px-24 py-16 lg:max-w-xl sm:max-w-md w-full text-center">
                        <form onSubmit={formSubmitAction} className="text-center">
                            <h1 className="font-bold tracking-wider text-3xl mb-8 w-full text-gray-600">
                                Sign in
                            </h1>
                            <div className="py-2 text-left">
                                <input value={userFormData.username} onChange={updateUserNamePassword} type="text" name="username" className={`bg-gray-200 border-2 border-gray-100 focus:outline-none bg-gray-100 block w-full py-2 px-4 rounded-lg focus:border-gray-700 ${errorClass} `} placeholder="username" />
                            </div>
                            <div className="py-2 text-left">
                                <input value={userFormData.password} onChange={updateUserNamePassword} name="password" type="password" className={`bg-gray-200 border-2 border-gray-100 focus:outline-none bg-gray-100 block w-full py-2 px-4 rounded-lg focus:border-gray-700 ${errorClass} `} placeholder="Password" />
                                {errorMessage}
                            </div>
                            <div className="py-2">
                                <button type="submit" className="border-2 border-gray-100 focus:outline-none bg-purple-600 text-white font-bold tracking-wider block w-full p-2 rounded-lg focus:border-gray-700 hover:bg-purple-700">
                                    Sign In
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default LoginComponent;