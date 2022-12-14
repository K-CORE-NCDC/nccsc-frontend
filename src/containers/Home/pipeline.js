import React, { useState, useEffect, useContext } from "react";
import { useSelector } from "react-redux";
import cancer_capture from '../../assets/images/sub/cancer_capture.png'
import oncoprint from '../../assets/images/sub/Oncoprint.png'
import scatter_plot from '../../assets/images/sub/scatter_plot.png'
import circos_plot from '../../assets/images/sub/circos_plot.png'
import volcano_plot from '../../assets/images/sub/volcano_plot.png'
import cnv_plot from '../../assets/images/sub/cnv_plot.png'
import heatmap from '../../assets/images/sub/heatmap.png'
import lollipop_plot from '../../assets/images/sub/lollipop_plot.png'
import survival_plot from '../../assets/images/sub/survival_plot.png'
import { Context } from "../../wrapper";

import pipeline from '../../assets/images/ncc_pipeline_kor.png'
import englishPipeline from '../../assets/images/ncc_pipeline_eng.png'

export default function Pipeline() {
  const context = useContext(Context);
  const [boolChartState, setBoolChartState] = useState(true)
  const language = useSelector((state) => state.homeReducer.languageReducer)
  const [sysLang, setSysLang] = useState("kr");
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
  });

  // useEffect(()=>{
  //   if(language === undefined){
  //     setSysLang("kr")
  //   }else{
  //     setSysLang(language)
  //   }
  // },[language])

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
