import React, { useState, useEffect } from 'react'
import {
  findPassword
} from "../../actions/api_actions";
import { useSelector, useDispatch } from "react-redux";
function FindPassword() {

  const [status, setstatus] = useState("")
  const dispatch = useDispatch();
  let findPasswordfunction = () => {
    let user_name_is = document.getElementById('FindPassword').value
    if (user_name_is === "") {
      setstatus('Please Enter Your User ID');
    }
    else {
      dispatch(findPassword("POST", { 'username': user_name_is }));
    }
  }

  const change_password_status = useSelector((data) => data.homeReducer.find_password);
  useEffect(() => {
    console.log("change_password_status", change_password_status);
    change_password_status && setstatus(change_password_status.status)
  }, [change_password_status])

  return (
    <div>
      <div className='m-5'>

        <h1 className='text-center text-7xl font-sans'>Forget Password</h1>
        <div className="mt-10 flex flex-col items-center ">
          <div>
            <label className='mx-5  text-4xl' htmlFor="FindPassword">Enter User ID:</label>
            <input
              type="text"
              id="FindPassword"
              name="findpassword"
              className={
                // (checkUserId ? " border-red-400 " : "  ") +
                "px-4 py-4 text-blueGray-600 relative bg-white rounded border border-gray-400 outline-none focus:outline-none focus:ring"
              }
            />
          </div>
          {status && <p className='ml-32'>{status}</p>}
          <div className='rounded-sm'>
            <button type='submit' className='text-white font-bold py-6 px-6 rounded bg-NccBlue-700 mt-8' onClick={findPasswordfunction}>Reset Password</button>
          </div>
        </div>

      </div>
    </div>
  )
}

export default FindPassword