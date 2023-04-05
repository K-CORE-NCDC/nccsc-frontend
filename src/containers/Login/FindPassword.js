import React, { useState, useEffect } from 'react'
import {
  findPassword,
  clearIDPasswordResetPASSWORD
} from "../../actions/api_actions";
import swal from 'sweetalert';
import { useSelector, useDispatch } from "react-redux";
function FindPassword() {

  const [errorClass, setErrorClass] = useState("");
  const [status, setstatus] = useState("")
  const dispatch = useDispatch();
  const find_password = useSelector((data) => data.homeReducer.findPassword);

  let findPasswordfunction = () => {
    let user_name_is = document.getElementById('FindPassword').value
    if (user_name_is === "") {
      setErrorClass("border-red-500");
      setstatus('Please Enter Your User ID');
    }
    else {
      dispatch(findPassword("POST", { 'username': user_name_is }));
    }
  }


  useEffect(() => {
    find_password && setstatus(find_password.status)
    if (status === "Password Reset Link is sent to your Email") {
      swal("Password Reset Link is sent to your Email", {
        closeOnClickOutside: false
      })
        .then((value) => {
          setTimeout(() => {

            window.location.href = '/login/'
          }, 2000)
        });
    }
  }, [find_password, status])

  useEffect(() => {
    return () => {
      dispatch(clearIDPasswordResetPASSWORD());
    };
  }, []);

  return (
    <div>
      <div>
        <section className="mt-10 flex flex-col items-center justify-center">
          <div>
            <span className="text-7xl font-bold text-gray-800">Reset Password</span>
          </div>
          <div className="my-14">
            <h1 className="font-bold text-3xl text-gray-800">
              Please Enter your User ID.
            </h1>
          </div>

          <div className="my-10">
            <div className="grid grid-cols-3 border-b-2 border-gray-600 pt-12 pb-12">
              <div className="pt-6 pl-48 col-span-1 mr-4">
                <h1 className="font-bold">User ID :</h1>
              </div>
              <div>
                <div className="mb-4 pr-45 col-span-2">
                  <input
                    type="text"
                    id="FindPassword"
                    name="findpassword"
                    className={`shadow appearance-none border rounded-lg w-full py-8 px-5 text-gray-700 leading-tight focus:border-blue-500  w-28 ${errorClass}`}
                    placeholder="Please Enter your User ID"
                  />
                </div>
              </div>
            </div>
            <div className="grid grid-cols-3 pt-12">
              <div className="w-full col-span-3">

                {/* Error Message */}
                {status && <div className='font-bold text-3xl text-red-500 py-4 text-center'>{status}</div>}
                <button
                  onClick={findPasswordfunction}
                  className="bg-blue-500 hover:bg-blue-700 text-white h-28 font-bold py-2 px-4 border border-blue-700 w-full rounded"

                >

                  <span>Submit</span>
                </button>
              </div>
            </div>
          </div>
        </section>


      </div>
    </div>
  )
}

export default FindPassword