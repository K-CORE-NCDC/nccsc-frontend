import React, { useState, useEffect } from "react";
import { FormattedMessage } from "react-intl";
import "../../styles/clustergram.css";
import {
  userRegister,
  checkUserName,
  getPassEncodeId,
  sendEmail,
  verifyOTP,
  checkEmail
} from "../../actions/api_actions";
import { useSelector, useDispatch } from "react-redux";
import { EyeIcon, EyeOffIcon } from "@heroicons/react/outline";
import swal from 'sweetalert';

const AlphaNumRegex = new RegExp("^[a-zA-Z0-9]*$");
const AlphaNumRegexwithNoSpecialCharecters = new RegExp("(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{2,}$");
const NumRegex = new RegExp("^[0-9]*$");
const AlphaNumRegexwithSpecialCharsExceptDot = new RegExp("^[ A-Za-z0-9_/#&+-]*$");
const KoreanRegex = new RegExp("(\S*[\u3131-\u314e|\u314f-\u3163|\uac00-\ud7a3]+\S*)")

const MemberShip = ({ changestep }) => {


  const register_user = () => {

    for (let i in form['errors']) {
      if (form['errors'][i] === "") {
        form.isVerified = true
      } else {
        form.isVerified = false
        break;
      }

      for (let i in form) {
        if (i !== 'mobileVerified' && i !== 'emailVerified' && i !== 'errors' && form[i] === "") {
          form.isVerified = false
          break;
        } else if (i !== 'mobileVerified' && i !== 'emailVerified' && i !== 'errors') {
          form.isVerified = true

        }

      }
    }
    if ((form.mobileVerified === true || form.emailVerified === true) && (form.isVerified === true)) {
      let data = {
        id: form.id,
        password: form.password,
        name: form.name,
        phone_number: form.phone_number,
        email: form.email,
        domain_email: form.domain_email
      }
      dispatch(userRegister("POST", data));
      changestep(2);
    }
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
    otp: "",
    emailVerified: false,
    mobileVerified: false,
    isVerified: false,
    errors: {
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
    },
  };

  const [form, setForm] = useState(initial_state);
  const [verificationState, setverificationState] = useState("");
  const [ClickEmailverifyButton, setClickEmailverifyButton] = useState(false);
  const [ClickMobileverifyButton, setClickMobileverifyButton] = useState(false);
  const [message, setMessage] = useState("");
  const [inputmail, setInputMail] = useState(false);
  const [instituteDropdown, setInstituteDropdown] = useState([]);
  const [encData, setEncData] = useState("");
  const [visibility, setvisibility] = useState(false);
  const [otpStatus, setotpStatus] = useState(false);
  const [emailExist, setEmailExist] = useState("")
  const [emailStatus, setEmailStatus] = useState(false)
  const [RegistrationClass, setRegistrationClass] = useState(false)

  const dispatch = useDispatch();

  const regitserResponse = useSelector(
    (data) => data.dataVisualizationReducer.registerData
  );
  const checkUserId = useSelector(
    (data) => data.dataVisualizationReducer.checkUserName
  );
  const isEmailExist = useSelector(
    (data) => data.homeReducer.is_email_exist
  )
  const registration_status = useSelector(
    (data) => data.homeReducer.registration_status
  )

  useEffect(() => {
    isEmailExist && setEmailExist(isEmailExist.status)
  }, [isEmailExist]);

  const passKey = useSelector((data) => data.dataVisualizationReducer.passKey);
  const otp_verification_status = useSelector((data) => data.homeReducer.otp_validation_status);
  const emailsentstatus = useSelector((data) => data.homeReducer.emailsentstatus);

  // !	33	exclamation mark
  // "	34	quotation mark
  // #	35	number sign
  // $	36	dollar sign
  // %	37	percent sign
  // &	38	ampersand
  // '	39	apostrophe
  // (	40	left parenthesis
  // )	41	right parenthesis
  // *	42	asterisk
  // +	43	plus sign
  // ,	44	comma
  // -	45	hyphen
  // .	46	period
  // /	47	slash
  // @  64  at sign

  let passwordValidator = (password) => {

    let count = 0, small = 0, caps = 0, special = 0, number = 0;
    for (let i = 0; i < password.length; i++) {
      if (password.charCodeAt(i) >= 97 && password.charCodeAt(i) <= 122) {
        small++;
        if (small === 1)
          count++;
      }
      else if (password.charCodeAt(i) >= 65 && password.charCodeAt(i) <= 90) {
        caps++;
        if (caps === 1)
          count++;
      }

      else if ((password.charCodeAt(i) >= 33 && password.charCodeAt(i) <= 47) || password.charCodeAt(i) === 64) {
        special++;
        if (special === 1)
          count++;
      }
      else if (password.charCodeAt(i) >= 48 && password.charCodeAt(i) <= 57) {
        number++;
        if (number === 1)
          count++;
      }

      if (count >= 3 && password.length >= 9 && password.length <= 20) {
        return true
      }
    }
    return false
  }

  let nameValidator = (name) => {
    for (let i = 0; i < name.length; i++) {
      if (name.charCodeAt(i) >= 48 && name.charCodeAt(i) <= 57) {
        return true;
      }
    }
    for (let i = 0; i < name.length; i++) {
      if ((name.charCodeAt(i) >= 33 && name.charCodeAt(i) <= 47) || name.charCodeAt(i) === 64) {
        return true;
      }
    }
  }


  let idValidator = (id) => {
    let count = 0, alphas = 0, numbers = 0;
    for (let i = 0; i < id.length; i++) {

      if ((id.charCodeAt(i) >= 65 && id.charCodeAt(i) <= 90) || (id.charCodeAt(i) >= 97 && id.charCodeAt(i) <= 122)) {
        alphas++;
        if (alphas === 1)
          count++;
      }

      else if (id.charCodeAt(i) >= 48 && id.charCodeAt(i) <= 57) {
        numbers++;
        if (numbers === 1)
          count++;
      }
      if (count >= 2) {
        return true
      }
    }
    return false;
  }

  let idValidatorforspecial = (id) => {
    for (let i = 0; i < id.length; i++) {

      if ((id.charCodeAt(i) >= 33 && id.charCodeAt(i) <= 47) || id.charCodeAt(i) === 64) {
        return true;
      }
    }
    return false;
  }






  const formSet = (e) => {
    const { name, value } = e.target;
    // console.log(name, value);
    // console.log(e.target.id);
    if (e.target.value === "input") {
      setForm((oldState) => ({ ...oldState, [e.target.name]: "" }));
      setInputMail(true);
    } else {
      setForm((oldState) => ({ ...oldState, [e.target.name]: e.target.value }));
    }
    if (e.target.name === "verification") {
      setverificationState(e.target.value);
    }

    const errors = form.errors;

    // const isKoreanWord = (input) => {
    //   const match = input.match(/[\u3131-\uD79D]/g);
    //   return match ? match.length === input.length : false;
    // }
    // ID Validation

    if (name === "id" && value === "") {
      errors.id = "Please enter 6-10 characters";
      errors.koreanid = "IDLength";
    }
    else if (name === "id" && KoreanRegex.test(value)) {
      errors.id = "Korean is not available";
      errors.koreanid = "IDKoreanNotAllowed";
    }
    // else if (name === "id" && AlphaNumRegexwithNoSpecialCharecters.test(value)) {
    //   errors.id = "(e.g. @$#!*&) Special characters cannot be used";
    //   errors.koreanid = "IDSpecialCharecters";
    // }
    else if (name === "id" && !idValidator(value)) {
      errors.id = "Please enter 6-10 characters";
      errors.koreanid = "IDLength";
    }

    else if (name === "id" && !idValidatorforspecial(value)) {
      errors.id = "(e.g. @$#!*&) Special characters cannot be used";
      errors.koreanid = "IDSpecialCharecters";
    }
    else if (name === "id" && value.length < 6) {
      errors.id = "Please enter 6-10 characters";
      errors.koreanid = "IDLength";
    }
    else if (name === "id" && value.length > 10) {
      errors.id = "Please enter 6-10 characters";
      errors.koreanid = "IDLength";
    }

    else if (name === "id") {
      errors.id = "";
      errors.koreanid = "";
    }


    //  Password Validation

    if (name === "password" && value === "") {
      errors.password = "Password should contain atleast 9 charecters";
      errors.koreanpassword = "PasswordLength";
    }
    else if (name === "password" && KoreanRegex.test(value)) {
      errors.password = "Korean is not allowed";
      errors.koreanpassword = "KoreanPasswordNotAvailable";
    }
    else if (name === "password" && !passwordValidator(value)) {
      errors.password = "The password should be more than 9 and lessthan 20 characters(contain at least three character categories among the following: uppercase, lowercase, numeric, or special character)";
      errors.koreanpassword = "DefaultPasswordMsg";
    }

    else if (name === "password") {
      errors.password = "";
      errors.koreanpassword = "";
    }


    const password_is = form.password;

    //  Verify Password Validation

    if (name === "verify_password" && value === "") {
      errors.verify_password = "Please verify Password";
      errors.koreanverify_password = "EnterVerifyPassword";
    } else if (name === "verify_password" && value !== password_is) {
      errors.verify_password = "verify password should be same as password";
      errors.koreanverify_password = "VerifyPassword";
    } else if (name === "verify_password" && value === password_is) {
      errors.verify_password = "";
      errors.koreanverify_password = "";
    }

    //  Name Validation

    if (name === "name" && value === "") {
      errors.name = "Please Enter your Name";
      errors.koreanname = "Name";
    }

    else if (name === "name" && nameValidator(value)) {
      errors.name = "Enter a Valid Name";
      errors.koreanname = "ValidName";
    }
    else if (name === "name" && value !== "") {
      errors.name = "";
      errors.koreanname = "";
    }



    // Institue Validation

    if (name === "institute" && value === "--Select--") {
      errors.institute = "Please Select any Institute";
      errors.koreaninstitute = "Organization";
    } else if (name === "institute" && value === "") {
      errors.institute = "Please Select any Institute";
      errors.koreaninstitute = "Organization";
    } else if (name === "institute") {
      errors.institute = "";
      errors.koreaninstitute = "";
    }

    // Phone Number Validation

    if (name === "phone_number" && value === "") {
      errors.phone_number = "Please Enter Phone Number";
      errors.koreanphone_number = "EnterPhoneNumber";
    }
    else if (name === "phone_number" && !NumRegex.test(value)) {
      errors.phone_number = "Please Enter Valid Phone Number";
      errors.koreanphone_number = "EnterValidPhoneNumber";
    }

    else if (
      name === "phone_number" &&
      (value.length > 20)
    ) {
      errors.phone_number = "Please Enter less than 20 Numbers";
      errors.koreanphone_number = "PhoneNumberNoOfDigits";
    }
    // else if (
    //   name === "phone_number" &&
    //   (value.length > 20 || value.length < 12)
    // ) {
    //   errors.phone_number = "Please Enter less than 12-15 Numbers";
    //   errors.koreanphone_number = "PhoneNumberNoOfDigits";
    // }
    else if (name === "phone_number") {
      errors.phone_number = "";
      errors.koreanphone_number = "";
    }


    // Email Validation

    if (name === "email" && value === "") {
      setEmailExist("")
      errors.email = "Please Enter your EmailID";
      errors.koreanemail = "EnterEmailID";
    }
    else if (name === "email" && !AlphaNumRegexwithSpecialCharsExceptDot.test(value)) {
      errors.email = "Please valid EmailID";
      errors.koreanemail = "EnterValidEmailID";
    }
    else if (name === "email") {
      errors.email = "";
      errors.koreanemail = "";
    }


    // Domain Validation 

    if (name === "domain_email" && value === "option") {
      errors.domain_email = "Please Select Domain";
      errors.koreandomain_email = "SelectEmailDomain";
    } else if (name === "domain_email" && value === "") {
      errors.domain_email = "Please Select Domain";
      errors.koreandomain_email = "SelectEmailDomain";
    } else if (name === "domain_email") {
      errors.domain_email = "";
      errors.koreandomain_email = "";
    }


    // Verification

    if (name === "verification" && value === "") {
      errors.verification = "Please Select anyone verification ";
      errors.koreanverification = "Verification";
    }
    if (name === "verification" && value !== "") {
      errors.verification = "";
      errors.koreanverification = "";
    }

    form.errors = errors;
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

  const checkEmailExist = () => {
    let email = `${form.email}@${form.domain_email}`
    dispatch(checkEmail("POST", { "email_id": email }))
  };

  const verifyMobile = (e) => {

    setClickMobileverifyButton(true);
    setClickEmailverifyButton(false);
    dispatch(getPassEncodeId("GET", { 'mobile': form['phone_number'] }));
  };



  const verifyEmail = (e) => {
    if (form.email === "" || form.domain_email === "") {
      // isEmailExist.status = ""
      setEmailExist("")
      setEmailStatus(false);
      setForm((prevState) => ({
        ...prevState,
        errors: {
          ...prevState.errors,
          email: "Please Enter valid EmailID",
          koreanemail: "EnterValidEmailID",
          domain_email: "Please Select Domain",
          koreandomain_email: "SelectEmailDomain"

        }
      }))
    }

    else if (emailExist && emailExist === "Email is Not Registered") {
      let email = `${form.email}@${form.domain_email}`
      dispatch(sendEmail("POST", { 'email_id': email, 'send_otp': true }));
      setForm((prevState) => ({
        ...prevState,
        errors: {
          ...prevState.errors,
          email: "",
          koreanemail: "",
          domain_email: "",
          koreandomain_email: ""

        }
      }))
      setEmailStatus(true);
      setClickEmailverifyButton(true);
      setClickMobileverifyButton(false);
    }



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

  useEffect(() => {
    if (encData !== '') {
      window.open('', 'popupChk', 'width=500, height=550, top=100, left=100, fullscreen=no, menubar=no, status=no, toolbar=no, titlebar=yes, location=no, scrollbar=no');
      document.form_chk.action = "https://nice.checkplus.co.kr/CheckPlusSafeModel/checkplus.cb";
      document.form_chk.target = "popupChk";
      document.form_chk.submit();
    }
  }, [encData])

  useEffect(() => {
    if (passKey) {
      setEncData(passKey["enc_data"]);
    }
  }, [passKey]);

  useEffect(() => {
    if (otp_verification_status && otp_verification_status.status === true) {
      setRegistrationClass(true)
      form.emailVerified = true
      setotpStatus(true);
    }
  }, [otp_verification_status]);

  useEffect(() => {
    if (registration_status && otp_verification_status.message === 'Registered Successfully') {
      changestep(2)
    }
    else if (registration_status && otp_verification_status.message === 'User already exists') {

      swal("User Already Exists", {
        closeOnClickOutside: false
      })
        .then((value) => {
          setTimeout(() => {

            // window.location.href = '/login/'
          }, 2000)
        });
    }
  }, [registration_status]);

  useEffect(() => {
    setRegistrationClass(form.isVerified)
  }, [form.isVerified])

  const CheckVerificationCode = (e) => {
    let otp = form.otp;
    let email = `${form.email}@${form.domain_email}`
    dispatch(verifyOTP("POST", { 'email_id': email, 'otp': otp }));

  }



  return (
    <div >
      <section className="mt-10 flex flex-col items-center justify-center" >
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
        <div className="border-t-2 border-gray-600 w-4/6" >
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
                <p></p>
                {checkUserId && (
                  <span className="text-red-500 text-md">
                    User Id Already exists
                  </span>
                )}
                {!form.errors.id && (
                  <span className="text-gray-700 text-sm lh-2">
                    <FormattedMessage
                      id="DefaultIDMsg"
                      defaultMessage={"ID should be combination of capital/lowercase alphabets and numbers in 6-10 letters. Koreans and special symbols are not allowed"}
                    />
                  </span>
                )}
                {form.errors.id && (
                  <span className="text-red-500 text-sm">
                    <FormattedMessage
                      id={form.errors.koreanid}
                      defaultMessage={form.errors.id}
                    />
                  </span>
                )}
              </div>
            </div>
            <div className="col-span-1 bg-gray-200 bg-gray-200 p-8 border-b-2 border-gray-300">
              <span className="font-bold">Password</span>
              <span className="text-red-500">*</span>
            </div>
            <div className="col-span-3 p-8 bg-white border-b-2 border-gray-300">
              <div className="mb-3 pt-0 relative">
                <input
                  type={visibility ? "input" : "password"}
                  value={form["password"]}
                  id="PasswordField"
                  name="password"
                  onChange={formSet}
                  className="px-4 py-4 text-blueGray-600 relative bg-white rounded  border border-gray-400 outline-none focus:outline-none focus:ring"
                />
                <span className="absolute cursor-pointer left-80 top-2" > {visibility ? <EyeIcon className="h-14 w-12 inline text-main-white" onClick={() => setvisibility(visibility => !visibility)}></EyeIcon> : <EyeOffIcon className="h-14 w-12 inline text-main-white" onClick={() => setvisibility(visibility => !visibility)}></EyeOffIcon>}</span>

              </div>
              <div className="flex flex-col">
                {/* <div>
                  <span className="text-red-500 text-md">
                    * It is less than 10-20 digits and is stored encrypted.
                  </span>
                </div> */}
                <div>
                  {!form.errors.password && (
                    <span className="text-gray-700 text-sm">
                      <FormattedMessage
                        id="DefaultPasswordMsg"
                        defaultMessage="The password should be more than 9 and less
                        than 20 characters (contain at least three character categories among the
                        following: uppercase, lowercase, numeric, or special character)"
                      />
                    </span>
                  )}

                  {form.errors.password && (
                    <span className="text-red-500 text-sm">
                      <FormattedMessage
                        id={form.errors.koreanpassword}
                        defaultMessage={form.errors.password}
                      />
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
              <div className="mb-3 pt-0 relative">
                <input
                  type={visibility ? "input" : "password"}
                  value={form["verify_password"]}
                  name="verify_password"
                  onChange={formSet}
                  className="px-4 py-4 text-blueGray-600 relative bg-white rounded border border-gray-400 outline-none focus:outline-none focus:ring"
                />
                <span className="absolute cursor-pointer left-80 top-2" > {visibility ? <EyeIcon className="h-14 w-12 inline text-main-white" onClick={() => setvisibility(visibility => !visibility)}></EyeIcon> : <EyeOffIcon className="h-14 w-12 inline text-main-white" onClick={() => setvisibility(visibility => !visibility)}></EyeOffIcon>}</span>

              </div>
              {form.errors.verify_password && (
                <span className="text-red-500 text-sm">
                  <FormattedMessage
                    id={form.errors.koreanverify_password}
                    defaultMessage={form.errors.verify_password}
                  />
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
                <span className="text-red-500 text-sm">
                  <FormattedMessage
                    id={form.errors.koreanname}
                    defaultMessage={form.errors.name}
                  />
                </span>
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
                  <FormattedMessage
                    id={form.errors.koreaninstitute}
                    defaultMessage={form.errors.institute}
                  />
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
                  // className="px-4 py-4 text-blueGray-600 relative bg-white rounded text-sm border border-gray-400 outline-none focus:outline-none focus:ring"
                  className="px-4 py-4 text-blueGray-600 relative bg-white rounded border border-gray-400 outline-none focus:outline-none focus:ring"
                />
                <div>
                  {" "}
                  {form.errors.phone_number && (
                    <span className="text-red-500 text-sm">
                      <FormattedMessage
                        id={form.errors.koreanphone_number}
                        defaultMessage={form.errors.phone_number}
                      />
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
                  {form.errors.email && (
                    <span className="text-red-500 text-sm">
                      <FormattedMessage
                        id={form.errors.koreanemail}
                        defaultMessage={form.errors.email}
                      />
                    </span>
                  )}
                  <br></br>
                  {emailExist && (
                    <span className={`text-red-500 text-sm ${emailExist === 'Email is Already Registerd' ? '' : 'hidden'}`}
                    >
                      {emailExist === 'Email is Already Registerd' ? 'Email Already exists' : ''}
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
                  className="px-4 py-4 w-48 text-blueGray-600 relative bg-white rounded border border-gray-400 outline-none focus:outline-none focus:ring"
                />
                <div>
                  {form.errors.domain_email && (
                    <span className="text-red-500 text-sm">
                      <FormattedMessage
                        id={form.errors.koreandomain_email}
                        defaultMessage={form.errors.domain_email}
                      />
                    </span>
                  )}
                </div>
              </div>
              <select
                name="domain_email"
                onChange={formSet}
                className="ml-3 border border-gray-300 px-4 py-3 h-16 rounded focus:outline-none focus:ring"
              >
                <option value="option">Option</option>
                <option value="naver.com">naver.com</option>
                <option value="gmail.com">gmail.com</option>
                <option value="daum.com">daum.net</option>
                <option value="input">Direct input</option>
              </select>

              <button
                onClick={checkEmailExist}
                className="bg-main-blue hover:bg-main-blue mb-3 lg:w-80 sm:w-40 lg:h-16 sm:h-16 xs:text-sm sm:text-xl lg:text-2xl text-white ml-2 font-bold py-2 px-4 border border-blue-700 rounded"
              >
                Check Email
              </button>
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
                  />&nbsp;
                  <label htmlFor="mobile_verification">Mobile</label>
                  <input
                    type="radio"
                    id="email_verification"
                    name="verification"
                    value="email"
                    className="mt-5 ml-5"
                    onChange={formSet}
                  />&nbsp;
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
                    onClick={(e) => verifyMobile(e)}
                    className="bg-main-blue mt-2 hover:bg-main-blue mb-3 lg:w-80 sm:w-40 lg:h-16 sm:h-16 xs:text-sm sm:text-xl lg:text-2xl text-white ml-2 font-bold py-2 px-4 border border-blue-700 rounded"
                  >
                    Verify Mobile
                  </button>
                )}
              </div>
              <div>
                {emailExist === "Email is Not Registered" && verificationState === "email" && (
                  <button
                    className="bg-main-blue mt-2 hover:bg-main-blue mb-3 lg:w-80 sm:w-40 lg:h-16 sm:h-16 xs:text-sm sm:text-xl lg:text-2xl text-white ml-2 font-bold py-2 px-4 border border-blue-700 rounded h-11"
                    onClick={(e) => verifyEmail(e)}
                  >
                    Verify Email
                  </button>
                )}
              </div>

              {emailExist === "Email is Not Registered" && form["verification"] === "email" &&
                ClickEmailverifyButton &&
                !ClickMobileverifyButton && (
                  <>
                    <div className="d-flex flex-row">
                      <div className="mb-3 mx-2 pt-0">
                        <input type="text" className="px-4 py-4 mt-2  
                        text-blueGray-600 relative bg-white rounded border 
                        border-gray-400 outline-none focus:outline-none focus:ring w-80"
                          value={form["otp"]}
                          id="OTP_is"
                          name="otp"
                          onChange={formSet}
                        />
                      </div>
                      <>
                        <button onClick={(e) =>
                          CheckVerificationCode(e)
                        } className="bg-main-blue mt-2 hover:bg-main-blue mb-3 lg:w-80 sm:w-40 lg:h-16 sm:h-16 xs:text-sm sm:text-xl lg:text-2xl text-white ml-2 font-bold py-2 px-4 border border-blue-700 rounded w-48 h-12">
                          Check verification code
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
            className={`text-white font-bold py-6 px-6  float-right rounded ${RegistrationClass === true
              ? "bg-NccBlue-700 hover:bg-blue-700"
              : "bg-grey-700 "
              }`}
            onClick={register_user}
          // disabled={form.isVerified === true ? false : true}
          >
            Registration
          </button>
        </div>
      </section >
    </div >
  );
};

export default MemberShip;
