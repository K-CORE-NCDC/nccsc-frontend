import React, { useState, useEffect } from "react";
import axios from "axios";
import config from "../../config";
import { useDispatch } from "react-redux";
import { updateDownloadVisualizationPurpose } from "../../actions/api_actions";
import { useParams } from "react-router-dom";

const ConfirmDownload = ({ screenCaptureFunction, hideModal }) => {
  const dispatch = useDispatch();
  const [userFormData, setUserFormData] = useState({
    username: "",
    password: "",
  });
  const [downloadOrganization, setDownloadOrganization] = useState("");
  const [downloadPurpose, setDownloadPurpose] = useState("");
  const [errorClass, setErrorClass] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showLoginPage, setShowLoginPage] = useState(false);
  const purposeOptions = ["business", "research", "diagonosis"];
  let { tab, project_id } = useParams();
  const [tab_, setTab] = useState(tab);

  const accessToken = localStorage.getItem("ncc_access_token");
  useEffect(() => {
    if ((accessToken === null) | (accessToken === undefined)) {
      setShowLoginPage(true);
    } else {
      setShowLoginPage(false);
    }
  }, [accessToken]);

  const updateUserNamePassword = (e) => {
    setErrorClass("");
    setUserFormData((previousState) => ({
      ...previousState,
      [e.target.name]: e.target.value,
    }));
  };

  const loginFailure = () => {
    setErrorClass("border-red-500");
    setErrorMessage("Invalid username/Password");
    setUserFormData({ username: "", password: "" });
  };

  const loginSuccess = (data) => {
    localStorage.setItem("ncc_access_token", data.access);
    localStorage.setItem("ncc_refresh_token", data.refresh);
    setShowLoginPage(false);
  };

  const formSubmitAction = (e) => {
    e.preventDefault();
    const url = `${config.auth}api/token/`;
    let x = axios({ method: "POST", url: url, data: userFormData });
    x.then((response) => {
      const data = response.data;
      const statusCode = response.status;
      if (statusCode === 200) {
        loginSuccess(data);
      } else {
        loginFailure();
      }
    }).catch((error) => {
      loginFailure();
    });
  };

  const downloadScreenshot = () => {
    if ((downloadOrganization === "") | (downloadPurpose === "")) {
      setErrorClass("border-red-500");
      setErrorMessage("Fields can not be empty");
    } else {
      dispatch(
        updateDownloadVisualizationPurpose({
          organization: downloadOrganization,
          purpose: downloadPurpose,
          chart_name: tab,
          project_id: project_id ? project_id : null,
          category: project_id ? 'User DataVisualization' : 'Visualization'
        })
      );
      hideModal(true);
      screenCaptureFunction(true);
    }
  };

  useEffect(() => {
    setErrorClass("");
    setErrorMessage("");
  }, [downloadOrganization, downloadPurpose]);

  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative my-6 mx-auto w-3/12">
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/*header*/}
            <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
              <h6 className="font-semibold">File Download</h6>
            </div>
            {showLoginPage && (
              <div className="m-1 p-1 w-full">
                <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                  <div className="mb-4">
                    <label
                      className="block text-gray-700 text-lg font-bold mb-2"
                      htmlFor="username"
                    >
                      Username
                    </label>
                    <input
                      value={userFormData.username}
                      onChange={updateUserNamePassword}
                      className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errorClass}`}
                      name="username"
                      id="username"
                      type="text"
                      placeholder="Username"
                    />
                  </div>
                  <div className="mb-6">
                    <label
                      className="block text-gray-700 text-lg font-bold mb-2"
                      htmlFor="password"
                    >
                      Password
                    </label>
                    <input
                      value={userFormData.password}
                      onChange={updateUserNamePassword}
                      className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline ${errorClass}`}
                      name="password"
                      id="password"
                      type="password"
                      placeholder="******************"
                    />
                    {errorMessage && (
                      <p className="text-red-500 text-lg italic">
                        {errorMessage}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center justify-between">
                    <button
                      onClick={formSubmitAction}
                      className="bg-main-blue hover:bg-main-blue text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                      type="button"
                    >
                      Sign In
                    </button>
                  </div>
                </form>
              </div>
            )}
            {!showLoginPage && (
              <form className="bg-white rounded px-8 pt-6 pb-8 mb-4">
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-lg font-bold mb-2"
                    htmlFor="username"
                  >
                    Organization
                  </label>
                  <input
                    value={downloadOrganization}
                    onChange={(e) => setDownloadOrganization(e.target.value)}
                    className={`btn_input_height lg:w-full xs:w-56 p-3 border bg-white focus:outline-none focus:ring xs:h-14 lg:h-16 xs:text-sm lg:text-xl ${errorClass}`}
                    type="text"
                  />
                </div>
                <div className="mb-6">
                  <label
                    className="block text-gray-700 text-lg font-bold mb-2"
                    htmlFor="download-for"
                  >
                    Purpose of Download
                  </label>
                  <select
                    id="download-for"
                    onChange={(e) => setDownloadPurpose(e.target.value)}
                    value={downloadPurpose}
                    className={`btn_input_height lg:w-full xs:w-56 p-3 border bg-white focus:outline-none focus:ring xs:h-14 lg:h-16 xs:text-sm lg:text-xl ${errorClass}`}
                  >
                    <option value=""></option>
                    {purposeOptions.map((e) => (
                      <option key={e} value={e}>
                        {e}
                      </option>
                    ))}
                  </select>
                  {errorMessage && (
                    <p className="text-red-500 text-lg italic">
                      {errorMessage}
                    </p>
                  )}
                </div>
                <p className="text-center mb-7 text-base"
                >
                  If processed information is big, it will take few minutes to
                  download image.
                </p>
                <div
                  onClick={downloadScreenshot}
                  className="flex items-center justify-between"
                >
                  <button
                    className="bg-main-blue hover:bg-main-blue text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mx-auto"
                    type="button"
                  >
                    Download
                  </button>
                </div>
              </form>
            )}
            <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
              <button
                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={hideModal}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
};

export default ConfirmDownload;
