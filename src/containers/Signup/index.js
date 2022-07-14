import React, { useState, useEffect } from 'react';
import MemberShip from './MemberShip'
import TermsOfUse from './TermsOfUse'
import SigninComplete from './SigninComplete';
import './SignupStyles.css'
import {
  CheckCircleIcon
} from '@heroicons/react/outline'

const SignupComponent = () => {
  const [currentStep, setcurrentStep] = useState(1);
  const [widthofProgress, setwidthofprogress] = useState(0);
  const [Check, setCheck] = useState(0);
  useEffect(() => {
    console.log("current step", currentStep);
    console.log(widthofProgress);
    if (currentStep == 0) {
      setwidthofprogress(0);
      console.log(widthofProgress);
    } else if (currentStep === 1) {
      setwidthofprogress(50);
      console.log(widthofProgress);
    } else if (currentStep == 2) {
      setwidthofprogress(100);
    }
  },[currentStep]);

  function showStep(step) {
    switch (step) {
      case 0:
        return (
          <TermsOfUse step={currentStep} changestep={changeStep}></TermsOfUse>
        );
      case 1:
        return (
          <MemberShip step={currentStep} changestep={changeStep}></MemberShip>
        );
      case 2:
        return (
         <SigninComplete step={currentStep} changestep={changeStep}></SigninComplete>
        );
    }
  }
  function changeStep(step) {
    setcurrentStep(step);
  }

  return (
    <div>
      <div className="Layout">
        <div className={`progressbar`}>
          <div
            className={"progress"}
            style={{
              width: `${widthofProgress}%`
            }}
            id="Member terms"
          ></div>

          <div
            className={`progress-step ${
              currentStep >= 0 ? "progress-step-active" : ""
            }`}
            data-title="Terms"
          >
            {currentStep > 0 && (
              <CheckCircleIcon></CheckCircleIcon>
            )}
            {currentStep == 0 && (
              <div className="stepNumber displayNumber">
                <span>1</span>
              </div>
            )}
          </div>

          <div
            className={`progress-step ${
              currentStep >= 1 ? "progress-step-active" : ""
            }`}
            data-title="Registration"
          >
            {currentStep <= 1 && (
              <div className="stepNumber displayNumber">
                <span>2</span>
              </div>
            )}
            {currentStep > 1 && (
               <CheckCircleIcon></CheckCircleIcon>
            )}
          </div>

          <div
            className={`progress-step ${
              currentStep >= 2 ? "progress-step-active" : ""
            }`}
            data-title="Approval"
          >
            {/* { <CheckCircleIcon className="checkmark fa-solid fa-check "></CheckCircleIcon>} */}
            <div className="stepNumber displayNumber">
              <span>3</span>
            </div>
          </div>
        </div>
      </div>
      {showStep(currentStep)}
    </div>
  );
}

export default SignupComponent;
