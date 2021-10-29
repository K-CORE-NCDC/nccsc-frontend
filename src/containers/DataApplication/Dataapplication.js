import React from "react";
import {Link} from "react-router-dom";
import data_apply from '../../assets/images/sub/data_apply.png'
import icon_1 from '../../assets/images/sub/icon_1.png'
import icon_2 from '../../assets/images/sub/icon_2.png'
import icon_3 from '../../assets/images/sub/icon_3.png';
import icon_4 from '../../assets/images/health_info_icon.png';
// import icon_5 from '../../assets/images/ico_calendar2.gif';
import {FormattedMessage} from 'react-intl';


export default function DataApplicationComp() {
    const [openTab, setOpenTab] = React.useState(1);
    return (
      <div>
          <form name="frm1" id="frm1">
              <input type="hidden" name="visitStartDate"/>
              <input type="hidden" name="visitEndDate"/>
              <input type="hidden" name="daNo" value=""/>
              <h6 className="h-tit6 mt20">How to request data</h6>
              <img src="#" style={{"width":"100%"}}/>
              <h6 className="h-tit6 mt20">Basic Information</h6>
              <div className="tbl type2">
                       <div class="fm_area">
                           <dl class="sbj_tit">
                               <dt style={{background:"#eee"}}><strong>Type of affiliation  </strong></dt>
                               <dd>
                                    <div class="radio radio-inline mr20"><input type="radio" name="applAffiliationType" value="GOV" id="applAffiliationType_1" checked="checked"/><label class="label" for="applAffiliationType_1">정부기관</label></div>
                                    <div class="radio radio-inline mr20"><input type="radio" name="applAffiliationType" value="UAR" id="applAffiliationType_2"/><label class="label" for="applAffiliationType_2">대학 및 연구소</label></div>
                                    <div class="radio radio-inline mr20"><input type="radio" name="applAffiliationType" value="UAR" id="applAffiliationType_2"/><label class="label" for="applAffiliationType_2">대학 및 연구소</label></div>
                                    <div class="radio radio-inline mr20"><input type="radio" name="applAffiliationType" value="ETP" id="applAffiliationType_4"/><label class="label" for="applAffiliationType_4">산업체</label></div>
                                    <div class="radio radio-inline mr20"><input type="radio" name="applAffiliationType" value="ETP" id="applAffiliationType_4"/><label class="label" for="applAffiliationType_4">산업체</label></div>
                               </dd>
                           </dl>
                           <dl>
                              <dt>Data utilization objectives</dt>
                              <dd>
                                <div class="radio radio-inline mr20"><input type="radio" name="dataUsesPurpose" value="RSC" id="dataUsesPurpose_1" checked="checked"/><label class="label" for="dataUsesPurpose_1">연구</label></div>
                                <div class="radio radio-inline mr20"><input type="radio" name="dataUsesPurpose" value="BSN" id="dataUsesPurpose_2"/><label class="label" for="dataUsesPurpose_2">사업</label></div>
                                <div class="radio radio-inline mr20"><input type="radio" name="dataUsesPurpose" value=" CLN" id="dataUsesPurpose_3"/><label class="label" for="dataUsesPurpose_3">진료</label></div>
                                <div class="radio radio-inline mr20"><input type="radio" name="dataUsesPurpose" value="ETC" id="dataUsesPurpose_4"/><label class="label" for="dataUsesPurpose_4">기타</label></div>
                              </dd>
                           </dl>
                           <dl>
                              <dt>Research and analysis type</dt>
                              <dd>Using the National Cancer Center's Ambic Data Analysis Room</dd>
                           </dl>
                       </div>
              </div>

              <h6 className="h-tit6 mt20">Booking for Ambic Data Analysis Room</h6>
              <div className="tbl type2">
                <div className="fm_area">
                  <dl className="sbj_tit">
                    <dt>Study Period</dt>
                    <dd className="date">
                      <div class="dateWrap">
                          <div class="date-inpt"><input type="text" name="researchStartDate" class="date1 hasDatepicker w200" size="12" id="researchStartDate" readonly="readonly" value="" title="Research period start date"/></div>
                            <span style={{"padding": "0 10px"}}>~</span>
                            <div class="date-inpt"><input type="text" name="researchEndDate" class="date1 hasDatepicker w200" size="12" id="researchEndDate" readonly="readonly" value="" title="End date of research period"/></div>
                          </div>
                      </dd>
                  </dl>
                  <dl>
                     <dt>Period of use</dt>
                     <dd class="date">
                         <div class="dateWrap">
                           <div class="date-inpt"><input type="text" name="useStartDate" class="date1 hasDatepicker w200" size="12" id="useStartDate" readonly="readonly" value="" title="Usage period start date"/></div>
                            <span style={{"padding": "0 10px"}}>~</span>
                           <div class="date-inpt"><input type="text" name="useEndDate" class="date1 hasDatepicker w200" size="12" id="useEndDate" readonly="readonly" value="" title="End date of use period"/></div>
                         </div>
                     </dd>
                 </dl>
                 <dl>
                    <dt>Visit date</dt>
                    <dd class="date">
                        <div class="dateWrap">
                          <div class="date-inpt"><input type="text" name="visit_date" class="date1 hasDatepicker w200" size="12" id="visit_date" readonly="readonly" value="" title="Visit date"/></div>
                        </div>
                    </dd>
                </dl>
                <dl>
                   <dt>Visit time</dt>
                   <dd>
                       <input type="time" name="visit_start_time" id="visit_start_time" placeholder="" class="sbj_tit w110" value="09:00" min="09:00" max="17:00" pattern="[0-9]{2}:[0,3]{2}" title="Visit Start Time"/>
                       <span style={{"padding": "0 10px"}}>~</span>
                       <input type="time" name="visit_end_time" id="visit_end_time" placeholder="" class="sbj_tit w110" value="17:00" min="09:00" max="17:00" pattern="[0-9]{2}:[0,3]{2}" title="Visit end time"/>
                   </dd>
                 </dl>
                 <dl>
                    <dt>Visitor</dt>
                    <dd><input type="text" name="visitor" placeholder="" class="sbj_tit w200" value="" title="Visitor"/></dd>
                </dl>
                </div>
                <b style={{"color":"#da0404"}}>※ Automatically discard data one month after the end of the period</b>
              </div>
               <h6 class="h-tit6 mt20">Upload File</h6>
               <div class="tbl type2">
                  <div class="fm_area">
                    <dl class="sbj_tit">
                      <dt>Upload File</dt>
                      <dd class="file_up">
                        <label for="fileupload" class="file_btn btn-color3"><img src="#" alt="File Icon"/>Attach File</label>
                        <input type="hidden" name="frmName" value="frm1" />

                      </dd>
                    </dl>
                  </div>
               </div>
          </form>
      </div>
    )
}

// <img src="#" style="width:100%;"/>

// <!-- <a href="#" class="btn btn-color2 btn-md div_close">닫기</a> -->

// <!-- <button class="plus_btn btn-color3"><img src="/images/www/sub/plus_btn.png" alt="플러스아이콘"></button> -->
