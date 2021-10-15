import React from "react";
import {Link} from "react-router-dom";
import data_apply from '../../assets/images/sub/data_apply.png'
import icon_1 from '../../assets/images/sub/icon_1.png'
import icon_2 from '../../assets/images/sub/icon_2.png'
import icon_3 from '../../assets/images/sub/icon_3.png'


export default function MaterialGuidance() {
    const [openTab, setOpenTab] = React.useState(1);
    return (
      <div>
        <div class="left wp25 db_list_wrap">
             <ul class="db">
               <li class="db_tit1">DB List</li>
               <li class="db_tit2">Cancer Proteogenomic DB</li>
               <li class="db_list db_list1"><a href="#">YBC Dataset</a></li>
             </ul>
         </div>
      </div>
    )
}
