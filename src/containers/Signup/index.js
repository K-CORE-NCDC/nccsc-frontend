import React, { useState, useEffect } from 'react';
import MemberShip from './MemberShip'
import TermsOfUse from './TermsOfUse'

const SignupComponent = () => {
    const [nextstep, setNextStep] = useState(2)
    const updateStep_ = (star) => {
      let step = nextstep
      setNextStep( step + 1)
    }

    useEffect(()=>{

    },[nextstep])

    const components = (nextstep) => {
      switch (nextstep) {
          case 1:
            return (
              <TermsOfUse updateStep={updateStep_}/>
            )
          case 2:
            return (
              <MemberShip />
            )
          default:
             // do nothing
          }
    }


    return (
        <div>
            <div className="flex flex-row justify-center items-center gap-3 mt-6">
              <div className={"p-6 text-5xl font-semibold "+(nextstep === 1?"border-b-2 border-blue-800":"border-b-2 border-gray-300")}>
                STEP 01
              </div>
              <div className={"p-6 text-5xl font-semibold "+(nextstep === 2?"border-b-2 border-blue-800":"border-b-2 border-gray-300")}>
                STEP 02
              </div>
            </div>
            <div className="mt-5">
            {components(nextstep)}
            </div>
        </div>
    );
}

export default SignupComponent;
