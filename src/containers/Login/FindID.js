import React, { useState, useEffect } from 'react'
import {
  findID
} from "../../actions/api_actions";
import { useSelector, useDispatch } from "react-redux";

function FindID() {
  const [status, setstatus] = useState("")
  const dispatch = useDispatch();
  let findIDfunction = () => {
    let email_id_is = document.getElementById('FindID').value
    if (email_id_is === "") {
      setstatus('Please Enter Your Email');
    }
    else {
      dispatch(findID("POST", { 'email_id': email_id_is }));
    }
  }

  const find_id = useSelector((data) => data.homeReducer.find_id);
  useEffect(() => {
    console.log("find_id", find_id);
    find_id && setstatus(find_id.status)
  }, [find_id])

  return (
    <div>
      <div className='m-5'>

        <h1 className='text-center text-7xl font-sans'>Forget ID</h1>
        <div className="mt-10 flex flex-col items-center ">
          <div>
            <label className='mx-5  text-4xl' htmlFor="FindID">Enter Email:</label>
            <input
              type="text"
              id="FindID"
              name="findid"
              className={
                // (checkUserId ? " border-red-400 " : "  ") +
                "px-4 py-4 text-blueGray-600 relative bg-white rounded border border-gray-400 outline-none focus:outline-none focus:ring"
              }
            />
          </div>
          {status && <p className='ml-32'>{status}</p>}
          <div className='rounded-sm'>
            <button type='submit' className='text-white font-bold py-6 px-6 rounded bg-NccBlue-700 mt-8' onClick={findIDfunction}>Find ID</button>
          </div>
        </div>

      </div>
    </div>
  )
}

export default FindID