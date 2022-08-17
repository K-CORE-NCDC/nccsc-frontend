import React, { useState, useContext, useEffect } from "react";
import { Context } from "../../wrapper";
import TermsOfUseKorean from "./TermsOfUseKorean";
import TermsOfUseEnglish from "./TermsOfUseEnglish";
function TermsandConditions({currentstep,changestep}) {
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
  return (
    <div>
    {koreanlanguage && (
      <div>
         <TermsOfUseKorean  step={currentstep} changestep={changestep}></TermsOfUseKorean>
      </div>
    )}
    {Englishlanguage && (
      <div>
       <TermsOfUseEnglish step={currentstep} changestep={changestep}></TermsOfUseEnglish>
      </div>
    )}
  </div>
  )
}

export default TermsandConditions