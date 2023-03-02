import React, { useState, useEffect, useContext } from "react";
import { Context } from "../../wrapper";

import pipeline from '../../assets/images/ncc_pipeline_kor.png'
import englishPipeline from '../../assets/images/ncc_pipeline_eng.png'

export default function Pipeline() {
  const context = useContext(Context);
  const [koreanlanguage, setKoreanlanguage] = useState(false);
  const [Englishlanguage, setEnglishlanguage] = useState(true);
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
    <div className="cont_wrap my-10">
      <div className="flex justify-center">
        <div className="pl-8 pr-8 w-3/5">
          {/* {sysLang === "kr"?<img src={pipeline} />:""} */}

          {koreanlanguage && (
            <div >
              <img src={pipeline} alt="pipeline" />
            </div>
          )}
          {Englishlanguage && (
            <div >
              <img src={englishPipeline} alt="english pipeline" />
            </div>
          )}

        </div>
      </div>
    </div>
  )
}
