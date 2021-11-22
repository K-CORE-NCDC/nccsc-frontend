import React, { useState,useEffect } from "react";
import {useSelector} from "react-redux";
import cancer_capture from '../../assets/images/sub/cancer_capture.png'
import oncoprint from '../../assets/images/sub/Oncoprint.png'
import scatter_plot from '../../assets/images/sub/scatter_plot.png'
import circos_plot from '../../assets/images/sub/circos_plot.png'
import volcano_plot from '../../assets/images/sub/volcano_plot.png'
import cnv_plot from '../../assets/images/sub/cnv_plot.png'
import heatmap from '../../assets/images/sub/heatmap.png'
import lollipop_plot from '../../assets/images/sub/lollipop_plot.png'
import survival_plot from '../../assets/images/sub/survival_plot.png'

import pipeline from '../../assets/images/sub/pipeline.png'

export default function Pipeline() {
    const [boolChartState, setBoolChartState] = useState(true)
    const language = useSelector((state)=>state.homeReducer.languageReducer)
    const [sysLang, setSysLang] = useState("kr");

    useEffect(()=>{
      if(language === undefined){
        setSysLang("kr")
      }else{
        setSysLang(language)
      }
    },[language])

    console.log(language)
    return (
        <div className="cont_wrap my-10">
          <div className="flex justify-center">
            <div className="pl-8 pr-8 w-3/5">
              {sysLang === "kr"?<img src={pipeline} />:""}
            </div>
          </div>
        </div>
    )
}
