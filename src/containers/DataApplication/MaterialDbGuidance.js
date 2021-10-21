import React from "react";
import {Link} from "react-router-dom";
import data_apply from '../../assets/images/sub/data_apply.png'
import icon_1 from '../../assets/images/sub/icon_1.png'
import icon_2 from '../../assets/images/sub/icon_2.png'
import icon_3 from '../../assets/images/sub/icon_3.png';
import icon_4 from '../../assets/images/health_info_icon.png';
import {FormattedMessage} from 'react-intl';


export default function MaterialGuidance() {
    const [openTab, setOpenTab] = React.useState(1);
    return (
      <div>
        <div class="left wp25 db_list_wrap">
             <ul class="db">
               <li class="db_tit1"><FormattedMessage  id = "DB List" defaultMessage='DB List'/></li>
               <li class="db_tit2"><FormattedMessage  id = "Cancer Proteogenomic DB" defaultMessage='Cancer Proteogenomic DB'/></li>
               <li class="db_list db_list1"><a href="#"><FormattedMessage  id = "YBC Dataset" defaultMessage='YBC Dataset'/></a></li>
             </ul>
         </div>
         <div class="right wp75 db_list_con db_list_con1">
            <h6 class="h-tit6 mt20">Cancer Proteogenomic DB > YBC Dataset</h6>
            <div class="tab_content">
                <ul>
                	<li><span>Criteria </span>Among patients with early-onset breast cancer under 40 years of age</li>
                	<li><span>Target</span>126 people</li>
                	<li><span>Year</span>2013~2021</li>
                	<li><span>content</span>Integrate and link DB of genomic and proteomic and clinical data of Korean early-onset breast cancer patients</li>
                </ul>
            </div>
            <h6 class="h-tit6 mt20">Health Information Table</h6>
            <div class="iconbox left">
            	<img src={icon_4} alt='건강정보 테이블  아이콘'/>
            </div>
            <div class="tbl type2 tablebox left">
                     <div class="fm_area border-t-2 border-gray-600">
                         <dl class="sbj_tit">
                             <dt style={{background:"#eee"}}><strong>content</strong></dt>
                             <dd>Other health information for the patient</dd>
                         </dl>
                         <dl>
                             <dt style={{background:"#eee"}}><strong>variable</strong></dt>
                             <dd>twelve</dd>
                         </dl>
                     </div>
              </div>
            </div>
      </div>
    )
}
