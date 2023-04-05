import React, { useState } from "react";
import axios from "axios";
import config from "../../config";
import { UserIcon, EyeIcon, EyeOffIcon } from "@heroicons/react/outline";
import { Link } from "react-router-dom";


const LoginComponent = () => {
  const [userFormData, setUserFormData] = useState({
    username: "",
    password: "",
  });
  const [visibility, setvisibility] = useState(false);

  const [errorClass, setErrorClass] = useState("");
  const [errorMessage, setErrorMessage] = useState([]);

  const updateUserNamePassword = (e) => {
    setUserFormData((previousState) => ({
      ...previousState,
      [e.target.name]: e.target.value,
    }));
  };
  const loginFailure = () => {
    setErrorClass("border-red-500");
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
    // setUserFormData({ username: "", password: "" });
  };

  const loginSuccess = (data) => {
    localStorage.setItem("ncc_access_token", data.access);
    localStorage.setItem("ncc_refresh_token", data.refresh);
    
    window.location.href = window.location.origin+config['basename']+"userdata/";
  };

  const formSubmitAction = (e) => {
    // e.preventDefault();
    const url = `${config.auth}api/token/`;
    let x = axios({ method: "POST", url: url, data: userFormData });
    x.then((response) => {
      const data = response.data;
      const statusCode = response.status;
      console.log('status code',statusCode);
      if (statusCode === 200) {
        loginSuccess(data);
      } else {
        loginFailure();
      }
    }).catch((error) => {
      loginFailure();
    });
  };

  return (
    <div>
      <section className="mt-10 flex flex-col items-center justify-center">
        <div>
          <span className="text-7xl font-bold text-gray-800">Login</span>
        </div>
        <div className="my-14">
          <h1 className="font-bold text-3xl text-gray-800">
            Please use the service after logging in.
          </h1>
        </div>
        {errorMessage && (
                <div className="font-bold text-3xl text-red-500">
                  {errorMessage}
                </div>
              )}
        <div className="my-32">
          <div className="grid grid-cols-3 border-b-2 border-gray-600 pt-12 pb-12">
            <div className="pt-6 pl-48 col-span-1">
              <h1 className="font-bold text-base sm:text-sm md:text-md lg:text-base xl:text-2xl  2xl:text-md">User ID</h1>
            </div>
            <div>
              <div className="mb-4 pr-45 col-span-2">
                <input
                  value={userFormData.username}
                  onChange={updateUserNamePassword}
                  name="username"
                  className={`shadow appearance-none border rounded-lg w-full py-8 px-5 text-gray-700 leading-tight focus:border-blue-500  w-28 ${errorClass}`}
                  id="username"
                  type="text"
                  placeholder="Please Enter your id"
                />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-3 border-b-2 border-gray-600 pt-12 pb-12">
            <div className="pt-6 pl-48 col-span-1 mr-7">
              <h1 className="font-bold text-base sm:text-sm md:text-md lg:text-base xl:text-2xl  2xl:text-md">Password</h1>
            </div>
            <div>
              <div className="mb-4 pr-45 col-span-2 relative">
                <div>
                  <input
                    value={userFormData.password}
                    onChange={updateUserNamePassword}
                    name="password"
                    className={`shadow appearance-none border rounded-lg w-full py-8 px-5 text-gray-700 leading-tight focus:border-blue-500  w-28 ${errorClass}`}
                    id="password"
                    type={visibility ? "input" : "password"}
                    placeholder="Please Enter a password "

                  >
                  </input>
                  <span  className="absolute cursor-pointer left-72 top-4" > {visibility ? <EyeIcon className="h-14 w-12 inline text-main-white" onClick={() => setvisibility(visibility => !visibility)}></EyeIcon> : <EyeOffIcon className="h-14 w-12 inline text-main-white" onClick={() => setvisibility(visibility => !visibility)}></EyeOffIcon>}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-3 pt-12">
            <div className="w-full col-span-3">
              <button
                onClick={formSubmitAction}
                className="text-base sm:text-sm md:text-md lg:text-base xl:text-2xl  2xl:text-md bg-blue-500 hover:bg-blue-700 text-white h-28 font-bold py-2 px-4 border border-blue-700 w-full rounded"

              >
                <UserIcon className="h-14 w-12 inline text-main-white" />{" "}

                <span>Login</span>
              </button>
            </div>
          </div>
          <div className="grid grid-cols-3 pt-12">
            <div className="w-full col-span-3">
              <div className="d-flex flex-row float-right">
                <Link to="/findid/" className=" pr-5">
                  <p className="border-r-2 border-gray-600 pr-5">
                    Find ID
                  </p>
                </Link>
                <Link to="/findpassword/" className=" pr-5">
                  <p className=" pr-5">
                    Find Password
                  </p>
                </Link>


              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LoginComponent;
