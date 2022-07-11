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
        <div className="left wp25 db_list_wrap">
             <ul className="db">
               <li className="db_tit1"><FormattedMessage  id = "DB List" defaultMessage='DB List'/></li>
               <li className="db_tit2"><FormattedMessage  id = "Cancer Proteogenomic DB" defaultMessage='Cancer Proteogenomic DB'/></li>
               <li className="db_list db_list1"><a href="#"><FormattedMessage  id = "YBC Dataset" defaultMessage='YBC Dataset'/></a></li>
             </ul>
         </div>
         <div className="right wp75 db_list_con db_list_con1">
            <h6 className="h-tit6 mt20">암단백유전체 DB > YBC 데이터셋</h6>
            <div className="tab_content">
                <ul>
                	<li><span>기준</span> 조기발병 유방암 환자 중 40세 이하 대상자</li>
                	<li><span>대상자</span>126명</li>
                	<li><span>연도</span>2013 ~ 2021년</li>
                	<li><span>내용</span>한국인 조기발병 유방암 환자의 유전체 및 단백체와 임상 데이터 통합 · 연계 DB</li>
                </ul>
            </div>
            <h6 className="h-tit6 mt20">자료DB 안내</h6>
            <div className="db_table_wrap">
            	<h3 className="db_table_stit">건강정보 테이블</h3>
            	<div className="db_table_icon_table">
            		<div className="iconbox">
            			<img src={icon_4} alt="건강정보 테이블  아이콘"/>
            		</div>
            		<div className="tbl type2 tablebox">
            			<div className="tbl type1 scroll">
                			<div className="fm_area">
                      	 		<dl className="sbj_tit">
                          	 		<dt>내용</dt>
                           			<dd>환자의 기본 건강정보(예. 음주·흡연 여부 등)</dd>
                       			</dl>
                       			<dl>
                           			<dt>변수</dt>
                           			<dd>12</dd>
                       			</dl>
                 			</div>
            			</div>
            		</div>
            	</div>
            </div>

            <div className="db_table_wrap">
          		<h3 className="db_table_stit">신체계측 테이블</h3>
          		<div className="db_table_icon_table">
          			<div className="iconbox">
          				<img src={icon_4} alt="건강정보 테이블  아이콘"/>
          			</div>
          			<div className="tbl type2 tablebox">
          				<div className="tbl type1 scroll">
          	    			<div className="fm_area">
                      	 		<dl className="sbj_tit">
                          	 		<dt>내용</dt>
                           			<dd>환자의 신체계측(BMI) 정보</dd>
                       			</dl>
                       			<dl>
                           			<dt>변수</dt>
                           			<dd>2</dd>
                       			</dl>
                 			</div>
          				</div>
            		</div>
            	</div>
            </div>

              <div className="db_table_wrap">
            		<h3 className="db_table_stit">면역병리 테이블</h3>
            		<div className="db_table_icon_table">
            			<div className="iconbox">
            					<img src={icon_4} alt="건강정보 테이블  아이콘"/>
            			</div>
            			<div className="tbl type2 tablebox">
            				<div className="tbl type1 scroll">
            	    			<div className="fm_area">
                        	 		<dl className="sbj_tit">
                            	 		<dt>내용</dt>
                             			<dd>면역병리검사의 검사결과(예. ER, PR, HER2, Ki-67(%) 등)</dd>
                         			</dl>
                         			<dl>
                             			<dt>변수</dt>
                             			<dd>4</dd>
                         			</dl>
                     			</div>
            				</div>
                		</div>
                	</div>
              </div>

              <div className="db_table_wrap">
              	<h3 className="db_table_stit">외과병리 테이블</h3>
              	<div className="db_table_icon_table">
              		<div className="iconbox">
              			<img src={icon_4} alt="건강정보 테이블  아이콘"/>
              		</div>
              		<div className="tbl type2 tablebox">
              			<div className="tbl type1 scroll">
                  			<div className="fm_area">
                        	 		<dl className="sbj_tit">
                            	 		<dt>내용</dt>
                             			<dd>수술 시 조직 검사에서 확인된 정보(예. T, N Category 등)</dd>
                         			</dl>
                         			<dl>
                             			<dt>변수</dt>
                             			<dd>2</dd>
                         			</dl>
                     			</div>
              			</div>
                		</div>
                	</div>
              </div>

              <div className="db_table_wrap">
            		<h3 className="db_table_stit">추적관찰 테이블</h3>
            		<div className="db_table_icon_table">
            			<div className="iconbox">
            				<img src={icon_4} alt="건강정보 테이블  아이콘"/>
            			</div>
            			<div className="tbl type2 tablebox">
            				<div className="tbl type1 scroll">
            	    			<div className="fm_area">
                        	 		<dl className="sbj_tit">
                            	 		<dt>내용</dt>
                             			<dd>환자의 재발 정보(예. 재발여부, 재발까지 확인된 기간 등)</dd>
                         			</dl>
                         			<dl>
                             			<dt>변수</dt>
                             			<dd>3</dd>
                         			</dl>
                     			</div>
            				</div>
                		</div>
                	</div>
                </div>
          </div>
      </div>
    )
}
