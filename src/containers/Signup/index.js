import React, { useState, useEffect, useContext } from "react";
import MemberShip from "./MemberShip";
import TermsandConditions from "./TermsandConditions";
import SigninComplete from "./SigninComplete";
import "../../styles/SignupStyles.css";
import { CheckCircleIcon } from "@heroicons/react/outline";
import { Context } from "../../wrapper";
const SignupComponent = () => {
  const [currentStep, setcurrentStep] = useState(0);
  const [widthofProgress, setwidthofprogress] = useState(0);

  const [koreanlanguage, setKoreanlanguage] = useState(false);
  const [Englishlanguage, setEnglishlanguage] = useState(true);
  const context = useContext(Context);
  
  useEffect(() => {
    if (context["locale"] === "kr-KO") {
      setKoreanlanguage(true);
      setEnglishlanguage(false);
    } else {
      setKoreanlanguage(false);
      setEnglishlanguage(true);
    }
  },[context]);

  useEffect(() => {
    if (currentStep === 0) {
      setwidthofprogress(0);
    } else if (currentStep === 1) {
      setwidthofprogress(50);
    } else if (currentStep === 2) {
      setwidthofprogress(100);
    }
  }, [currentStep]);

  let showStep = (step) => {
    switch (step) {
      case 0:
        return (
          <TermsandConditions step={currentStep} changestep={changeStep}></TermsandConditions>
        );
      case 1:
        return (
          <MemberShip step={currentStep} changestep={changeStep}></MemberShip>
        );
      case 2:
        return (
          <SigninComplete
            step={currentStep}
            changestep={changeStep}
          ></SigninComplete>
        );
      default:
        return (
          <TermsandConditions step={currentStep} changestep={changeStep}></TermsandConditions>
        );
    }
  };

  let changeStep = (step) => {
    setcurrentStep(step);
  };

  return (
    <div>
      <div className="Layout">
        <div className={`progressbar`}>
          <div
            className={"progress"}
            style={{
              width: `${widthofProgress}%`,
            }}
            id="Member terms"
          ></div>

          <div
            className={`progress-step ${currentStep >= 0 ? "progress-step-active" : ""
              }`}
            data-title={koreanlanguage ? '이용약관' : 'Terms'}
          >
            {currentStep > 0 && <CheckCircleIcon></CheckCircleIcon>}
            {currentStep === 0 && (
              <div className="stepNumber displayNumber">
                <span>1</span>
              </div>
            )}
          </div>

          <div
            className={`progress-step ${currentStep >= 1 ? "progress-step-active" : ""
              }`}
              data-title={koreanlanguage ? '등록' : 'Registration'}
          >
            {currentStep <= 1 && (
              <div className="stepNumber displayNumber">
                <span>2</span>
              </div>
            )}
            {currentStep > 1 && <CheckCircleIcon></CheckCircleIcon>}
          </div>

          <div
            className={`progress-step ${currentStep >= 2 ? "progress-step-active" : ""
              }`}
              data-title={koreanlanguage ? '승인' : 'Approval'}
          >
            <div className="stepNumber displayNumber">
              <span>3</span>
            </div>
          </div>
        </div>
      </div>
      {showStep(currentStep)}
    </div>
  );
};

export default SignupComponent;
