import React, { useState, useEffect } from 'react';
import {userRegister} from '../../actions/api_actions';
import { useSelector, useDispatch } from "react-redux";

let initial_state = {
  "id":"",
  "password":"",
  "verify_password":"",
  "name":"",
  "phone_number":"",
  "email":"",
  "domain_email":""
}

const MemberShip = () => {
    const [form, setForm] = useState(initial_state)
    const [errors,setError] = useState(initial_state)
    const dispatch = useDispatch()
    const regitserResponse = useSelector((data) => data.dataVisualizationReducer.registerData);
    const [message,setMessage] = useState("")

    function formSet(e){
      setForm(oldState => ({ ...oldState, [e.target.name]: e.target.value}))
    }

    function validation(){
      if(!form['id']){
        setError(oldState => ({ ...oldState, id: "id cannot be blank"}))
        return false
      }
      else if (!form['password']) {
        setError(oldState => ({ ...oldState, password: "password cannot be blank"}))
        return false
      }
      else if (!form['verify_password']) {
        setError(oldState => ({ ...oldState, verify_password: "verify_password cannot be blank"}))
        return false
      }
      else if (form['password'] !== form['verify_password']) {
        setError(oldState => ({ ...oldState, verify_password: "password and verify_password are not matching"}))
        return false
      }
      else if (!form['name']) {
        setError(oldState => ({ ...oldState, name: "name cannot be blank"}))
        return false
      }
      else if (!form['phone_number']) {
        setError(oldState => ({ ...oldState, phone_number: "phone_number cannot be blank"}))
        return false
      }
      else if (!form['email']) {
        setError(oldState => ({ ...oldState, email: "email cannot be blank"}))
        return false
      }
      else if (!form['domain_email']) {
        setError(oldState => ({ ...oldState, domain_email: "domain name cannot be blank"}))
        return false
      }
      else{
        return true
      }
    }

    function register(){
        setError(initial_state)
        if(validation()){
          dispatch(userRegister('POST', form))
        }
    }

    useEffect(() => {
      if(regitserResponse){
        setMessage(regitserResponse['message'])
      }
    }, [regitserResponse])

    return (
        <div>
            <section className="mt-10 flex flex-col items-center justify-center">
                <div>
                    <span className="text-6xl font-bold text-gray-800">Join membership</span>
                </div>
                <div className="my-14">
                    <h1 className="font-light text-3xl text-gray-800">Please use the service after registering as a member.</h1>
                </div>
                <div className="my-6">
                  {message && <h3 className="font-light text-3xl text-blue-800">{message}</h3>}
                </div>
                <div className="border-t-2 border-gray-600 w-3/5">
                  <div className="grid grid-cols-4">
                    <div className="col-span-1 bg-gray-200 bg-gray-200 p-10 border-b-2 border-gray-300">
                      <text className="font-bold">ID</text>
                      <span className="text-red-500">*</span>
                    </div>
                    <div className="col-span-3 p-8 bg-white border-b-2 border-gray-300 inline-flex gap-3">
                      <div className="mb-3 pt-0">
                        <input type="text"  value={form['id']} name="id" onChange={formSet} className="px-4 py-4 text-blueGray-600 relative bg-white rounded border border-gray-400 outline-none focus:outline-none focus:ring"/>
                      </div>
                      <button className="hover:bg-blue-700 text-white h-11 mt-2 font-bold py-1 px-6 float-left rounded" style={{backgroundColor:"#bdbdbd"}}>
                        confirm repetition
                      </button>
                      {errors.id && <span className="text-red-500 text-sm">{errors['id']}</span>}
                    </div>
                    <div className="col-span-1 bg-gray-200 bg-gray-200 p-8 border-b-2 border-gray-300">
                      <span className="font-bold">Password</span><span className="text-red-500">*</span>
                    </div>
                    <div className="col-span-3 p-8 bg-white border-b-2 border-gray-300">
                        <div className="mb-3 pt-0">
                          <input type="password"  value={form['password']} name="password" onChange={formSet} className="px-4 py-4 text-blueGray-600 relative bg-white rounded  border border-gray-400 outline-none focus:outline-none focus:ring"/>
                        </div>
                        <div className="flex flex-col">
                          <div>
                            <span className="text-red-500 text-sm">* It is less than 10-20 digits and is stored encrypted.</span>
                          </div>
                          <div>
                            {errors.password && <span className="text-red-500 text-sm">{errors['password']}</span>}
                          </div>
                        </div>

                    </div>
                    <div className="col-span-1 bg-gray-200 bg-gray-200 p-8 border-b-2 border-gray-300">
                      <span className="font-bold">Verify password</span><span className="text-red-500">*</span>
                    </div>
                    <div className="col-span-3 p-8 bg-white border-b-2 border-gray-300">
                      <div className="mb-3 pt-0">
                        <input type="password"  value={form['verify_password']} name="verify_password" onChange={formSet} className="px-4 py-4 text-blueGray-600 relative bg-white rounded border border-gray-400 outline-none focus:outline-none focus:ring"/>
                      </div>
                      {errors.verify_password && <span className="text-red-500 text-sm">{errors['verify_password']}</span>}
                    </div>
                    <div className="col-span-1 bg-gray-200 bg-gray-200 p-8 border-b-2 border-gray-300">
                      <span className="font-bold">Name</span><span className="text-red-500">*</span>
                    </div>
                    <div className="col-span-3 p-8 bg-white border-b-2 border-gray-300">
                        <div className="mb-3 pt-0">
                          <input type="text" value={form['name']} name="name" onChange={formSet} className="px-4 py-4 text-blueGray-600 relative bg-white rounded border border-gray-400 outline-none focus:outline-none focus:ring"/>
                        </div>
                        {errors.name && <span className="text-red-500 text-sm">{errors['name']}</span>}
                    </div>
                    <div className="col-span-1 bg-gray-200 bg-gray-200 p-8 border-b-2 border-gray-300">
                      <span className="font-bold">Phone number</span><span className="text-red-500">*</span>
                    </div>
                    <div className="col-span-3 p-8 bg-white border-b-2 border-gray-300 inline-flex gap-3">
                        <label className="pt-3">
                          <input type="checkbox" className="form-radio" name="accountType" value="personal"/>
                          <span className="ml-2 font-medium">I agree to receive SMS</span>
                        </label>
                        <div className="pt-0">
                          <input type="text" value={form['phone_number']} name="phone_number" onChange={formSet} className="px-4 py-4 text-blueGray-600 relative bg-white rounded text-sm border border-gray-400 outline-none focus:outline-none focus:ring"/>
                        </div>
                        {errors.phone_number && <span className="text-red-500 text-sm">{errors['phone_number']}</span>}
                    </div>
                    <div className="col-span-1 bg-gray-200 bg-gray-200 p-8 border-b-2 border-gray-300">
                      <span className="font-bold">E-mail</span><span className="text-red-500">*</span>
                    </div>
                    <div className="col-span-3 p-8 bg-white border-b-2 border-gray-300 inline-flex">
                        <div className="mb-3 pt-0">
                          <input type="text"
                          value={form['email']}
                          name="email"
                          onChange={formSet}
                          className="px-4 py-4 text-blueGray-600 relative bg-white rounded border border-gray-400 outline-none focus:outline-none focus:ring"/>
                        </div>
                        <h1 className="p-3">@</h1>
                        <div className="mb-3 pt-0">
                          <input type="text"
                          value={(form['domain_email']=== "input")? "" : form['domain_email']}
                          name="domain_email"
                          onChange={formSet}
                          disabled = {(form['domain_email']=== "input")? "" : "disabled"}
                          className="px-4 py-4 text-blueGray-600 relative bg-white rounded border border-gray-400 outline-none focus:outline-none focus:ring"/>
                        </div>
                        <select name="domain_email" onChange={formSet} className="ml-3 border border-gray-300 px-4 py-3 rounded focus:outline-none focus:ring">
                          <option value="">Option</option>
                          <option value="naver.com">naver.com</option>
                          <option value="gmail.com">gmail.com</option>
                          <option value="daum.com">daum.net</option>
                          <option value="input">Direct input</option>
                        </select>
                        {/* <p>need to remove invsible</p> */}
                        <button className="text-gray border h-11 ml-3 mt-2 border-gray-300 bg-transparent invisible font-bold py-1 px-6 float-left rounded">
                          Email Authentication
                        </button>
                        {errors.email && <span className="text-red-500 text-sm">{errors['email']}</span>}
                        {errors.domain_email && <span className="text-red-500 text-sm">{errors['domain_email']}</span>}
                    </div>
                    <div className="col-span-1 bg-gray-200 bg-gray-200 p-8 border-b-2 border-gray-300">
                      <span className="font-bold invisible">Email Verification Number</span><span className="text-red-500">*</span>
                    </div>
                    <div className="col-span-3 p-8 bg-white border-b-2 inline-flex border-gray-300">
                      <div className="mb-3 pt-0 invisible">
                        <input type="text"  className="px-4 py-4 text-blueGray-600 relative bg-white rounded border border-gray-400 outline-none focus:outline-none focus:ring"/>
                      </div>
                      <button className="text-gray border h-11 ml-3 mt-2 border-gray-300 bg-transparent font-bold py-1 px-6 float-left invisible rounded">
                        verification code check
                      </button>
                    </div>
                  </div>
                </div>
                <div className="inline-flex gap-3 mt-6">
                    <button className="hover:bg-blue-700 text-white font-bold py-6 px-6 float-left rounded" style={{backgroundColor:"#bdbdbd"}}>
                      Cancellation
                    </button>
                    <button className="hover:bg-blue-700 text-white font-bold py-6 px-6  float-right rounded" onClick={register} style={{backgroundColor:"#194872"}}>
                      Registration
                    </button>
                </div>
            </section>
        </div>
    );
}

export default MemberShip;
