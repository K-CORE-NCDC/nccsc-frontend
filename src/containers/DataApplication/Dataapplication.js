import React from "react";
import {Link} from "react-router-dom";
import data_apply from '../../assets/images/sub/data_apply.png'
import icon_1 from '../../assets/images/sub/icon_1.png'
import icon_2 from '../../assets/images/sub/icon_2.png'
import icon_3 from '../../assets/images/sub/icon_3.png';
import icon_4 from '../../assets/images/health_info_icon.png';
import data_image from '../../assets/images/data-app-1.png';
// import icon_5 from '../../assets/images/ico_calendar2.gif';
import {FormattedMessage} from 'react-intl';


export default function DataApplicationComp() {
    const [openTab, setOpenTab] = React.useState(1);
    return (
      <div>
          <form name="frm1" id="frm1">
              <input type="hidden" name="visitStartDate"/>
              <input type="hidden" name="visitEndDate"/>
              <input type="hidden" name="daNo" />
              <h6 className="h-tit6 mt20">자료요청 방법</h6>
              <img src={data_image} style={{width:'100%'}}/>
              <h6 className="h-tit6 mt20">기본 정보</h6>
              <div className="tbl type2">
                       <div className="fm_area">
                           <dl className="sbj_tit">
                               <dt style={{background:"#eee"}}><strong>신청 소속 유형</strong></dt>
                               <dd>
                                    <div className="radio radio-inline mr20">
                                      <input type="radio" name="applAffiliationType" value="GOV" id="applAffiliationType_1" checked="checked"/>
                                      <label className="label" for="applAffiliationType_1">정부기관</label>
                                    </div>
                                    <div className="radio radio-inline mr20"><input type="radio" name="applAffiliationType" value="UAR" id="applAffiliationType_2"/><label className="label" for="applAffiliationType_2">대학 및 연구소</label></div>
                                    <div className="radio radio-inline mr20"><input type="radio" name="applAffiliationType" value="UAR" id="applAffiliationType_2"/><label className="label" for="applAffiliationType_2">대학 및 연구소</label></div>
                                    <div className="radio radio-inline mr20"><input type="radio" name="applAffiliationType" value="ETP" id="applAffiliationType_4"/><label className="label" for="applAffiliationType_4">산업체</label></div>
                                    <div className="radio radio-inline mr20"><input type="radio" name="applAffiliationType" value="ETP" id="applAffiliationType_4"/><label className="label" for="applAffiliationType_4">산업체</label></div>
                               </dd>
                           </dl>
                           <dl>
                              <dt>자료 활용 목적</dt>
                              <dd>
                                <div className="radio radio-inline mr20"><input type="radio" name="dataUsesPurpose" value="RSC" id="dataUsesPurpose_1" checked="checked"/><label className="label" for="dataUsesPurpose_1">연구</label></div>
                                <div className="radio radio-inline mr20"><input type="radio" name="dataUsesPurpose" value="BSN" id="dataUsesPurpose_2"/><label className="label" for="dataUsesPurpose_2">사업</label></div>
                                <div className="radio radio-inline mr20"><input type="radio" name="dataUsesPurpose" value=" CLN" id="dataUsesPurpose_3"/><label className="label" for="dataUsesPurpose_3">진료</label></div>
                                <div className="radio radio-inline mr20"><input type="radio" name="dataUsesPurpose" value="ETC" id="dataUsesPurpose_4"/><label className="label" for="dataUsesPurpose_4">기타</label></div>
                              </dd>
                           </dl>
                           <dl>
                              <dt>연구분석형태</dt>
                              <dd>국립암센터 암빅데이터분석실이용</dd>
                           </dl>
                       </div>
              </div>

              <h6 className="h-tit6 mt20">암빅데이터분석실 이용 예약</h6>
              <div className="tbl type2">
                <div className="fm_area">
                  <dl className="sbj_tit">
                    <dt>연구기간</dt>
                    <dd className="date">
                      <div className="dateWrap">
                          <div className="date-inpt"><input type="text" name="researchStartDate" className="date1 hasDatepicker w200" size="12" id="researchStartDate" readonly="readonly" value="" title="Research period start date"/></div>
                            <span style={{"padding": "0 10px"}}>~</span>
                            <div className="date-inpt"><input type="text" name="researchEndDate" className="date1 hasDatepicker w200" size="12" id="researchEndDate" readonly="readonly" value="" title="End date of research period"/></div>
                          </div>
                      </dd>
                  </dl>
                  <dl>
                     <dt>이용기간</dt>
                     <dd className="date">
                         <div className="dateWrap">
                           <div className="date-inpt"><input type="text" name="useStartDate" className="date1 hasDatepicker w200" size="12" id="useStartDate" readonly="readonly" value="" title="Usage period start date"/></div>
                            <span style={{"padding": "0 10px"}}>~</span>
                           <div className="date-inpt"><input type="text" name="useEndDate" className="date1 hasDatepicker w200" size="12" id="useEndDate" readonly="readonly" value="" title="End date of use period"/></div>
                         </div>
                     </dd>
                 </dl>
                 <dl>
                    <dt>방문일자</dt>
                    <dd className="date">
                        <div className="dateWrap">
                          <div className="date-inpt"><input type="text" name="visit_date" className="date1 hasDatepicker w200" size="12" id="visit_date" readonly="readonly" value="" title="Visit date"/></div>
                        </div>
                    </dd>
                </dl>
                <dl>
                   <dt>방문시간</dt>
                   <dd>
                       <input type="time" name="visit_start_time" id="visit_start_time" placeholder="" className="sbj_tit w110" value="09:00" min="09:00" max="17:00" pattern="[0-9]{2}:[0,3]{2}" title="Visit Start Time"/>
                       <span style={{"padding": "0 10px"}}>~</span>
                       <input type="time" name="visit_end_time" id="visit_end_time" placeholder="" className="sbj_tit w110" value="17:00" min="09:00" max="17:00" pattern="[0-9]{2}:[0,3]{2}" title="Visit end time"/>
                   </dd>
                 </dl>
                 <dl>
                    <dt>방문자</dt>
                    <dd><input type="text" name="visitor" placeholder="" className="sbj_tit w200" value="" title="Visitor"/></dd>
                </dl>
                </div>
                <b style={{"color":"#da0404"}}>※ 이용기간 종료 1개월 후 데이터 자동 폐기</b>
              </div>
               <h6 className="h-tit6 mt20">파일 업로드</h6>
               <div className="tbl type2">
                  <div className="fm_area">
                    <dl className="sbj_tit">
                      <dt>파일 업로드</dt>
                      <dd className="file_up">
                        <div className="grid grid-cols-3">
                          <div>
                            <input type="text" className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-gray-100 bg-clip-padding border border-solid border-gray-300
                              rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none h-20" name="frmName"  />
                          </div>
                          <div>
                            <a href="#" className="btn btn-color3 btn-md h-20 leading-loose">신청하기</a>
                          </div>

                        </div>
                        
                        
                        
                      </dd>
                    </dl>
                  </div>
               </div>
              <div className="p-5 text-center">
                <button id="images" class="bg-main-blue hover:bg-blue-700 xs:text-sm xs:h-14 sm:text-xl lg:text-2xl text-white font-bold lg:p-4 md:p-4 sm:p-4 xs:p-1 rounded lg:w-80 sm:w-13 xs:mt-1 xs:w-40">신청하기</button>
              </div>
          </form>
      </div>
    )
}

// <img src="#" style="width:100%;"/>

// <!-- <a href="#" className="btn btn-color2 btn-md div_close">닫기</a> -->

// <!-- <button className="plus_btn btn-color3"><img src="/images/www/sub/plus_btn.png" alt="플러스아이콘"></button> -->
