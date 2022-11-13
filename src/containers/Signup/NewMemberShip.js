import React, { useState, useEffect } from "react";
import { FormattedMessage } from "react-intl";
import "../../styles/clustergram.css";
import {
  userRegister,
  checkUserName,
  getPassEncodeId,
} from "../../actions/api_actions";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { logDOM } from "@testing-library/react";

const AlphaNumRegex = new RegExp("^[a-zA-Z0-9]*$");
const NumRegex = new RegExp("^[0-9]*$");
const AlphaNumRegexwithSpecialChars = new RegExp("^[ A-Za-z0-9_@./#&+-]*$");

const MemberShip = ({ changestep }) => {
  const {
    register,
    reset,
    handleSubmit,
    formState,
    formState: { isSubmitSuccessful, errors },
  } = useForm({ mode: "all" });
console.log("errors",errors);
if(errors.id){

  console.log("error ",errors.id.koreanmessage);
}
  const register_user = (data) => {
    // console.log(domain_value.domain_email);
    console.log(data);
    reset();
  };

  let domain_state = {
    domain_email: "",
  };
  let initial_state = {
    id: "",
    password: "",
    verify_password: "",
    name: "",
    institute: "",
    phone_number: "",
    email: "",
    domain_email: "",
    verification: "",
    isVerified: false,
  };
  let error_initial_state = {
    id: "",
    koreanid: "",
    password: "",
    koreanpassword: "",
    verify_password: "",
    koreanverify_password: "",
    name: "",
    koreanname: "",
    institute: "",
    koreaninstitute: "",
    phone_number: "",
    koreanphone_number: "",
    email: "",
    koreanemail: "",
    domain_email: "",
    koreandomain_email: "",
    verification: "",
    koreanverification: "",
    // isVerified: "",
    // koreanisVerified: "",
  };

  const [form, setForm] = useState(initial_state);
  const [verificationState, setverificationState] = useState("");
  const [ClickEmailverifyButton, setClickEmailverifyButton] = useState(false);
  const [ClickMobileverifyButton, setClickMobileverifyButton] = useState(false);
  const [message, setMessage] = useState("");
  const [inputmail, setInputMail] = useState(false);
  const [instituteDropdown, setInstituteDropdown] = useState([]);
  const [encData, setEncData] = useState("");
  const [domain_value, setdomain_value] = useState(domain_state);
  const [domain_email_error, setdomain_error_value] = useState("");

  const dispatch = useDispatch();

  const regitserResponse = useSelector(
    (data) => data.dataVisualizationReducer.registerData
  );
  const checkUserId = useSelector(
    (data) => data.dataVisualizationReducer.checkUserName
  );
  const passKey = useSelector((data) => data.dataVisualizationReducer.passKey);

  const formSet = (e) => {
    const { name, value } = e.target;
    if (e.target.value === "input") {
      setdomain_value((oldState) => ({ ...oldState, [e.target.name]: "" }));
      setInputMail(true);
    } else {
      setdomain_value((oldState) => ({
        ...oldState,
        [e.target.name]: e.target.value,
      }));
    }
  };

  const chekcId = () => {
    if (form["id"]) {
      let data = {
        value: form["id"],
        type: "username",
      };
      dispatch(checkUserName("GET", data));
    }
  };

  const verifyMobile = () => {
    setClickMobileverifyButton(true);
    setClickEmailverifyButton(false);
    dispatch(getPassEncodeId("POST", {}));
  };
  const verifyEmail = () => {
    setClickEmailverifyButton(true);
    setClickMobileverifyButton(false);
  };

  const gotopreviousStep = () => {
    changestep(0);
  };

  useEffect(() => {
    let instituteOptions = [
      "GOVERNMENT",
      "UNIVERSITY",
      "RESEARCH CENTER",
      "HOSPITAL",
      "INDUSTRY",
      "OTHERS",
    ];
    let html = [];
    for (let i = 0; i < instituteOptions.length; i++) {
      html.push(
        <option key={instituteOptions[i]} value={instituteOptions[i]}>
          {instituteOptions[i]}
        </option>
      );
    }
    setInstituteDropdown(html);
  }, []);

  useEffect(() => {
    if (regitserResponse) {
      setMessage(regitserResponse["message"]);
    }
  }, [regitserResponse]);

  // useEffect(()=>{
  //   window.open('', 'popupChk', 'width=500, height=550, top=100, left=100, fullscreen=no, menubar=no, status=no, toolbar=no, titlebar=yes, location=no, scrollbar=no');
  //   document.form_chk.action = "https://nice.checkplus.co.kr/CheckPlusSafeModel/checkplus.cb";
  //   document.form_chk.target = "popupChk";
  //   document.form_chk.submit();
  // },[encData])

  useEffect(() => {
    if (passKey) {
      setEncData(passKey["enc_data"]);
    }
  }, [passKey]);

  return (
    <div>
      <section className="mt-10 flex flex-col items-center justify-center">
        <div>
          <span className="text-6xl font-bold text-gray-800">
            Join membership
          </span>
        </div>
        <div className="my-14">
          <h1 className="font-light text-3xl text-gray-800">
            Please use the service after registering as a member.
          </h1>
        </div>
        <div className="my-6">
          {message && (
            <h3 className="font-light text-3xl text-blue-800">{message}</h3>
          )}
        </div>
        <div className="border-t-2 border-gray-600 w-3/5">
          <div className="grid grid-cols-4">
            <div className="col-span-1 bg-gray-200 bg-gray-200 p-10 border-b-2 border-gray-300">
              <span className="font-bold">ID</span>
              <span className="text-red-500">*</span>
            </div>
            <div className="col-span-3 p-8 bg-white border-b-2 border-gray-300  gap-3">
              <div className="grid grid-cols-3">
                <div className="col-span-2 inline-flex">
                  <div className="mb-3 pt-0">
                    <input
                      type="text"
                      id="username"
                      name="id"
                      {...register("id", {
                        required:"Id is required",
                        minLength: {
                          value: 6,
                          message: "Please enter 6-10 characters",
                          koreanmessage: "",
                        },
                        maxLength:{
                            value:10,
                        }
                      })}
                      className={
                        (checkUserId ? " border-red-400 " : "  ") +
                        "px-4 py-4 text-blueGray-600 relative bg-white rounded border border-gray-400 outline-none focus:outline-none focus:ring"
                      }
                    />
                  </div>
                  <button
                    onClick={chekcId}
                    className="bg-main-blue hover:bg-main-blue mb-3 lg:w-80 sm:w-40 lg:h-16 sm:h-16 xs:text-sm sm:text-xl lg:text-2xl text-white ml-2 font-bold py-2 px-4 border border-blue-700 rounded"
                  >
                    Check Id
                  </button>
                </div>
              </div>
              <div className="flex flex-col">
                {checkUserId && (
                  <span className="text-red-500 text-md">
                    User Id Already exists
                  </span>
                )}
                <span className="text-red-500 text-sm">
                  <p>{errors.id?.type === "required" && "Id is required   "}</p>
                  <p>{errors.id?.type === "minLength" && <FormattedMessage  id = "Signup" defaultMessage="Please Enter Atleaset 6-10 charecters"/>}</p>
                  <p>{errors.id?.type === "maxLength" }</p>
                  
                </span>
              </div>
            </div>
            <div className="col-span-1 bg-gray-200 bg-gray-200 p-8 border-b-2 border-gray-300">
              <span className="font-bold">Password</span>
              <span className="text-red-500">*</span>
            </div>
            <div className="col-span-3 p-8 bg-white border-b-2 border-gray-300">
              <div className="mb-3 pt-0">
                <input
                  type="password"
                  {...register("password")}
                  id="PasswordField"
                  name="password"
                  className="px-4 py-4 text-blueGray-600 relative bg-white rounded  border border-gray-400 outline-none focus:outline-none focus:ring"
                />
              </div>
              <div className="flex flex-col">
                {/* <div>
                  <span className="text-red-500 text-md">
                    * It is less than 10-20 digits and is stored encrypted.
                  </span>
                </div> */}
                {/* <div>
                  {form.errors.password && (
                    <span className="text-red-500 text-sm">
                      <FormattedMessage
                        id={form.errors.koreanpassword}
                        defaultMessage={form.errors.password}
                      />
                    </span>
                  )}
                </div> */}
              </div>
            </div>
            <div className="col-span-1 bg-gray-200 bg-gray-200 p-8 border-b-2 border-gray-300">
              <span className="font-bold">Verify password</span>
              <span className="text-red-500">*</span>
            </div>
            <div className="col-span-3 p-8 bg-white border-b-2 border-gray-300">
              <div className="mb-3 pt-0">
                <input
                  type="password"
                  name="verify_password"
                  {...register("verify_password")}
                  className="px-4 py-4 text-blueGray-600 relative bg-white rounded border border-gray-400 outline-none focus:outline-none focus:ring"
                />
              </div>
              {/* {form.errors.verify_password && (
                <span className="text-red-500 text-sm">
                  <FormattedMessage
                    id={form.errors.koreanverify_password}
                    defaultMessage={form.errors.verify_password}
                  />
                </span>
              )} */}
            </div>
            <div className="col-span-1 bg-gray-200 bg-gray-200 p-8 border-b-2 border-gray-300">
              <span className="font-bold">Name</span>
              <span className="text-red-500">*</span>
            </div>
            <div className="col-span-3 p-8 bg-white border-b-2 border-gray-300">
              <div className="mb-3 pt-0">
                <input
                  type="text"
                  name="name"
                  {...register("name")}
                  className="px-4 py-4 text-blueGray-600 relative bg-white rounded border border-gray-400 outline-none focus:outline-none focus:ring"
                />
              </div>
              {/* {form.errors.name && (
                <span className="text-red-500 text-sm">
                  <FormattedMessage
                    id={form.errors.koreanname}
                    defaultMessage={form.errors.name}
                  />
                </span>
              )} */}
            </div>

            <div className="col-span-1 bg-gray-200 bg-gray-200 p-8 border-b-2 border-gray-300">
              <span className="font-bold">ORGANIZATION</span>
              <span className="text-red-500">*</span>
            </div>
            <div className="col-span-3 p-8 bg-white border-b-2 border-gray-300">
              <div className="mb-3 pt-0">
                <select
                  className="px-4 py-4 text-blueGray-600 relative bg-white rounded border border-gray-400 outline-none focus:outline-none focus:ring"
                  name="institute"
                  {...register("institute")}
                >
                  <option>--Select--</option>
                  {instituteDropdown}
                </select>
              </div>
              {/* {form.errors.institute && (
                <span className="text-red-500 text-sm">
                  <FormattedMessage
                    id={form.errors.koreaninstitute}
                    defaultMessage={form.errors.institute}
                  />
                </span>
              )} */}
            </div>

            <div className="col-span-1 bg-gray-200 bg-gray-200 p-8 border-b-2 border-gray-300">
              <span className="font-bold">Phone number</span>
              <span className="text-red-500">*</span>
            </div>
            <div className="col-span-3 p-8 bg-white border-b-2 border-gray-300 inline-flex gap-3">
              <div className="pt-0">
                <input
                  type="text"
                  name="phone_number"
                  {...register("phone_number")}
                  className="px-4 py-4 text-blueGray-600 relative bg-white rounded text-sm border border-gray-400 outline-none focus:outline-none focus:ring"
                />
                {/* <div>
                  {form.errors.phone_number && (
                    <span className="text-red-500 text-sm">
                      <FormattedMessage
                        id={form.errors.koreanphone_number}
                        defaultMessage={form.errors.phone_number}
                      />
                    </span>
                  )}
                </div> */}
              </div>
            </div>
            <div className="col-span-1 bg-gray-200 bg-gray-200 p-8 border-b-2 border-gray-300">
              <span className="font-bold">E-mail</span>
              <span className="text-red-500">*</span>
            </div>
            <div className="col-span-3 p-8 bg-white border-b-2 border-gray-300 inline-flex">
              <div className="mb-3 pt-0">
                <input
                  type="text"
                  name="email"
                  {...register("email")}
                  className="px-4 py-4 text-blueGray-600 relative bg-white rounded border border-gray-400 outline-none focus:outline-none focus:ring"
                />
                {/* <div>
                  {" "}
                  {form.errors.email && (
                    <span className="text-red-500 text-sm">
                      <FormattedMessage
                        id={form.errors.koreanemail}
                        defaultMessage={form.errors.email}
                      />
                    </span>
                  )}
                </div> */}
              </div>
              <h1 className="p-3">@</h1>
              <div className="mb-3 pt-0">
                <input
                  type="text"
                  name="domain_email"
                  value={domain_value["domain_email"]}
                  onChange={formSet}
                  id="input_domain_value"
                  disabled={inputmail ? "" : "disabled"}
                  className="px-4 py-4 text-blueGray-600 relative bg-white rounded border border-gray-400 outline-none focus:outline-none focus:ring"
                />
                {/* <div>
                  {form.errors.domain_email && (
                    <span className="text-red-500 text-sm">
                      <FormattedMessage
                        id={form.errors.koreandomain_email}
                        defaultMessage={form.errors.domain_email}
                      />
                    </span>
                  )}
                </div> */}
              </div>
              <select
                name="domain_email"
                onChange={formSet}
                className="ml-3 border border-gray-300 px-4 py-3 rounded focus:outline-none focus:ring"
              >
                <option value="option">Option</option>
                <option value="naver.com">naver.com</option>
                <option value="gmail.com">gmail.com</option>
                <option value="daum.com">daum.net</option>
                <option value="input">Direct input</option>
              </select>
            </div>

            {/* Verification Row */}
            <div className="col-span-1 bg-gray-200 bg-gray-200 p-8 border-b-2 border-gray-300">
              {/* <p>need to remove invsible</p> span*/}
              <span className="font-bold">Verification</span>
              <span className="text-red-500">*</span>
            </div>

            <div className="col-span-3 p-8 bg-white border-b-2 inline-flex flex-column  border-gray-300">
              <div className="">
                <div className="">
                  <input
                    type="radio"
                    id="mobile_verification"
                    name="verification"
                    value="mobile"
                    {...register("verification")}
                    className="mt-5"
                  />
                  <label htmlFor="mobile_verification">Mobile</label>
                  <input
                    type="radio"
                    id="email_verification"
                    name="verification"
                    value="email"
                    {...register("verification")}
                    className="mt-5 m-2"
                  />
                  <label htmlFor="email_verification">Email</label>
                  <br />
                </div>

                {/* <div>
                  {form.errors.verification && (
                    <span className="text-red-500 text-sm mt-2">
                      {errors["verification"]}
                    </span>
                  )}
                </div> */}
              </div>

              <div>
                {verificationState === "mobile" && (
                  <button
                    onClick={verifyMobile}
                    className="bg-main-blue mt-2 hover:bg-main-blue mb-3 lg:w-80 sm:w-40 lg:h-16 sm:h-16 xs:text-sm sm:text-xl lg:text-2xl text-white ml-2 font-bold py-2 px-4 border border-blue-700 rounded"
                  >
                    Verify Mobile
                  </button>
                )}
              </div>
              <div>
                {verificationState === "email" && (
                  <button
                    className="bg-main-blue mt-2 hover:bg-main-blue mb-3 lg:w-80 sm:w-40 lg:h-16 sm:h-16 xs:text-sm sm:text-xl lg:text-2xl text-white ml-2 font-bold py-2 px-4 border border-blue-700 rounded h-11"
                    onClick={verifyEmail}
                  >
                    verify Email
                  </button>
                )}
              </div>

              {form["verification"] == "email" &&
                ClickEmailverifyButton &&
                !ClickMobileverifyButton && (
                  <>
                    <div className="d-flex flex-row">
                      <div className="mb-3 mx-2 pt-0">
                        <input
                          type="text"
                          className="px-4 py-4 mt-2  text-blueGray-600 relative bg-white rounded border border-gray-400 outline-none focus:outline-none focus:ring w-40"
                        />
                      </div>
                      <>
                        <button className="bg-main-blue mt-2 hover:bg-main-blue mb-3 lg:w-80 sm:w-40 lg:h-16 sm:h-16 xs:text-sm sm:text-xl lg:text-2xl text-white ml-2 font-bold py-2 px-4 border border-blue-700 rounded w-48 h-12">
                          check verification code
                        </button>
                      </>
                    </div>
                    <p className="text-warning">
                      Please Enter the Code you have recieved in your Email
                    </p>
                  </>
                )}
            </div>
          </div>
        </div>
        <form name="form_chk" method="post">
          <input type="hidden" name="m" value="checkplusSerivce" />
          <input type="hidden" name="EncodeData" value={encData} />
        </form>

        <div className="inline-flex gap-2  my-6">
          <button
            className="hover:bg-blue-700 text-white font-bold py-6 px-6 float-left rounded bg-NccBlue-700"
            onClick={gotopreviousStep}
          >
            BACK
          </button>

          <button
            className={`text-white font-bold py-6 px-6  float-right rounded ${
              form.isVerified
                ? "bg-NccBlue-700"
                : "bg-grey-700 hover:bg-blue-700"
            }`}
            onClick={handleSubmit(register_user)}
            // disabled={form.isVerified? false : true}
          >
            Registration
          </button>
        </div>
      </section>
    </div>
  );
};

export default MemberShip;
