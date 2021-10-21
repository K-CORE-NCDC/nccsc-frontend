import React from "react";
import {Link} from "react-router-dom";
import data_apply from '../../assets/images/sub/data_apply.png'
import icon_1 from '../../assets/images/sub/icon_1.png'
import icon_2 from '../../assets/images/sub/icon_2.png'
import icon_3 from '../../assets/images/sub/icon_3.png'
import DataDeliverGuidance from "./DataDeliverGuidance"
import MaterialGuidance from "./MaterialDbGuidance";
import DataApplicationComp from "./Dataapplication";
import {FormattedMessage} from 'react-intl';


<FormattedMessage  id = "Cir_choose_sample" defaultMessage='Choose a Sample'/>
export default function DataApplication() {
    const [openTab, setOpenTab] = React.useState(1);
    return (
      <div className="cont_wrap">
        <div className="lay_1 clear align-center sub_max">
              <ul className="tab_title_main tab_responsive mt30" data-aos="fade-left" aos-easing="ease-in-sine" aos-duration="3000">
                   <li className={openTab === 1?"on":""}><p onClick={()=>setOpenTab(1)}><FormattedMessage  id = "Data delivery guidance" defaultMessage='Data delivery guidance'/></p></li>
                   <li className={openTab === 2?"on":""}><p onClick={()=>setOpenTab(2)}><FormattedMessage  id = "Material DB Guidance" defaultMessage='Material DB Guidance'/></p></li>
                   <li className={openTab === 3?"on":""}><p onClick={()=>setOpenTab(3)}><FormattedMessage  id = "Data application" defaultMessage='Data application'/></p></li>
              </ul>
              <div className="tab_cont">
                <div class="on" style={{display:openTab === 1?"block":"none"}}>
                  <DataDeliverGuidance/>
                </div>
                <div style={{display:openTab === 2?"block":"none"}}>
                  <MaterialGuidance/>
                </div>
                <div style={{display:openTab === 3?"block":"none"}}>
                  <DataApplicationComp/>
                </div>
              </div>
        </div>

      </div>
    )
}
