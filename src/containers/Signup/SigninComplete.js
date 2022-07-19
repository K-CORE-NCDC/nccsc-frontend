import React from "react";
import config from "../../config";
import { CheckCircleIcon } from "@heroicons/react/outline";

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
              <CheckCircleIcon
                fill="green"
                className="m-auto w-64"
              ></CheckCircleIcon>
              <div className="my-5">
                <p className="text-center py-5">
                  K-CORE 회원가입이 완료되었 습니다.
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
