import React from "react";
import config from "../../config";
import { CheckCircleIcon } from "@heroicons/react/outline";
import Success from '../../assets/images/logoncc.png'


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
              <img src={Success} className="block mx-auto" alt="Registration Success" width="25%" height="100px"></img>
             
              <div className="">
                <p className="text-center py-2">
                  K-CORE 회원가입이 완료되었습니다.
                </p>
                <p className="text-center py-5">
                  관리자 승인 후, 이용 가능합니다.
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
