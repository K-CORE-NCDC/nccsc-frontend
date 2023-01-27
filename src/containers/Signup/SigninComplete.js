import React from "react";
import config from "../../config";
import { CheckCircleIcon } from "@heroicons/react/outline";
import Success from '../../assets/images/KoreanImageNcc.png'


const SigninComplete = () => {
  return (
    <div>
      <div className="my- py-5">
        <section className="mt-10 flex flex-col items-center justify-center">
          <div>
            <div className="bg-white rounded-3xl"
              style={{
                width: "90rem"
              }}
            >
              <div className="py-12">
              <img src={Success} className="block mx-auto" alt="Registration Success" style={{height:'100px'}} ></img>
              </div>
             
              <div className="">
                <p className="text-center py-2">

                 <span > K-CORE 회원가입이 완료되었습니다.</span>
                </p>
                <p className="text-center py-5">
                <span >  관리자 승인 후, 이용 가능합니다. </span>
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default SigninComplete;
