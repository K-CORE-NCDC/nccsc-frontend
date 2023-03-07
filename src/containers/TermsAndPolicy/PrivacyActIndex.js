import React, { useState, useContext, useEffect } from "react";
import { Context } from "../../wrapper";
import EnglishPrivacyAct from "./EnglishPrivacyAct";
import Koreanprivacyact from "./KoreanPrivacyAct";
function PrivacyActIndex() {
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
           <Koreanprivacyact></Koreanprivacyact>
        </div>
      )}
      {Englishlanguage && (
        <div>
         <EnglishPrivacyAct></EnglishPrivacyAct>
        </div>
      )}
    </div>
  );
}

export default PrivacyActIndex;
