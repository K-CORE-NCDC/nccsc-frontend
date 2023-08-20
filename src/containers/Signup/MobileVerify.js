import React, { useState, useEffect } from 'react';
import logo from '../../assets/images/Left_up.png';
import { useDispatch } from 'react-redux';
import { verifyEncodeData } from '../../actions/api_actions';

const MobileVerify = () => {
  const [encodeData, SetEncodeData] = useState('');
  const [status] = useState(false);
  const [verify] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    let location = window.location;
    const useQuery = new URLSearchParams(location.search);
    const EncodeData = useQuery.get('EncodeData');
    SetEncodeData(EncodeData);
  }, []);

  useEffect(() => {
    if (encodeData !== '') {
      let data = 'EncodeData=' + encodeData;

      dispatch(verifyEncodeData('GET', data));
    }
  }, [encodeData]);

  return (
    <>
      {!verify && (
        <div className="grid  place-items-center bg-main-blue m-0 w-10/12 mx-auto p-12">
          <p>
            <img alt="brand-logo" src={logo} />
          </p>
          <h2 className="mt-5 text-white">Verifying Please Wait....</h2>
        </div>
      )}
      {encodeData && status && (
        <div className="grid  place-items-center bg-main-blue m-0 w-10/12 mx-auto p-12">
          <p>
            <img alt="brand-logo" src={logo} />
          </p>
          <p className="mt-5">
            <svg width="36" height="36" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
              <path
                fill="#70bf2b"
                d="M1412 734q0-28-18-46l-91-90q-19-19-45-19t-45 19l-408 407-226-226q-19-19-45-19t-45 19l-91 90q-18 18-18 46 0 27 18 45l362 362q19 19 45 19 27 0 46-19l543-543q18-18 18-45zm252 162q0 209-103 385.5t-279.5 279.5-385.5 103-385.5-103-279.5-279.5-103-385.5 103-385.5 279.5-279.5 385.5-103 385.5 103 279.5 279.5 103 385.5z"
              />
            </svg>
          </p>
          <h2 className="mt-5 text-white">Mobile Verified Successfully</h2>
        </div>
      )}
    </>
  );
};
export default MobileVerify;
