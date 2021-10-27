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
            <h6 class="h-tit6 mt20">자료DB 안내</h6>
            <div class="db_table_wrap">
            	<h3 class="db_table_stit">건강정보 테이블</h3>
            	<div class="db_table_icon_table">
            		<div class="iconbox">
            			<img src={icon_4} alt="건강정보 테이블  아이콘"/>
            		</div>
            		<div class="tbl type2 tablebox">
            			<div class="tbl type1 scroll">
                			<div class="fm_area">
                      	 		<dl class="sbj_tit">
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

            <div class="db_table_wrap">
          		<h3 class="db_table_stit">신체계측 테이블</h3>
          		<div class="db_table_icon_table">
          			<div class="iconbox">
          				<img src={icon_4} alt="건강정보 테이블  아이콘"/>
          			</div>
          			<div class="tbl type2 tablebox">
          				<div class="tbl type1 scroll">
          	    			<div class="fm_area">
                      	 		<dl class="sbj_tit">
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

              <div class="db_table_wrap">
            		<h3 class="db_table_stit">면역병리 테이블</h3>
            		<div class="db_table_icon_table">
            			<div class="iconbox">
            					<img src={icon_4} alt="건강정보 테이블  아이콘"/>
            			</div>
            			<div class="tbl type2 tablebox">
            				<div class="tbl type1 scroll">
            	    			<div class="fm_area">
                        	 		<dl class="sbj_tit">
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

              <div class="db_table_wrap">
              	<h3 class="db_table_stit">외과병리 테이블</h3>
              	<div class="db_table_icon_table">
              		<div class="iconbox">
              			<img src={icon_4} alt="건강정보 테이블  아이콘"/>
              		</div>
              		<div class="tbl type2 tablebox">
              			<div class="tbl type1 scroll">
                  			<div class="fm_area">
                        	 		<dl class="sbj_tit">
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

              <div class="db_table_wrap">
            		<h3 class="db_table_stit">추적관찰 테이블</h3>
            		<div class="db_table_icon_table">
            			<div class="iconbox">
            				<img src={icon_4} alt="건강정보 테이블  아이콘"/>
            			</div>
            			<div class="tbl type2 tablebox">
            				<div class="tbl type1 scroll">
            	    			<div class="fm_area">
                        	 		<dl class="sbj_tit">
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
