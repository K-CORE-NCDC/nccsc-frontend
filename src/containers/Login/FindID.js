import React, { useState, useEffect } from 'react'
import {
  findID,
  clearIDPasswordResetPASSWORD
} from "../../actions/api_actions";
import { useSelector, useDispatch } from "react-redux";
import swal from 'sweetalert';

function FindID() {
  const [status, setstatus] = useState("")
  const [errorClass, setErrorClass] = useState("");
  const dispatch = useDispatch();
  let findIDfunction = () => {

    let email_id_is = document.getElementById('FindID').value
    if (email_id_is === "") {
      setErrorClass("border-red-500");
      setstatus('Please Enter Your Email');
    }
    else {
      dispatch(findID("POST", { 'email_id': email_id_is }));
    }
  }

  const find_id = useSelector((data) => data.homeReducer.find_id);
  if (status === "ID Sent to Your Email") {
    swal("ID is sent to your Email ID.",{
      closeOnClickOutside: false
    })
      .then((value) => {
        setTimeout(()=>{

          window.location.href = '/login/'
        },2000)
      });

  }

  useEffect(() => {
    find_id && setstatus(find_id.status)

  }, [find_id])

  useEffect(() => {
    return () => {
      dispatch(clearIDPasswordResetPASSWORD());
    };
  }, []);




  return (
    <div>
      <section className="mt-10 flex flex-col items-center justify-center">
        <div>
          <span className="text-7xl font-bold text-gray-800">Forget ID</span>
        </div>
        <div className="my-14">
          <h1 className="font-bold text-3xl text-gray-800">
            Please Enter your Email ID to Find your ID.
          </h1>
        </div>

        <div className="my-10">
          <div className="grid grid-cols-3 border-b-2 border-gray-600 pt-12 pb-12">
            <div className="pt-6 pl-48 col-span-1">
              <h1 className="font-bold">Username</h1>
            </div>
            <div>
              <div className="mb-4 pr-45 col-span-2">
                <input
                  type="text"
                  id="FindID"
                  name="findid"
                  className={`shadow appearance-none border rounded-lg w-full py-8 px-5 text-gray-700 leading-tight focus:border-blue-500  w-28 ${errorClass}`}
                  placeholder="Please Enter your email id"
                />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-3 pt-12">
            <div className="w-full col-span-3">
              {/* error */}
              {status && <div className='font-bold text-3xl text-red-500 text-center py-4 text-center'>{status}</div>}
              <button
                onClick={findIDfunction}
                className="bg-blue-500 hover:bg-blue-700 text-white h-28 font-bold py-2 px-4 border border-blue-700 w-full rounded"

              >

                <span>Find ID</span>
              </button>
            </div>
          </div>
        </div>
      </section>


    </div>
  )
}

export default FindID