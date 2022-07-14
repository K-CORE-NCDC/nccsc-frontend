import React, { useState, useEffect } from "react";
import {FormattedMessage} from 'react-intl';
import {
  userRegister,
  checkUserName,
  getPassEncodeId,
} from "../../actions/api_actions";
import TermsofService from "../TermsAndPolicy/TermsofService";
import PrivacyPolicy from "../TermsAndPolicy/PrivacyPolicy";

import { useSelector, useDispatch } from "react-redux";
import { logDOM } from "@testing-library/react";

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
  // isVerified: "",
  errors: {
    id:"",
    koreanid:"",
    password: "",
    koreanpassword:"",
    verify_password: "",
    koreanverify_password: "",
    name:"",
    koreanname:"",
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
  }
};

const AlphaNumRegex = new RegExp("^[a-zA-Z0-9]*$");
const NumRegex = new RegExp("^[0-9]*$");
const AlphaNumRegexwithSpecialChars= new RegExp("^[ A-Za-z0-9_@./#&+-]*$")

const MemberShip = ({ changestep }) => {
  const [form, setForm] = useState(initial_state);
  const [errors, setError] = useState(initial_state);
  const [verificationState, setverificationState] = useState("");
  const [ClickEmailverifyButton, setClickEmailverifyButton] = useState(false)
  const [ClickMobileverifyButton, setClickMobileverifyButton] = useState(false)
  const dispatch = useDispatch();
  const regitserResponse = useSelector(
    (data) => data.dataVisualizationReducer.registerData
  );
  const checkUserId = useSelector(
    (data) => data.dataVisualizationReducer.checkUserName
  );
  const passKey = useSelector((data) => data.dataVisualizationReducer.passKey);
  const [message, setMessage] = useState("");
  const [inputmail, setInputMail] = useState(false);
  const [instituteDropdown, setInstituteDropdown] = useState([]);
  const [institute, setInstitute] = useState([]);
  const [encData, setEncData] = useState("");
  

  useEffect(()=>{
    setError(initial_state);
  },[])

  function formSet(e) {
  const {name,value}=e.target;
  console.log(name, value);
    if (e.target.name === "verification") {
      setverificationState(e.target.value);
      console.log(verificationState);
    }
    if (e.target.value === "input") {
      setForm((oldState) => ({ ...oldState, [e.target.name]: "" }));
      setInputMail(true);
    } else {
      setForm((oldState) => ({ ...oldState, [e.target.name]: e.target.value }));
    }
    console.log(form);

    const errors = form.errors;

    if (name==="id" && value==="") {
      errors.id="Please enter 6-10 characters";
      errors.koreanid="IDLength";
    }
    else if (name==="id" && !AlphaNumRegex.test(value)){
     errors.id="(e.g. @$#!*&) Special characters cannot be used"
     errors.koreanid="IDSpecialCharecters"
   } 
    else if (name==="id" && value.length<6) {
      errors.id="Please enter 6-10 characters";
      errors.koreanid="IDLength";
    }
    else if (name==="id"){
      errors.id=" "
      errors.koreanid=" ";
    }
    if (name==="password" && value==="") {
      errors.password='Please enter 9-20 characters';
      errors.koreanpassword='PasswordLength';
    }
   else if (name==="password" && value.length>9 && value.length<20)  {
      errors.password=" ";
      errors.koreanpassword=" ";
    }
    else if (name==="password" && (value.length<9 || value.length >20) ) {
      errors.password='Please enter 9-20 characters';
      errors.koreanpassword='PasswordLength';
    }
    let passwordforConfirming= document.getElementById('PasswordField');

    if(name==="verify_password" && value ===""){
      errors.verify_password="Please verify Password"
      errors.koreanverify_password="EnterVerifyPassword"
    }
   else if(name==="verify_password" && value != passwordforConfirming.value){
      errors.verify_password="verify password should be same as password"
      errors.koreanverify_password="VerifyPassword"
    }
   else if(name==="verify_password" && value == passwordforConfirming.value){
      errors.verify_password=" "
      errors.koreanverify_password=" "
    }

    
    if (name=="name" && value==="") {
      errors.name="Please Enter your Name"
      errors.koreanname="Name"
    }
    else if (name=="name" && value!=="") {
      errors.name=" "
      errors.koreanname=" " 
    }
    if (name==="institute" && value=== "--Select--" ) {
      errors.institute="Please Select any Institute";
      errors.koreaninstitute="Organization";
    }
    else if (name==="institute" && value=== "" ) {
      errors.institute="Please Select any Institute";
      errors.koreaninstitute="Organization";
    }
    else if (name==="institute"){
      errors.institute=" ";
      errors.koreaninstitute=" ";
    }

    if (name==="phone_number"&& value==="") {
      errors.phone_number="Please Enter Phone Number";
      errors.koreanphone_number="EnterPhoneNumber";
    }
     else if (name==="phone_number"&&!NumRegex.test(value)) {
      errors.phone_number="Please Enter Valid Phone Number";
      errors.koreanphone_number="EnterValidPhoneNumber";
    } 
    else if (name==="phone_number"&&
      (value.length > 10 ||
      value.length < 10)
    ) {
      errors.phone_number="Please Enter only 10 Numbers";
      errors.koreanphone_number="PhoneNumber10Digits"; 
    }
    else if (name==="phone_number"){
      errors.phone_number=" ";
      errors.koreanphone_number=" " 
    }

    if (name==="email" && value==="") {
      errors.email="Please Enter your EmailID";
      errors.koreanemail="EnterEmailID" 
    }
   else if (name==="email") {
      errors.email=" ";
      errors.koreanemail=" " 
    }
     if (name==="domain_email" && value==="option") {
       errors.domain_email="Please Select Domain";
       errors.koreandomain_email="SelectEmailDomain" 
     }

   else if (name==="domain_email" && value==="") {
      errors.domain_email="Please Select Domain";
      errors.koreandomain_email="SelectEmailDomain" 
    }
   else if (name==="domain_email") {
      errors.domain_email=" ";
      errors.koreandomain_email=" " 
    }

    if (name==="verification" && value==="") {
      errors.verification="Please Select anyone verification ";
      errors.koreanverification="Verification" 
    }

    if (name==="verification" && value!=="") {
      errors.verification=" ";
      errors.koreanverification=" " 
    }
    form.errors=errors;
  }

  function validation() {
    let count=0;
  //   for (let x in form) {
  //     if(x!="errors")
  //     {
  //       if(form[x]===""){
  //         count++;
  //       }
  //     }
  //  }
  
  }


  function register() {
    console.log("Values", form);
    console.log("errors", errors);
//  console.log(form.id,form.koreanid);
    if(!form["id"] && !form["koreanid"]){
      console.log("bucked");
      form.errors.id="Please Enter Your ID";
      form.errors.koreanid="DefaultID";
    }
  }
  useEffect(() => {
    let ins = [
      "GOVERNMENT",
      "UNIVERSITY",
      "RESEARCH CENTER",
      "HOSPITAL",
      "INDUSTRY",
      "OTHERS",
    ];
    let html = [];
    for (let i = 0; i < ins.length; i++) {
      html.push(
        <option key={ins[i]} value={ins[i]}>
          {ins[i]}
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

  const chekcId = () => {
    if (form["id"]) {
      let data = {
        value: form["id"],
        type: "username",
      };
      dispatch(checkUserName("GET", data));
    }
  };
  const gotopreviousStep = () => {
    changestep(0);
  };
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

  const verifyMobile = () => {
    setClickMobileverifyButton(true);
    setClickEmailverifyButton(false);
    dispatch(getPassEncodeId("GET", {}));
  };
  const verifyEmail = () => {
    setClickEmailverifyButton(true);
    setClickMobileverifyButton(false);
  };

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
                      value={form["id"]}
                      name="id"
                      onChange={formSet}
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
                {form.errors.id && (
                  <span className="text-red-500 text-sm"><FormattedMessage  id = {form.errors.koreanid} defaultMessage={form.errors.id}/></span>
                )}
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
                  value={form["password"]}
                  id="PasswordField"
                  name="password"
                  onChange={formSet}
                  className="px-4 py-4 text-blueGray-600 relative bg-white rounded  border border-gray-400 outline-none focus:outline-none focus:ring"
                />
              </div>
              <div className="flex flex-col">
                {/* <div>
                  <span className="text-red-500 text-md">
                    * It is less than 10-20 digits and is stored encrypted.
                  </span>
                </div> */}
                <div>
                  {form.errors.password && (
                    <span className="text-red-500 text-sm">
                     <FormattedMessage  id = {form.errors.koreanpassword} defaultMessage={form.errors.password}/>
                    </span>
                  )}
                </div>
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
                  value={form["verify_password"]}
                  name="verify_password"
                  onChange={formSet}
                  className="px-4 py-4 text-blueGray-600 relative bg-white rounded border border-gray-400 outline-none focus:outline-none focus:ring"
                />
              </div>
              {form.errors.verify_password && (
                <span className="text-red-500 text-sm">
                  <FormattedMessage  id = {form.errors.koreanverify_password} defaultMessage={form.errors.verify_password}/>
                </span>
              )}
            </div>
            <div className="col-span-1 bg-gray-200 bg-gray-200 p-8 border-b-2 border-gray-300">
              <span className="font-bold">Name</span>
              <span className="text-red-500">*</span>
            </div>
            <div className="col-span-3 p-8 bg-white border-b-2 border-gray-300">
              <div className="mb-3 pt-0">
                <input
                  type="text"
                  value={form["name"]}
                  name="name"
                  onChange={formSet}
                  className="px-4 py-4 text-blueGray-600 relative bg-white rounded border border-gray-400 outline-none focus:outline-none focus:ring"
                />
              </div>
              {form.errors.name && (
                <span className="text-red-500 text-sm"><FormattedMessage  id = {form.errors.koreanname} defaultMessage={form.errors.name}/></span>
              )}
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
                  onChange={formSet}
                >
                  <option>--Select--</option>
                  {instituteDropdown}
                </select>
              </div>
              {form.errors.institute && (
                <span className="text-red-500 text-sm">
                  <FormattedMessage  id = {form.errors.koreaninstitute} defaultMessage={form.errors.institute}/>
                </span>
              )}
            </div>

            <div className="col-span-1 bg-gray-200 bg-gray-200 p-8 border-b-2 border-gray-300">
              <span className="font-bold">Phone number</span>
              <span className="text-red-500">*</span>
            </div>
            <div className="col-span-3 p-8 bg-white border-b-2 border-gray-300 inline-flex gap-3">
              <div className="pt-0">
                <input
                  type="text"
                  value={form["phone_number"]}
                  name="phone_number"
                  onChange={formSet}
                  className="px-4 py-4 text-blueGray-600 relative bg-white rounded text-sm border border-gray-400 outline-none focus:outline-none focus:ring"
                />
                <div>
                  {" "}
                  {form.errors.phone_number && (
                    <span className="text-red-500 text-sm">
                      <FormattedMessage  id = {form.errors.koreanphone_number} defaultMessage={form.errors.phone_number}/>
                    </span>
                  )}
                </div>
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
                  value={form["email"]}
                  name="email"
                  onChange={formSet}
                  className="px-4 py-4 text-blueGray-600 relative bg-white rounded border border-gray-400 outline-none focus:outline-none focus:ring"
                />
                <div>
                  {" "}
                  {form.errors.email && (
                    <span className="text-red-500 text-sm">
                        <FormattedMessage  id = {form.errors.koreanemail} defaultMessage={form.errors.email}/>
                    </span>
                  )}
                </div>
              </div>
              <h1 className="p-3">@</h1>
              <div className="mb-3 pt-0">
                <input
                  type="text"
                  value={form["domain_email"]}
                  name="domain_email"
                  onChange={formSet}
                  disabled={inputmail ? "" : "disabled"}
                  className="px-4 py-4 text-blueGray-600 relative bg-white rounded border border-gray-400 outline-none focus:outline-none focus:ring"
                />
                <div>
                  {form.errors.domain_email && (
                    <span className="text-red-500 text-sm">
                     <FormattedMessage  id = {form.errors.koreandomain_email} defaultMessage={form.errors.domain_email}/>
                    </span>
                  )}
                </div>
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
                    className="mt-5"
                    onChange={formSet}
                  />
                  <label htmlFor="mobile_verification">Mobile</label>
                  <input
                    type="radio"
                    id="email_verification"
                    name="verification"
                    value="email"
                    className="mt-5 m-2"
                    onChange={formSet}
                  />
                  <label htmlFor="email_verification">Email</label>
                  <br />
                </div>

                <div>
                  {errors.verification && (
                    <span className="text-red-500 text-sm mt-2">
                      {errors["verification"]}
                    </span>
                  )}
                </div>
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
                    className="bg-main-blue mt-2 hover:bg-main-blue mb-3 lg:w-80 sm:w-40 lg:h-16 sm:h-16 xs:text-sm sm:text-xl lg:text-2xl text-white ml-2 font-bold py-2 px-4 border border-blue-700 rounded"
                    style={{ height: "45px" }}
                    onClick={verifyEmail}
                  >
                    verify Email
                  </button>
                )}
              </div>

              { form["verification"]=='email' && ClickEmailverifyButton   && !ClickMobileverifyButton && (
                <>
                <div className="d-flex flex-row">
                  <div className="mb-3 mx-2 pt-0">
                    <input
                      type="text"
                      className="px-4 py-4 mt-2  text-blueGray-600 relative bg-white rounded border border-gray-400 outline-none focus:outline-none focus:ring"
                      style={{ width: "150px" }}
                    />
                  </div>
                  <>
                    <button
                      className="bg-main-blue mt-2 hover:bg-main-blue mb-3 lg:w-80 sm:w-40 lg:h-16 sm:h-16 xs:text-sm sm:text-xl lg:text-2xl text-white ml-2 font-bold py-2 px-4 border border-blue-700 rounded"
                      style={{ width: "200px", height: "45px" }}
                    >
                      check verification code 
                    </button>
                  </>
                </div>
                <p className="text-warning">Please Enter the Code you have recieved in your Email</p>
                </>
              )}
            </div>
          </div>
        </div>
        <form name="form_chk" method="post">
          <input type="hidden" name="m" value="checkplusSerivce" />
          <input type="hidden" name="EncodeData" value={encData} />
        </form>
        <div className="inline-flex gap-3 mt-6">
          <button
            className="hover:bg-blue-700 text-white font-bold py-6 px-6 float-left rounded"
            style={{ backgroundColor: "#bdbdbd" }}
            onClick={gotopreviousStep}
          >
            Cancellation
          </button>
          <button
            className="hover:bg-blue-700 text-white font-bold py-6 px-6  float-right rounded"
            onClick={register}
            style={{ backgroundColor: "#194872" }}
          >
            Registration
          </button>
        </div>
      </section>
    </div>
  );
};

export default MemberShip;
