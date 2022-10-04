import tit_bar2 from '../../assets/images/sub/tit_bar2.gif'
import React, { useState } from "react";
import s1 from '../../assets/images/business_tab3.png';
import s2 from '../../assets/images/intro_at1.png'
import s3 from '../../assets/images/intro_at2.png';
import {FormattedMessage} from 'react-intl';


export default function Introduce() {
  const [tabs, setTabs] = useState(1);

    return(
        <section className="intro_wrap">
          <h1><FormattedMessage  id = {"Project for building a healthcare big data showcase"} defaultMessage={"Project for building a healthcare big data showcase"}/></h1>
          <ul className="intro_tab tab_title_main">
              <li className={tabs === 1?"on":"" }><a onClick={()=>setTabs(1)}>
                <FormattedMessage  id = {"Project introduction"} defaultMessage={"Project introduction"}/></a>
              </li>
              <li className={tabs === 2?"on":"" } style={{width: '-webkit-fill-available'}}>
              <a onClick={()=>setTabs(2)}>
                <FormattedMessage  id = {"Cancer Proteogenomics Working Group"} defaultMessage={"Cancer Proteogenomics Working Group"}/>
              </a></li>
              <li className={tabs === 3?"on":"" }>
                <a onClick={()=>setTabs(3)}><FormattedMessage  id = {"DATA introduction"} defaultMessage={"DATA introduction"}/></a>
              </li>
          </ul>

          <ul className="at">
            <li className={tabs === 1?"at1 on":"at1"}>
              <div className="grid grid-cols-3 gap-2">
                  <div className="col-span-2"><img className="w-3/5" src={s2} alt=""/></div>
                  <div className="txtbox">
                    <h3><b><FormattedMessage  id = {"Pri_1"} defaultMessage={"Project for building a healthcare big data showcase is"}/></b></h3>
                    <p><FormattedMessage  id = {"Pri_2"} defaultMessage={"To implement 'Healthcare big data showcase building project' "}/> <br/>
                            <FormattedMessage  id = {"Pri_3"} defaultMessage={"which is one of the six major healthcare projects promotion strategies"}/> <br/>
                            <FormattedMessage  id = {"Pri_4"} defaultMessage={"in the '4th Industrial Revolution-based Healthcare Development Strategy' "}/> <br/>
                            <FormattedMessage  id = {"Pri_5"} defaultMessage={"by the Presidential 4th Industrial Revolution Committee "}/></p>
                  </div>
              </div>
            </li>

            <li className={tabs === 2?"at2 on":"at2"}>
                <div className="grid grid-cols-3 gap-2">
                  <div className="col-span-2" id="business_imgbox_2"><img className="w-3/5" src={s3} alt=""/></div>
                  <div className="txtbox">
                      <h3><b><FormattedMessage  id = {"Cncr_1"} defaultMessage={"To administrate “Cancer Proteogenomics Working Group”"}/></b></h3>
                      <p><FormattedMessage  id = {"Cncr_2"} defaultMessage={"which is a research group formed  at the National Cancer Center,"}/><br/>
                              <FormattedMessage  id = {"Cncr_3"} defaultMessage={"to discover new biomarkers for cancer through cancer proteogenomics analysis"}/><br/>
                              <FormattedMessage  id = {"Cncr_4"} defaultMessage={"and provide the basis for the development of new treatment technologies based on them."}/><br/>
                      </p>
                  </div>
                </div>
            </li>
            <li className={tabs === 3?"at3 on":"at3"}>
                <div className="imgbox12"><img src={s1} alt=""/></div>
            </li>
        </ul>
        </section>
    )
}
