import React, { useState } from 'react';

const MemberShip = () => {
    return (
        <div>
            <section className="mt-10 flex flex-col items-center justify-center">
                <div>
                    <span className="text-6xl font-bold text-gray-800">Join membership</span>
                </div>
                <div className="my-14">
                    <h1 className="font-light text-3xl text-gray-800">Please use the service after registering as a member.</h1>
                </div>
                <div className="border-t-2 border-gray-600 w-3/5">
                  <div className="grid grid-cols-4">
                    <div className="col-span-1 bg-gray-200 bg-gray-200 p-10 border-b-2 border-gray-300">
                      <text className="font-bold">ID</text>
                      <span className="text-red-500">*</span>
                    </div>
                    <div className="col-span-3 p-8 bg-white border-b-2 border-gray-300 inline-flex gap-3">
                      <div className="mb-3 pt-0">
                        <input type="text"  className="px-4 py-4 text-blueGray-600 relative bg-white rounded text-sm border border-gray-400 outline-none focus:outline-none focus:ring"/>
                      </div>
                      <button className="hover:bg-blue-700 text-white h-11 mt-2 font-bold py-1 px-6 float-left rounded" style={{backgroundColor:"#bdbdbd"}}>
                        confirm repetition
                      </button>
                    </div>
                    <div className="col-span-1 bg-gray-200 bg-gray-200 p-8 border-b-2 border-gray-300">
                      <span className="font-bold">Password</span><span className="text-red-500">*</span>
                    </div>
                    <div className="col-span-3 p-8 bg-white border-b-2 border-gray-300">
                        <div className="mb-3 pt-0">
                          <input type="text"  className="px-4 py-4 text-blueGray-600 relative bg-white rounded text-sm border border-gray-400 outline-none focus:outline-none focus:ring"/>
                        </div>
                        <text className="text-red-500 text-sm">* It is less than 10-20 digits and is stored encrypted.</text>
                    </div>
                    <div className="col-span-1 bg-gray-200 bg-gray-200 p-8 border-b-2 border-gray-300">
                      <span className="font-bold">Verify password</span><span className="text-red-500">*</span>
                    </div>
                    <div className="col-span-3 p-8 bg-white border-b-2 border-gray-300">
                      <div className="mb-3 pt-0">
                        <input type="text"  className="px-4 py-4 text-blueGray-600 relative bg-white rounded text-sm border border-gray-400 outline-none focus:outline-none focus:ring"/>
                      </div>
                    </div>
                    <div className="col-span-1 bg-gray-200 bg-gray-200 p-8 border-b-2 border-gray-300">
                      <span className="font-bold">Name</span><span className="text-red-500">*</span>
                    </div>
                    <div className="col-span-3 p-8 bg-white border-b-2 border-gray-300">
                        <div className="mb-3 pt-0">
                          <input type="text"  className="px-4 py-4 text-blueGray-600 relative bg-white rounded text-sm border border-gray-400 outline-none focus:outline-none focus:ring"/>
                        </div>
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
                          <input type="text"  className="px-4 py-4 text-blueGray-600 relative bg-white rounded text-sm border border-gray-400 outline-none focus:outline-none focus:ring"/>
                        </div>
                    </div>
                    <div className="col-span-1 bg-gray-200 bg-gray-200 p-8 border-b-2 border-gray-300">
                      <span className="font-bold">E-mail</span><span className="text-red-500">*</span>
                    </div>
                    <div className="col-span-3 p-8 bg-white border-b-2 border-gray-300 inline-flex">
                        <div className="mb-3 pt-0">
                          <input type="text"  className="px-4 py-4 text-blueGray-600 relative bg-white rounded text-sm border border-gray-400 outline-none focus:outline-none focus:ring"/>
                        </div>
                        <h1 className="p-3">@</h1>
                        <div className="mb-3 pt-0">
                          <input type="text"  className="px-4 py-4 text-blueGray-600 relative bg-white rounded text-sm border border-gray-400 outline-none focus:outline-none focus:ring"/>
                        </div>
                        <select className="ml-3 border border-gray-300 px-4 py-3 rounded focus:outline-none focus:ring">
                          <option>Option</option>
                          <option>naver.com</option>
                          <option>daum.net</option>
                          <option>Direct input</option>
                        </select>
                        <button className="text-gray border h-11 ml-3 mt-2 border-gray-300 bg-transparent font-bold py-1 px-6 float-left rounded">
                          Email Authentication
                        </button>
                    </div>
                    <div className="col-span-1 bg-gray-200 bg-gray-200 p-8 border-b-2 border-gray-300">
                      <span className="font-bold">Email Verification Number</span><span className="text-red-500">*</span>
                    </div>
                    <div className="col-span-3 p-8 bg-white border-b-2 inline-flex border-gray-300">
                      <div className="mb-3 pt-0">
                        <input type="text"  className="px-4 py-4 text-blueGray-600 relative bg-white rounded text-sm border border-gray-400 outline-none focus:outline-none focus:ring"/>
                      </div>
                      <button className="text-gray border h-11 ml-3 mt-2 border-gray-300 bg-transparent font-bold py-1 px-6 float-left rounded">
                        verification code check
                      </button>
                    </div>
                  </div>
                </div>
                <div className="inline-flex gap-3 mt-6">
                    <button className="hover:bg-blue-700 text-white font-bold py-6 px-6 float-left rounded" style={{backgroundColor:"#bdbdbd"}}>
                      Cancellation
                    </button>
                    <button className="hover:bg-blue-700 text-white font-bold py-6 px-6  float-right rounded" style={{backgroundColor:"#194872"}}>
                      Registration
                    </button>
                </div>
            </section>
        </div>
    );
}

export default MemberShip;
